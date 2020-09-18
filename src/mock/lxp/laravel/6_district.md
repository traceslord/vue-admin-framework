# 省市选择

### 创建文件迁移
```bash
php artisan make:migration create_districts
```
_/database/migrations/xxx_create_districts.php_
```bash
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDistrictsTable extends Migration
{
  /**
    * Run the migrations.
    */
  public function up()
  {
    Schema::create('districts', function (Blueprint $table) {
      $table->unsignedInteger('code')->primary();
      $table->string('city_code', 10)->nullable();
      $table->string('name');
      $table->string('level');
      $table->unsignedInteger('parent_code')->nullable();
    });
  }

  /**
    * Reverse the migrations.
    */
  public function down()
  {
    Schema::dropIfExists('districts');
  }
}

```

### 创建省市模型 Model
```bash
php artisan make:model Models/District
```
app/Models/District.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
  public $timestamps = false;

  protected $table = 'districts';

  protected $primaryKey = 'code';

  public $incrementing = false;

  protected $fillable = [
    'code',
    'city_code',
    'name',
    'level',
    'parent_code',
  ];

  public function parent()
  {
    return $this->belongsTo(self::class, 'parent_code', 'code');
  }

  public function children()
  {
    return $this->hasMany(self::class,'parent_code','code');
  }

  public static function info($id)
  {
    if (empty($id)) {
      return null;
    }
    $_district = self::where('level', 'district')->with('parent.parent')->find($id);
    if (empty($_district)) {
      return null;
    }
    $district = [
      'code' => $_district->code,
      'name' => $_district->name,
      'parent_code' => $_district->parent_code,
    ];

    $parent1 = $_district->parent;
    if ($parent1->level == 'city') {
      $city = [
        'code' => $parent1->code,
        'name' => $parent1->name,
        'parent_code' => $parent1->parent_code,
      ];

      $parent2 = $parent1->parent;
      $province = [
        'code' => $parent2->code,
        'name' => $parent2->name,
        'parent_code' => $parent2->parent_code,
      ];
    } else {
      $city = null;
      $province = [
        'code' => $parent1->code,
        'name' => $parent1->name,
        'parent_code' => $parent1->parent_code,
      ];
    }

    return compact('province', 'city', 'district');
  }
}

```

### 创建省市控制器 Controller
```php
php artisan make:controller Api/Web/DestrictController
```
_app/Http/Controllers/Api/Web/DestrictController.php_
```php
<?php

namespace App\Http\Controllers\Api\Web;
use Cache;
use App\Models\District;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DestrictController extends Controller
{
  public function index(Request $request)
  {
    $districts = Cache::get('all_distincts');
    if (!$districts) {
      $districts = Cache::rememberForever('all_distincts', function () {
        return $this->allDistincts();
      });
    }
    return $this->success($districts);
  }

  /**
    * 因为目前只有此处会返回所有地理数据，暂时放在此处，如果多处需要，可以考虑抽离重用
    * @return array
    */
  protected function allDistincts()
  {
    $districts = District::whereNull('parent_code')
      ->with('children.children')
      ->orderBy('code')
      ->get();

    $provinceArr = [];
    $i = 0;
    foreach ($districts as $province) {
      $provinceArr[$i] = [
        'label' => $province->name,
        'value' => $province->code
      ];
      $j = 0;
      foreach ($province->children as $city) {
        $provinceArr[$i]['children'][$j] = [
          'label' => $city->name,
          'value' => $city->code
        ];
        $k = 0;
        foreach ($city->children as $district) {
          $provinceArr[$i]['children'][$j]['children'][$k] = [
            'label' => $district->name,
            'value' => $district->code
          ];
          $k++;
        }
        $j++;
      }
      $i++;
    }
    return $provinceArr;
  }
}

```

### 创建省市路由 Router
_routes/api_web.php_
```php
<? php
  $router->get('/districts', 'DestrictController@index');
```

### 导入数据与测试接口
```php
php artisan migrate
```
下载导入以下高德地图地理位置相关数据： [districts.sql](https://www.yuque.com/attachments/yuque/0/2020/sql/166094/1599194052773-3416f890-425a-41e6-be4b-01f2fd7c79a3.sql?_lake_card=%7B%22uid%22%3A%221599194051886-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2020%2Fsql%2F166094%2F1599194052773-3416f890-425a-41e6-be4b-01f2fd7c79a3.sql%22%2C%22name%22%3A%22districts.sql%22%2C%22size%22%3A160130%2C%22type%22%3A%22%22%2C%22ext%22%3A%22sql%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22V1r2R%22%2C%22card%22%3A%22file%22%7D)
请求地址 /api/web/districts 测试看是否数据返回成功。
