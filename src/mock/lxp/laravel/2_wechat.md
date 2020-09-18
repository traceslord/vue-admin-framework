# 微信网页登录

### 依赖安装
> 使用依赖：easywechat : [https://www.easywechat.com/docs](https://www.easywechat.com/docs)

```bash
composer require overtrue/wechat:~4.0 -vvv
```

### 配置密钥
在[微信开放平台](https://open.weixin.qq.com/)获取 APPID、SECRET，放置在 .env 环境变量中
```bash
WECHAT_WEB_APPID=wx08a13eae12bc0ad9
WECHAT_WEB_SECRET=71e5eda5b001d9332ed293513ee2ca4c
```

在 配置环境中配置微信密钥
_app/config/services.php_
```bash
<?php

return [
  ...
  
  'wechat' => [
    'web' => [
      'app_id' => env('WECHAT_WEB_APPID'),
      'secret' => env('WECHAT_WEB_SECRET'),
      'oauth' => [
        'scopes'   => ['snsapi_login'],
      ],
    ]
  ]
];
```

### 配置控制器
创建并配置微信相关控制器
```bash
php artisan make:controller Api/Web/WechatController
```
_app/Http/Controllers/Api/Web/WechatController.php_
```bash
<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use EasyWeChat\Factory;

class WechatController extends Controller
{
  // 网页应用
  public function webAuth(Request $request)
  {
    $config = config('services.wechat.web');
    $app = Factory::officialAccount($config);
    $user = $app->oauth->user();
    $data = [
      "openid" => $user->original['openid'],
      "unionid" => $user->original['unionid'],
      "nickname" => $user->nickname,
      "avatar_url" => $user->avatar,
      "gender" => $user->original['sex'],
    ];
    return $this->success($data, 'success');
  }
}
```

### 配置路由
设置微信 Code 校验路由<br />_/routes/api_web.php_
```php
<?php
...

$router->get('/wechat/auth', 'WechatController@webAuth')->name('wechat.auth');
```

### 校验接口
网页授权主要有两种形式：1. 跳转到微信的扫码页面授权、2. 把微信的扫码 iframe 潜入到自己页面之中。

跳转到微信扫码页面逻辑，前端配置地址直接跳转即可。
```javascript
const oAuthWebUrl = () => {
  const appId = "wx08a13eae12bc0ad9";
  const redirectUrl = "https://passport.jiker.com/social/wechat";
  const wechatReqUrl = "https://open.weixin.qq.com/connect/qrconnect";
  const webState = "born2code";
  const wechatQuery = `appid=${appId}&redirect_uri=${redirectUrl}&state=${webState}`;
  const wechatParams = "response_type=code&scope=snsapi_login#wechat_redirect";
  return `${wechatReqUrl}?${wechatQuery}&${wechatParams}`;
}

 window.location.href = oAuthWebUrl();
```
redirectUrl 为扫码成功之后的回调地址，扫码成功之后微信会把 code 和 state 返回到这个地址，例如：
```javascript
https://passport.jiker.com/social/wechat?code=061F730w3SQXRU2JS84w3t3m8A2F730x&state=born2code
```
前端获取到地址中的 code ，发送到后端 webAuth API 中获取用户信息。

第二种模式为使用微信 JS SDK 的二维码 ifame 嵌入到对应的 HTML DOM id 中。
引入微信 JS SDK ：
```html
<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
new window.WxLogin({
  id: "qrcode", // DOM 里面的 HTML id
  appid: "wx08a13eae12bc0ad9",
  scope: "snsapi_login",
  redirect_uri: "https://passport.jiker.com/social/wechat",
  state: "born2code",
  // href: "https://passport.jiker.vip/css/qrcode.css" // 推荐用 base64 省略加载时间
  href:"data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLnBhbmVsQ29udGVudCAud3JwX2NvZGUgewogICAgd2lkdGg6IDI0MHB4OwogICAgaGVpZ2h0OiAyNDBweDsKfQouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19icm93c2VyIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnN0YXR1c19pY29uIHsKICAgIG1hcmdpbi10b3A6IDEwcHg7Cn0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgICAvKmJvcmRlcjpub25lOyovCiAgICBwYWRkaW5nOiAzMHB4OwogICAgd2lkdGg6IDIyMHB4OwogICAgaGVpZ2h0OiAyMjBweDsKfQouaW1wb3dlckJveCAuanNfd3hfZGVmYXVsdF90aXB7CiAgICBkaXNwbGF5OiBub25lOwp9Ci5pbXBvd2VyQm94ICN3eF9hZnRlcl9zY2FuLCAjd3hfYWZ0ZXJfY2FuY2VsLCN3eF9kZWZhdWx0X3RpcHsKICAgIHBhZGRpbmc6IDUycHggMTRweDsKICAgIHRleHQtYWxpZ246IGxlZnQ7Cn0KLmltcG93ZXJCb3ggLnN0YXR1c190eHQgewogICAgbWFyZ2luLXRvcDoxMnB4Owp9"
});
</script>
```

### 用户判断
在很多业务场景下，用户扫码之后需要经过绑定手机号的流程才会真正的入库。这时候我们可以根据 unionid 判断用户时候在库中。如果是就返回用户，否就返回 unionid 及微信相关的用户信息。

_app/Http/Controllers/Api/Web/WechatController.php_
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
    }

    $response = $userInfo ? $userInfo : $data;
    return $this->success($response, 'success');
  }
}
```
