# JWT 配置

token [JWT](https://jwt.io/) 是 JSON Web Token 的缩写，是一个非常轻巧的规范，这个规范允许我们使用 JWT 在用户和服务器之间传递安全可靠的信息。

JWT 由头部（header）、载荷（payload）与签名（signature）组成，一个 JWT 类似下面这样：
```bash
{
  "typ":"JWT",
  "alg":"HS256"
}
{
  "iss":"http://larabbs.test",
  "iat":1515733500,
  "exp":1515737100,
  "nbf":1515733500,
  "jti":"c3U4VevxG2ZA1qhT",
  "sub":1,
  "prv":"23bd5c8949f600adb39e701c400872db7a5976f7"
}
signature
```
头部声明了加密算法；载荷中有两个比较重要的数据，exp 是过期时间，sub 是 JWT 的主体，这里就是用户的 id；最后的 signature 是由服务器进行的签名，保证了 token 不被篡改。

> JWT 最后是通过 Base64 编码的，也就是说，它可以被翻译回原来的样子来的。所以不要在 JWT 中存放一些敏感信息。

用户 id，过期时间等数据都保存在 Token 中了，所以并不需要将 Token 保存在服务器中，客户端请求的时候在 Header 中携带 Token，服务器获取 Token 后，进行 base64_decode  即可获取数据进行校验，由于已经有了签名，所以不用担心数据被篡改。

有了 token 之后该如何验证 token 的有效性，并得到 token 对应的用户呢？其实原理很简单，Laravel 为我们准备好了 auth 这个中间件：

1. 获取客户端提交的 token 
1. 检测 token 中的签名 signature 是否正确
1. 判断 payload 数据中的 exp，是否已经过期
1. 根据 payload 数据中的 sub，取数据库中验证用户是否存在
1. 上述检测不正确，则抛出相应异常

### 安装 firebase/php-jwt
> [https://github.com/firebase/php-jwt](https://github.com/firebase/php-jwt)

```bash
composer require firebase/php-jwt
```

### 创建 JWT SECRET
_.env_
```bash
JWT_SECRET=kcJwtSbk74ykKWIL
JWT_EXPERT_DAYS=7
SESSION_DOMAIN=.demo.com
```
_/config/auth.php_
```php
<?php

return [

  'jwt' => [
    'secret' => env('JWT_SECRET', 'password'),
    'expired' => env('JWT_EXPIERD_DAYS', 1),
  ],
...
```

### 创建 JWT Utils
_/app/Utils/Jwt.php_
```php
<?php

namespace App\Utils;
use Illuminate\Support\Carbon;
use Firebase\JWT\JWT as JWTBase;

class Jwt
{
  public static function login($user, $remember = false)
  {
    $expDays = static::expired_days($remember);
    $userType = 'user';
    $payload = [
      'iat' => time(),
      'iss' => url('/'),
      'exp' => Carbon::now()->addRealDays($expDays)->getTimestamp(),
      'aud' => env('APP_URL'),
      'sub' => $user->id,
      'type'=> $userType
    ];

    \Log::info('Landing_page_JWT '.json_encode($payload));
    \Log::info('Landing_page_JWTBase '.json_encode(JWTBase::encode($payload, static::key())));
    return JWTBase::encode($payload, static::key());
  }

  public static function encode($payload)
  {
    $payload = [
      'iat' => time(),
      'iss' => url('/'),
      'exp' => Carbon::now()->addRealDays(7)->getTimestamp(),
      'aud' => env('APP_URL'),
    ] + $payload;

    return JWTBase::encode($payload, static::key());
  }

  public static function decode($jwt)
  {
    try {
      return JWTBase::decode($jwt, static::key(), ['HS256']);
    } catch (\Exception $e) {
      return false;
    }
  }

  public static function expired_days($remember)
  {
    $days = $remember ? config('auth.jwt.expired') : 1;
    return $days;
  }

  public static function expired_mins($remember) {
    $days = static::expired_days($remember);
    return $days * 24 * 60;
  }

  protected static function key()
  {
    return config('auth.jwt.secret');
  }
}
```

### 封装 用户和 token 信息的返回
用户登录成功，返回 userInfo 和 token ，同时把相关信息种到 cookie<br />app/Http/Controllers/Controller.php
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Utils\Jwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;


class Controller extends BaseController
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  public function success($data = [], $message = 'success')
  {
    return response()->json([
      'error_code' => 0,
      'msg' => $message,
      'data' => $data,
    ]);
  }

  public function error($code = 1, $message = '', $status = 200)
  {
    return response()->json([
      'error_code' => $code,
      'msg' => $message,
    ], $status);
  }


  public function loginResponse($prefix, $user, $remember)
  {
    $expTimes = Jwt::expired_mins($remember);
    $token = Jwt::login($user, $remember);
    $tCookie = Cookie::make($prefix .'_token', $token, $expTimes, null, null, null, false);
    $uidCookie = Cookie::make($prefix .'_uid', $user->id, $expTimes, null, null, null, false);
    $nicknameCookie = Cookie::make($prefix .'_nickname', $user->name, $expTimes, null, null, null, false);
    $avatarCookie = Cookie::make($prefix .'_avatar', $user->avatar_url, $expTimes, null, null, null, false);
    $response = [
      'token' => $token,
      'userInfo' => $user
    ];
    return $this->success($response)
      ->withCookie($tCookie)
      ->withCookie($uidCookie)
      ->withCookie($nicknameCookie)
      ->withCookie($avatarCookie);
  }

  public function logout($prefix, Request $request)
  {
    $tCookie = Cookie::forget($prefix . '_token');
    $uidCookie = Cookie::forget($prefix . 'id');
    $nicknameCookie = Cookie::forget($prefix . '_nickname');
    $avatarCookie = Cookie::forget($prefix . '_avatar_url');

    return $this->success()
      ->withCookie($tCookie)
      ->withCookie($uidCookie)
      ->withCookie($nicknameCookie)
      ->withCookie($avatarCookie);
  }
}
```

### 修改登录相关 Controller 调用
微信登录成功调用 loginResponse
app/Http/Controllers/Api/Web/WechatController.php
```php
<?php

namespace App\Http\Controllers\Api\Web;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use EasyWeChat\Factory;
use App\Models\User;


class WechatController extends Controller
{
  // 网页应用
  public function webAuth(Request $request, User $user)
  {
    $config = config('services.wechat.web');
    $app = Factory::officialAccount($config);
    $authUser = $app->oauth->user();
    $data = [
      "openid" => $authUser->original['openid'],
      "unionid" => $authUser->original['unionid'],
      "nickname" => $authUser->nickname,
      "avatar_url" => $authUser->avatar,
      "gender" => $authUser->original['sex'],
    ];

    $userInfo = $user->where('unionid', $authUser->original['unionid'])->first();
    if($userInfo) {
      $userInfo->update([
        'visited_at' => Carbon::now()
      ]);
      return $this->loginResponse('web', $userInfo, true);
    }
    return $this->success($data, 'success');
  }
}

```
网页注册成功调用
app/Http/Controllers/Api/Web/UserController.php
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
    return $this->loginResponse('web', $user, true);
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

### 获取 Token
使用 POSTMAN 测试下登录成功之后是否能返回 token 以及 cookie ，并把 token 保存。
```bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTkwMTM3MTIsImlzcyI6Imh0dHA6XC9cL2FwaS5ob21lLXBsYW4uY24udGVzdCIsImV4cCI6MTU5OTYxODUxMiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0Iiwic3ViIjozLCJ0eXBlIjoidXNlciJ9.sbILh1iU955XXvbacEQClobAQcBcxa5lCaN2LWpIIMc
```
接下来我们将使用 token 请求用户信息的接口，看如何使用 token 获取到对应的用户。

### 修改 Auth Guards
/config/auth.php
```php
<? php
  
...
  'guards' => [
    'web' => [
      'driver' => 'token',
      'provider' => 'users',
    ],
  ],
...
```

### 设置 AuthServiceProvider
实现基于 HTTP 请求的自定义身份验证系统的最简单方法，是使用 Auth::viaRequest 方法。此方法允许您使用单个闭包来快速定义身份验证过程。
首先，在 AuthServiceProvider 的 boot 方法中调用 Auth::viaRequest 方法。viaRequest 方法接受一个看守器名称作为其第一个参数。此名称可以是描述你自定义看守器的任何字符串。传递给该方法的第二个参数应该是一个闭包函数，它接收传入的 HTTP 请求并返回一个用户实例，或者，如果验证失败，则为 null。
app/Providers/AuthServiceProvider.php
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Utils\Jwt;
use App\Models\User;
use Illuminate\Support\Str;
use Auth;

class AuthServiceProvider extends ServiceProvider
{
  /**
    * The policy mappings for the application.
    *
    * @var array
    */
  protected $policies = [
    // 'App\Model' => 'App\Policies\ModelPolicy',
  ];

  /**
    * Register any authentication / authorization services.
    *
    * @return void
    */
  public function boot()
  {

    Auth::viaRequest('token', function ($request) {
      $jwt = ($token = $request->header('Authorization'))
        ? Str::replaceFirst('Bearer ', '', $token)
        : $request->cookie('token');

      $decode = Jwt::decode($jwt);

      if (! $decode) {
        return null;
      }

      return User::find($decode->sub);
    });
  }
}
```

### 更新 UserController
通过 Auth 中的 user 方法获取到用户并对用户数据进行处理，获取、修改个人信息。
app/Http/Controllers/Api/Web/UserController.php
```php
<?php

namespace App\Http\Controllers\Api\Web;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserRequest;
use App\Http\Controllers\Api\Web\SmsController;
use App\Models\User;
use Auth;
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
    return $this->loginResponse('web', $user, true);
  }

  public function userInfo() {
    $user = Auth::user();
    return $this->success($user);
  }

  public function updateUserInfo(UserRequest $request) {
    $data = $request->validated();
    $user = Auth::user();
    $user->update($data);
    return $this->success([], '用户信息更新成功');
  }
}
```

### 更新路由 Routes
routes/api_web.php
```php
<?php

$router->post('/users', 'UserController@store');
$router->put('/users/user-info', 'UserController@updateUserInfo');
$router->get('/users/user-info', 'UserController@userInfo');

...
```

### 添加中间 Authenticate
我们使用了 Auth 通过 token 获取用户信息，有一些接口例如更新用户是必须在用户登录情况下才能使用的，否则用户不存在的时候会报错，接下来我们通过一个中间件来进行拦截没有登录或者登录过期的用户，对其返回 401 。
app/Http/Middleware/Authenticate.php
```php
<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
  /**
    * Get the path the user should be redirected to when they are not authenticated.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return string|null
    */
  public function handle($request, Closure $next, $guard = null)
  {
    if (Auth::guard($guard)->guest()) {
      return response('Unauthorized.', 401);
    }
    return $next($request);
  }
}

```
在路由中使用
```php
$router->group(['middleware' => ['auth:web']], function($router) {
  $router->put('/users/user-info', 'UserController@updateUserInfo');
  $router->get('/users/user-info', 'UserController@userInfo');
});
```

### 最后测试一下
最后测试一下 JWT 登录、注册、获取、修改的流程是否跑通。
