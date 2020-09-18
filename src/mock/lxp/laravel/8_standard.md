# PHP Laravel 使用规范

> Laravel 7.x 官方文档：[https://laravel.com/docs/7.x](https://laravel.com/docs/7.x)

遵守 Laravel 开发规范有以下好处：

- 避免过多的选择造成的决策时间浪费；
- 尽量统一团队代码书写风格和思路；
- 避免歧义，节省时间和精力；
- 提高团队产品开发的总体执行力。

> 注意，在这份规范里，有些章节会书写「这样做的理由」，请不要以此「理由」的准确性来怀疑规范的权威性，规范就是规范，可以讨论改正，但，在执行的时候 `必须` 无条件严格遵守。

## 开发哲学
因为篇幅的关系，这里无法定义每一块代码逻辑编写的标准，这里重点说明下「开发哲学」，开发中请把这些「哲学」当做指明灯，来指引你做决策。

- DRY – 「Don’t Repeat Yourself」不要写重复的逻辑代码，注意封装，合适的时候提取为扩展包；
- CoC - 「Convention Over Configuration」约定俗成，遵循框架提倡的做法，不要去过度配置；
- KISS - 「Keep it Simple, Stupid」书写简单，易读的代码，不要书写高深、晦涩难懂的代码，不要过度设计。「开发的愉悦感」很重要。

> 以上哲学，参考了很多优秀社区的开发哲学，如：Rails 社区等。

## 设计理念
以下是一些优秀的「程序设计理念」，为我们设计程序提供了依据，遵循这些理念，能让程序变得清晰易读。

- MVC - Model, View, Controller ，开发注意以 MVC 为重心，严格控制 Controller 的可读性和代码行数；
- Restful - 请使用「资源的概念」和标准的 HTTP 动词来组织你的程序；

## Laravel 7.x LTS
在 2020 年 8 月之前 `必须` 使用 Laravel 7.x 来构建项目，请查阅 [Laravel 发行说明](http://laravel-china.org/docs/5.1/releases#%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E)。
请使用以下命令创建项目：
```
composer create-project laravel/laravel project-name --prefer-dist "7.*"
```

选择 Laravel LTS 的理由：
> 工匠应该专注于作品的创意，不应该浪费精力，没限制地在折腾自己的工具。

## 开发专用扩展包
有一些扩展包是在开发环境中专用的，`必须` 严格控制加载方法。
`必须` 使用 `--dev` 参数来安装扩展包，如：
```
composer require laracasts/generators --dev
```

开发专用的 provider `绝不`在 `config/app.php` 里面注册，`必须` 在 `app/Providers/AppServiceProvider.php` 文件中使用如以下方式：

```
public function register()
{
  if ($this->app->environment() == 'local') {
    $this->app->register('Laracasts\Generators\GeneratorsServiceProvider');
  }
}
```

## 路由器

### 路由闭包
`绝不` 在路由器里书写逻辑代码，是的，不允许使用匿名闭包，因为一旦使用将无法使用 [路由缓存](http://laravel-china.org/docs/5.1/controllers#%E8%B7%AF%E7%94%B1%E7%BC%93%E5%AD%98) 。
路由器要保持 `干净`，`绝不` 放置除路由配置以外的其他程序逻辑。

### Restful 路由器
`应该` 使用 Restful 路由器，配合资源控制器使用，见 [文档](https://laravel-china.org/docs/5.1/controllers#restful-resource-controllers)。

### 不使用 `resource` 方法
`绝不` 使用 `resource` 方法，应该一个个书写出来（大部分时候你是使用代码生成器生成）。
下面以 `photos` 作为例子：
```
Route::get('/photos', 'PhotosController@index')->name('photos.index');
Route::get('/photos/create', 'PhotosController@create')->name('photos.create');
Route::post('/photos', 'PhotosController@store')->name('photos.store');
Route::get('/photos/{id}', 'PhotosController@show')->name('photos.show');
Route::get('/photos/{id}/edit', 'PhotosController@edit')->name('photos.edit');
Route::put('/photos/{id}', 'PhotosController@update')->name('photos.update');
Route::delete('/photos/{id}', 'PhotosController@destroy')->name('photos.destroy');
```
这样做有以下目的：

- 统一「路由参数」使用 `{id}`
- 路由透明化，不允许留下「死路由」，所有留在 `routes.php` 文件中的路由都是有用的路由。

### 单数 or 复数？
`必须` 使用复数形式，如：

- `/photos/create`
- `/photos/{id}`

错误的例子如：

- `/photo/create`
- `/photo/{id}`

### 路由参数 {id}
`必须` 使用 `{id}` 作为资源标识符，不允许使用如：`/photos/{photo}/edit`、`/photos/{image}/edit` 等。
一是为了避免歧义，二是方便统一「全局路由器参数」。

### 全局路由器参数
`应该` 使用全局路由器参数限制，详见 [文档]([http://laravel-china.org/docs/5.1/routing#全局限制。](http://laravel-china.org/docs/5.1/routing#%E5%85%A8%E5%B1%80%E9%99%90%E5%88%B6%E3%80%82)
在 `RouteServiceProvider` 文件的 boot 方法里定义模式：
```
/**
 * 定义你的路由模型绑定，模式过滤器等。
 *
 * @param  \Illuminate\Routing\Router  $router
 * @return void
 */
public function boot(Router $router)
{
  $router->pattern('id', '[0-9]+');
  parent::boot($router);
}
```
模式一旦被定义，便会自动应用到所有使用该参数名称的路由上：
```
Route::get('users/{id}', function ($id) {
  // Only called if {id} is numeric.
});
Route::get('photos/{id}', function ($id) {
  // Only called if {id} is numeric.
});
```
> 注意：上面的闭包例子只为行文方便，强调一遍 -- `绝不` 在路由器里书写逻辑代码。

### 路由模型绑定
`绝不` 使用 [路由模型绑定](https://laravel-china.org/docs/5.1/routing#route-model-binding)。
原因是：保持「路由参数」获取的统一。

### 路由命名
所有路由器都 `必须` 命名，并使用 `name` 方法进行命名：
Route::get('users/{id}/profile', 'UserController@showProfile')->name('profile');

### 获取 URL
`应该` 使用 `route` 来获取 URL：
```
$url = route('profile', ['id' => 1]);
```
无法使用 `route` 的情况下，`可以` 使用 `url` 方法来获取 URL：
```
url('profile', [1]);
```

## 数据模型

### 放置位置
所有的数据模型文件，都 `必须` 存放在：`app/Models/` 文件夹中。
命名空间：
```
namespace App\Models;
```

### User.php
Laravel 5.1 默认安装会把 `User` 模型存放在 `app/User.php`，`必须` 移动到 `app/Models` 文件夹中，并修改命名空间声明为 `App/Models`，同上。
为了不破坏原有的逻辑点，`必须` 全局搜索 `App/User` 并替换为 `App/Models/User`。

### 命名规范
数据模型相关的命名规范：

- 数据模型类名 `必须` 为「单数」, 如：`App\Models\Photo`
- 类文件名 `必须` 为「单数」，如：`app/Models/Photo.php`
- 数据库表名字 `必须` 为「复数」，如：`photos`
- 数据库表名字 `必须` 为「小写」，如：`download_videos`
- 数据库表迁移名字 `必须` 为「复数」，如：`2014_08_08_234417_create_photos_table.php`
- 数据填充文件名 `必须` 为「复数」，如：`PhotosTableSeeder.php`
- 数据库字段名 `必须` 为「[Snake Case](https://en.wikipedia.org/wiki/Snake_case)」，如：`view_count`, `is_vip`
- 数据库表主键 `必须` 为「id」
- 数据库表外键 `必须` 为「resource_id」，如：`user_id`, `post_id`

### 利用 Trait 来扩展数据模型
有时候数据模型里的代码会变得很臃肿，`应该` 利用 Trait 来精简逻辑代码量，提高可读性，类似于 [Ruby China 源码](https://github.com/ruby-china/ruby-china/blob/master/app/models/topic.rb#L11-L17)。
> 借鉴于 Rails 的设计理念：「Fat Models, Skinny Controllers」。

存放于文件夹：`app/Models/Trait`

### Repository
`绝不` 使用 Repository，因为我们不是在写 JAVA 代码，太多封装就成了「过度设计（Over Designed）」，牺牲开发愉悦感的事情，万万不能做，MVC 就行，够傻够简单。
代码的可读性，维护和开发的便捷性，直接关系到程序员开发时候的愉悦感，直接影响到项目推进效率和程序 Debug 的速度。

### 关于 SQL 文件

- `绝不` 使用命令行或者 PHPMyAdmin 直接创建索引或表。`必须` 使用 [数据库迁移](http://laravel-china.org/docs/5.1/migrations) 去创建表结构，并提交版本控制器中。
- `绝不` 为了共享对数据库更改就直接导出 SQL，所有修改都必须使用使用 数据库迁移，并提交版本控制器中。
- `绝不` 直接向数据库插入伪造的测试数据。`必须` 使用 [数据填充](http://laravel-china.org/docs/5.1/seeding) 来插入假数据，并提交版本控制器中。

## 控制器

### 资源控制器
`必须` [使用 Restful 资源控制器](https://laravel-china.org/docs/5.1/controllers#restful-resource-controllers) 。

### 单数 or 复数？
`必须` 使用资源的单数形式，如：

- 类名：PhotosController
- 文件名：PhotoController.php 错误的例子如：
- 类名：PhotoController
- 文件名：PhotosController.php

### 保持短小精炼
`必须` 保持控制器文件代码行数最小化，还有可读性。

- `绝不` 为「方法」书写注释，这要求方法取名要足够合理，不需要过多注释；
- `应该` 为一些复杂的逻辑代码块书写注释，很多时候在于介绍产品逻辑 - `为什么要这么做。`；
- `不应该` 在控制器中书写「私有方法」，控制器里 `应该` 只存放「路由动作方法」；
- `绝不` 遗留「死方法」，就是没有用到的方法，控制器里的所有方法，都应该被使用到，否则应该删除；
- `绝不` 在控制器里批量注释掉代码，无用的逻辑代码就必须清除掉。

## 视图

### 文件夹结构

- layouts - 存放页面布局文件；
- common - 存放页面通用元素；
- pages - 简单的页面存放文件夹，如：about、contact 等；
- resources - 对应 Restful 资源路由的资源路径名称，以 `photos/create` 为例，为 `photos`
- 局部视图文件使用 `_` 前缀来命名，如：`photos/_upload_form.blade.php`

### 视图文件命名规范
对应 Restful 路由器和资源控制器，以 `photos` 为例，文件夹 `resources/views` 中：
`photos/index.blade.php`
```
对应路由器 `/photos`，命名 `photos.index`
控制器方法 `PhotosController@index`
```
`photos/show.blade.php`
```
对应路由器 `/photos/{id}`，命名 `photos.show`
控制器方法 `PhotosController@show`
```
`photos/create.blade.php`
```
对应路由器 `/photos/create`，命名 `photos.create`
控制器方法 `PhotosController@create`
```
`photos/edit.blade.php`
```
对应路由器 `/photos/edit`，命名 `photos.edit`
控制器方法 `PhotosController@edit`
```

## 表单验证

### 表单请求验证类
`必须` 使用 [表单请求验证类](https://laravel-china.org/docs/5.1/validation#form-request-validation) 来处理控制器里的表单验证。

### 验证类的 authorize
`不应该` 使用 `authorize` 做用户授权。

### 验证类命名
验证类命名遵循资源控制器命名，下面是一个列子：

- `StorePhotoRequest` 对应 `PhotosController@store`
- `UpdatePhotoRequest` 对应 `PhotosController@update`

## 用户授权

### 授权策略
`必须` 使用 [授权策略](https://laravel-china.org/docs/5.1/authorization#policies) 来做用户授权。
`应该` 使用 [自动判断授权策略方法](https://laravel-china.org/docs/5.1/authorization#checking-abilities)，这样控制器和授权类的方法名就统一起来了。

## 配置信息与环境变量
`.env` 文件中设置：
```
API_DOMAIN=api.domain.com
```
`config/api.php` 文件中设置：
```
'domain' => env('API_DOMAIN', null)
```
你有两种方法来获取 `相同配置`：

- `env('API_DOMAIN')`
- `config('api.domain')`

为了保证统一： 在任何情况下 `必须` 通过 `config()` 来调用环境变量。`绝不` 在配置文件以外的范围使用 `env()` 。
**必须** 保证只是在配置文件中调用了 `env` 函数，而不是在应用程序的其它地方。
如果你在应用程序中调用了 `env` 函数，强烈建议添加适当的配置值到配置文件，然后在该位置调用 `env`，从而允许你将 `env` 调用改为 `config` 调用。
> 注： Laravel 5.2 也提倡用此方法。


## 帮助方法

### 存放位置
Laravel 提供了很多 [辅助函数](http://laravel-china.org/docs/5.1/helpers)，有时候我们也需要创建自己的帮助函数，`必须` 把所有的「自定义辅助函数」存放于 `app/Helpers.php` 中。
为了保证自动加载，编辑 `composer.json` 文件的 `autoload` 选项中加入以下：
```
"files": [
  "app/Helpers.php"
],
```
然后运行：
```
composer dump-autoload
```
请求`\Illuminate\Http\Request` 和 `Request` 的混淆。
见：[http://stackoverflow.com/questions/34675057/undefined-method-in-requestall](http://stackoverflow.com/questions/34675057/undefined-method-in-requestall)

## 数据填充

### 运行效率
开发数据填充时，`必须` 特别注意 `php artisan db:seed` 的运行效率，否则随着项目的代码量越来越大，`db:seed` 的运行时间会变得越来越长，有些项目多达几分钟甚至几十分钟。
原则是：
> Keep it lighting speed.

只有当 `db:seed` 运行起来很快的时候，才能完全利用数据填充工具带来的便利，而不是累赘。

### 批量入库
所有假数据入库操作，都 `必须` 是批量操作，参照：[大批量假数据填充的正确方法](https://phphub.org/topics/2066)。

### factory 辅助函数
`必须` 使用 `factory` 方法来做数据填充，因为是框架提倡的，并且可以同时为测试代码服务。 Artisan 命令行 所有的自定义命令，都必须有项目的命名空间。 如：
```
php artisan phphub:clear-token
php artisan phphub:send-status-email
...
```

### 日期和时间

- `必须` 使用 [Carbon](https://github.com/briannesbitt/Carbon) 来处理日期和时间相关的操作。 前端开发
- `必须` 使用 [Elixir](http://laravel-china.org/docs/5.1/elixir) 做前端开发自动化工具；
- `必须` 保证页面只加载一个 `.css` 文件；
- `必须` 保证页面只加载一个 `.js` 文件；
- `必须` 为 `.css` 和 `.js` 增加 [版本控制](https://laravel-china.org/docs/5.1/elixir#versioning-and-cache-busting)；
- `必须` 使用 [SASS](http://laravel-china.org/docs/5.1/elixir#sass) 来书写 CSS 代码；
