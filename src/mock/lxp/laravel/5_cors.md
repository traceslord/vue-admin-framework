# 跨域 CORS

跨域是一个老生常谈的问题了，由于域名、端口不一样的 API 请求都会导致跨域，跨域的解决颁发有很多：

1. JSONP 返回（ 伪装为 script 脚本 callback 的形式 ）
1. Nginx 配置多项目同域名
1. CORS 

更多详情可以参考阮一峰：[https://www.ruanyifeng.com/blog/2016/04/cors.html](https://www.ruanyifeng.com/blog/2016/04/cors.html)
以及跨域解决方案：[https://dailc.github.io/2017/03/22/ajaxCrossDomainSolution.html](https://dailc.github.io/2017/03/22/ajaxCrossDomainSolution.html)

> Laravel 7 中已经继承了 CORS ，无需下载安装，有特殊情况修改下配置即可。

### 使用 **fruitcake/laravel-cors**
[https://packagist.org/packages/fruitcake/laravel-cors](https://packagist.org/packages/fruitcake/laravel-cors)
```php
composer require fruitcake/laravel-cors
```
> 在 Laravel 7.x 版本中自带安装，无需下载。

### 配置 CORS
_config/cors.php _
把 supports_credentials 设置为 true ，允许携带 cookie 。
```bash
<?php

return [
  'paths' => ['api/*'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['*'],
  'allowed_origins_patterns' => [],
  'allowed_headers' => ['*'],
  'exposed_headers' => [],
  'max_age' => 0,
  'supports_credentials' => true,
];
```

> 在 Laravel 7.x 版本中自带安装，无需自动生成。

### 注意 SESSION_DOMAIN
.env
```bash
SESSION_DOMAIN=
```
> SESSION_DOMAIN 要配置正确，特别线上环境，不然无法使用。
