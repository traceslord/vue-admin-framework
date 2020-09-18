# Laravel 项目初始化

### 创建项目
必须使用 Laravel 7.x

```bash
# 阿里镜像
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

```bash
# 使用 composer 安装
composer create-project laravel/laravel project-name --prefer-dist "7.*"
```

### 补充用户相关 Migrations
Laravel 已默认为我们创建好了用户相关的迁移文件，但我们需要更具自身业务完善字段结构。
_/database/migrations/xxx_create_users_table.php_
```php
$table->bigIncrements('id');
$table->string('unionid')->nullable()->comment('微信 unionid');
$table->string('session_key')->nullable()->comment('微信小程序登录态');
$table->string('nickname')->nullable()->comment('昵称');
$table->string('realname')->nullable()->comment('真实姓名');
$table->string('phone_number')->nullable()->comment('电话');
$table->string('country')->nullable()->comment('国家');
$table->string('province')->nullable()->comment('省');
$table->string('city')->nullable()->comment('城市');
$table->unsignedTinyInteger('gender')->nullable()->comment('性别');
$table->string('avatar_url')->nullable()->comment('用户图像url');
$table->timestamps();
$table->datetime('logined_at')->nullable()->comment('最后登录时间');
```
**
> **删除业务无关 Migrations**
> 例如： 2014_10_12_100000_create_password_resets_table

### 修改用户模型 Model
框架默认创建了 App/User.php ，但我们统一使用 App\Models 命名空间
```bash
mkdir app/Models
mv app/User.php app/Models/User.php
```

修改 app/Models/User.php 文件，更改 namespace 为我们新创建的文件夹路径，已经更新 $fillable 。
```php
<?php

// 修改命名空间
namespace App\Models;
...

class User extends Authenticatable
{
  use Notifiable;
  // 更新 $fillable
  protected $fillable = [
    'unionid', 'session_key',
    'nickname', 'realname', 'phone_number',
    'country', 'province', 'city',
    'gender', 'avatar_url',
    'visited_at'
  ];
  ...
}
```

编辑器全局搜索 App\User 并手动逐个文件替换为 App\Models\User，主要文件有：

- /config/auth.php
- /database/factories/UserFactory.php

### 创建用户控制器 Controller
现在我们还没有用户控制器，<br />运行下面命令来生成 app/Http/Controllers/Api/Web/UsersController.php 文件。
```php
php artisan make:controller Api/Web/UsersController
```
> 我们通过 Web / Admin / Miniprogram 来区分不同平台的控制器及 API PREFIX 。

App/Http/Controllers/Controller.php 全局添加 成功/失败返回方法：
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  // 成功返回封装
  public function success($data = [], $message = 'success')
  {
    return response()->json([
      'error_code' => 0,
      'msg' => $message,
      'data' => $data,
    ]);
  }

  // 失败返回封装
  public function error($code = 1, $message = '', $status = 200)
  {
    return response()->json([
      'error_code' => $code,
      'msg' => $message,
    ], $status);
  }
}
```

修改 App/Http/Controllers/Api/Web/UserControllers.php 
```php
<?php

namespace App\Http\Controllers\Api\Web;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersController extends Controller
{
  public function store()
  {
    return $this->success([], 'users.create');
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

### 创建用户相关路由 Router
创建 Web 平台的相关路由，/routes/api_web.php 。
```php
<?php

$router->post('/users', 'UsersController@store')->name('web.users.store');
$router->put('/users/{user}/update', 'UsersController@update')->name('web.users.update');
$router->get('/users/{user}', 'UsersController@show')->name('web.users.show');
```

在 bootstrap/app.php 中为 api_web 绑定前缀和作用域。
```php
<?php

...

$app->router->group([
  'namespace' => 'App\Http\Controllers\Api\Web',
  'prefix' => 'api/web',
], function ($router) {
  require __DIR__ . '/../routes/api_web.php';
});

return $app;
```
