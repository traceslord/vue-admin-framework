# 手机短信验证

> easy-sms 文档： [https://github.com/overtrue/easy-sms](https://github.com/overtrue/easy-sms)
> 阿里云模版配置：[https://www.yuque.com/aitschool/ypig26/bd03u5](https://www.yuque.com/aitschool/ypig26/bd03u5)

### 下载 Easysms
```php
composer require "overtrue/easy-sms"
```
由于该组件还没有 Laravel 的 ServiceProvider，为了方便使用，我们可以自己封装一下。
首先在 config 目录中增加 easysms.php 文件。
```bash
touch config/easysms.php
```
_config/easysms.php_
```php
<?php

return [
  // HTTP 请求的超时时间（秒）
  'timeout' => 10.0,

  // 默认发送配置
  'default' => [
    // 网关调用策略，默认：顺序调用
    'strategy' => \Overtrue\EasySms\Strategies\OrderStrategy::class,

    // 默认可用的发送网关
    'gateways' => [
      'aliyun',
    ],
  ],
  // 可用的网关配置
  'gateways' => [
    'errorlog' => [
      'file' => '/tmp/easy-sms.log',
    ],
    'aliyun' => [
      'access_key_id' => env('SMS_ALIYUN_ACCESS_KEY_ID'),
      'access_key_secret' => env('SMS_ALIYUN_ACCESS_KEY_SECRET'),
      'sign_name' => env('SMS_ALIYUN_SIGN_NAME'),
      'templates' => [
        'register' => env('SMS_ALIYUN_TEMPLATE_REGISTER'),
      ]
    ],
  ],
];
```

### 配置 ENV 阿里云
```bash
...
SMS_ALIYUN_SIGN_NAME=
SMS_ALIYUN_TEMPLATE_REGISTER=
SMS_ALIYUN_ACCESS_KEY_ID=
SMS_ALIYUN_ACCESS_KEY_SECRET=
```

### 创建 SMS Provider 
```bash
php artisan make:provider EasySmsServiceProvider
```
_app/Providers/EasySmsServiceProvider.php_
```php
<?php

namespace App\Providers;

use Overtrue\EasySms\EasySms;
use Illuminate\Support\ServiceProvider;

class EasySmsServiceProvider extends ServiceProvider
{
  public function boot()
  {
    //
  }

  public function register()
  {
    $this->app->singleton(EasySms::class, function ($app) {
      return new EasySms(config('easysms'));
    });

    $this->app->alias(EasySms::class, 'easysms');
  }
}
```
打开 config/app.php 在 providers 中增加 App\Providers\EasySmsServiceProvider::class 。
```php
.
.
.
  'providers' => [
    .
    .
    .
    App\Providers\EventServiceProvider::class,
    App\Providers\RouteServiceProvider::class,

    App\Providers\EasySmsServiceProvider::class,
  ],
.
.
.
```

### 短信发送测试
```php
php artisan tinker
```
```php
$sms = app('easysms');
try {
  $sms->send(<自己的手机号>, [
    'template' => config('easysms.gateways.aliyun.templates.register'),
    'data' => [
      'code' => '1234',
    ],
  ]);
} catch (\Overtrue\EasySms\Exceptions\NoGatewayAvailableException $exception) {
  $message = $exception->getException('aliyun')->getMessage();
  dd($message);
}
```
> 如果你遇到报错  cURL error 28: Resolving timed out after 5519 milliseconds (see [http://curl.haxx.se/libcurl/c/libcurl-errors.html)](http://curl.haxx.se/libcurl/c/libcurl-errors.html)) 可以将配置中的超时时间增加，修改 config/easysms.php 中的 timeout 即可。

### 创建 SMS Request
创建一个基类，方便做一些统一方法的封装，对于接口的验证类，我们也统一放在 Api 目录中。
```php
php artisan make:request Api/FormRequest
```
_app/Http/Requests/Api/FormRequest.php_
```php
<?php

namespace App\Http\Requests\Api;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;

class FormRequest extends BaseFormRequest
{
  public function authorize()
  {
    return true;
  }

  public function failedValidation(Validator $validator): void
  {
    $error = $validator->errors()->all();
    if (app()->environment() != 'production') {
      // \Log::info('422 数据：',request()->all());
      \Log::error('422异常日志：', ['data' => null, 'msg' => $error[0], 'error_code' => 1]);
    }

    throw new HttpResponseException(response()->json([
      'error_code' => 1,
      'msg' => $error[0],
      'data' => null,
    ], 200));
  }
}
```

创建注册验证请求 Request ，必须提交 phone 参数，必须是一个合法的电话格式。
```php
php artisan make:request Api/VerificationCodeRequest
```
_app/Http/Requests/Api/VerificationCodeRequest.php_
```php
<?php

namespace App\Http\Requests\Api;

class VerificationCodeRequest extends FormRequest
{
  public function rules()
  {
    return [
      'phone_number' => [
        'required',
        'regex:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/',
        'unique:users,phone_number'
      ]
    ];
  }

  public function messages()
  {
    return [
      'phone_number.regex' => '手机号格式不对',
      'phone_number.required' => '手机号不能为空。',
      'phone_number.unique' => '手机号已存在',
    ];
  }
}

```

### 创建 SMS Controller
短信发送逻辑与验证逻辑。
```bash
php artisan make:controller Api/Web/SmsController
```
app/Http/Controllers/Api/Web/SmsController.php
```php
<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Overtrue\EasySms\EasySms;
use Illuminate\Support\Str;
use App\Http\Requests\Api\VerificationCodeRequest;
use App\Models\User;

class SmsController extends Controller
{
  public function registerCode(VerificationCodeRequest $request, EasySms $easySms, User $user) {
    $phone = $request->phone_number;

    if (!app()->environment('production')) {
      $code = '1234';
    } else {
      // 生成4位随机数，左侧补0
      $code = str_pad(random_int(1, 9999), 4, 0, STR_PAD_LEFT);

      try {
        $result = $easySms->send($phone, [
          'template' => config('easysms.gateways.aliyun.templates.register'),
          'data' => [
            'code' => $code
          ],
        ]);
      } catch (\Overtrue\EasySms\Exceptions\NoGatewayAvailableException $exception) {
        $message = $exception->getException('aliyun')->getMessage();
        abort(500, $message ?: '短信发送异常');
      }
    }

    $key = 'verificationCode_'.Str::random(15);
    $expiredAt = now()->addMinutes(5);
    // 缓存验证码 5 分钟过期。
    \Cache::put($key, ['phone' => $phone, 'code' => $code], $expiredAt);

    return $this->success([
      'key' => $key,
      'expired_at' => $expiredAt->toDateTimeString(),
    ], '验证码发送成功');
  }

  public function verificationCode(Request $request) {
    $checkMessage = $this->checkVerificationCode($request);
    if($checkMessage) {
      return $this->error(1, $checkMessage);
    }
    return $this->success([], '验证码校验成功');
  }

  public function checkVerificationCode($request) {
    $verification_key = $request->verification_key;
    $verification_code =$request->verification_code;
    $verification_phone = $request->phone_number;
    if(!$verification_key) {
      return '请输入 verification_key';
    }
    if(!$verification_key) {
      return '请输入 verification_code';
    }
    if(!$verification_phone) {
      return '请输入手机号';
    }
    $verifyData = \Cache::get($verification_key);
    if (!$verifyData) {
      return '验证码已失效';
    }

    if (!hash_equals($verifyData['phone'], $verification_phone)) {
      return '手机号码不匹配';
    }

    if (!hash_equals($verifyData['code'], $verification_code)) {
      return '验证码错误';
    }
  }
}
```

### 创建 SMS Router
/routes/api_web.php
```php
<? php

...

$router->post('/sms/register-code', 'SmsController@registerCode')->name('sms.register');
$router->post('/sms/verify', 'SmsController@verificationCode')->name('sms.verify');
```
之后我们可以托过 RegisterCode API 进行验证码发送测试，使用 Verify API 进行验证码校验。通过设置判断 app()->environment('production') 开启和关闭短信发送验证。

### 创建用户 Controller
用户通过短信校验，我们往数据库中创建用户：

- 如果用户已经创建直接返回
- 如果用户未创建，那么创建用户再返回

创建用户相关的请求校验类 UserRequest，对一些必传字段做一些校验。
```bash
php artisan make:request Api/UserRequest
```
app/Http/Requests/Api/UserRequest.php
```php
<?php

namespace App\Http\Requests\Api;

class UserRequest extends FormRequest
{
  public function rules()
  {

    $rules = [
      'nickname' => 'required',
      'avatar_url' => 'required',
      'gender' => 'required',
    ];

    if($this->method() === 'POST') {
      $rules += [
        'phone_number' => [
          'required',
          'regex:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/',
          'unique:users,phone_number'
        ],
        'verification_key' => 'required',
        'verification_code' => 'required',
        'unionid' => ['required','unique:users,unionid'],
      ];
    }
    return $rules;
  }

  public function messages()
  {
    return [
      'phone_number.regex' => '手机号格式不对',
      'phone_number.required' => '手机号不能为空',
      'phone_number.unique' => '手机号已存在',
    ];
  }
}
```
修改用户控制器中创建 store 方法。
_app/Http/Controllers/Api/Web/UserController.php_
```php
<?php

namespace App\Http\Controllers\Api\Web;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserRequest;
use App\Http\Controllers\Api\Web\SmsController;
use App\Models\User;

class UserController extends Controller
{
  public function store(UserRequest $request)
  {
    $sms = (new SmsController());
    $checkMessage = $sms->checkVerificationCode($request);
    if($checkMessage) {
      return $this->error(1, $checkMessage);
    }
    $data = $request->validated();
    $user = User::create($data);
    $user->update([
      'visited_at' => Carbon::now()
    ]);
    return $this->success($user, '用户创建成功');
  }

  public function update()
  {
    return $this->success([], 'users.update');
  }

  public function show()
  {
    return $this->success([], 'users.show');
  }
}
```
接着在测试一下，看数据库中是否会创建用户。同时在手机号存在的情况下，是否会终止。
