## 6 HTML - 表单标签
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/UcE7u5kzJc7TpHFuoj6IhmxZrRgRv7KNbB6OximK.mp4"></video>

本课程将为大家讲解表单标签的使用方法，包括：

- form 标签
- input 标签
- select 标签

表单在网页中主要负责数据采集功能。一个表单有三个基本组成部分：

- 表单标签：包括了处理表单数据的形式及数据提交到服务器的地址等。
- 表单输入：包括了文本框、密码框、隐藏域、多行文本框、复选框、单选框、下拉选择框和文件上传框等。
- 表单按钮：包括提交按钮、复位按钮和一般按钮等。

## form 标签
在这节课程中，我们一起来学习什么是 from 标签。

form 为表单标签，定义表单,其主要包含 Action 和 Method 属性。

- Action 用于指定提交到服务器上的URL
- Method 用于指定提交方式，一般为 POST

⚠️ 注意：随着 AJAX 技术的发展，Action 和 Method 已经很少使用了。

```html
<form action="action_page.php" method="POST">
  <input type="text" name="username">
  <input type="submit" value="Submit">
</form>
```

## input 标签
在这节课程中，我们一起来学习什么是 input 标签。

input 为输入元素，根据其 type 属性不同，其输入的形态不一样：

**input 标签的常用属性有 ：**

| 属性 | 描述 |
| :--- | :--- |
| type | 输入类型 |
| name | 输入名称 |
| value | 输入值 |
| placeholder | 预显示字段 |
| disabled | 是否被禁用 |
| readonly | 是否自读 |
| required | 是否必填 |

**常用 type 类型有**

```
- text 文本输入
- number 数字输入
- password 密码输入
- radio 单选
- checkbox 多选
- color 颜色输入
- email 邮箱输入
- range 范围输入
- date 日期输入
- submit 提交
- hidden 隐藏
- reset 重设
```

接下来我们一起操作一下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Form</title>
</head>
<body>
  <form>
    <div><input type="text" name="name" placeholder="文本输入"></div>
    <div><input type="number" name="number" placeholder="数字输入"></div>
    <div><input type="passport" name="passport" placeholder="密码输入"></div>
    <div><input type="radio" name="radio" value="1" >单选<input type="radio" name="radio" value="1" >单选</div>
    <div><input type="checkbox" name="checkbox" value="1" >多选<input type="checkbox" name="checkbox" value="1" >多选</div>
    <div><input type="color" name="color"></div>
    <div><input type="range" name="range"></div>
    <div><input type="date" name="date"></div>
    <div><input type="reset" name="reset" value="重设"></div>
    <div><input type="submit" name="submit" value="提交"></div>
  </form>
</body>
</html>
```

## select 标签
在这节课程中，我们一起来学习什么是 select 标签。select 定义选择元素，配合 option 选择项来使用。

```html
<select>
  <option value ="volvo">Volvo</option>
  <option value ="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
```

## 小结与作业
通过这次课程我们应该对 HTML 表单标签的概念及使用方法有了一定的了解 ，包括：

- form 标签
- input 标签
- select 标签

下面我们综合使用一下以上的表单标签，尝试书写一个简易的调查问卷表单：

1. 首先我们桌面新建一个 demo 文件夹，并在其中创建 demo.html
1. 接着我们使用快捷方式在 demo.html 中创建结构元素，并定义好 title 内容和文字编码。
1. 创建 header 元素、创建、div 容器、创建 footer 元素。
1. 首先使用 form 表单元素定义一个表单
1. 然后定义 div 容器来存放表单中的每一项
1. 首先定义姓名输入框，type 为 text 文字类型
1. 定义邮箱输入框，type 为 email 邮箱类型
1. 定义性别为单选，type 为 radio 单选类型
1. 定义喜欢吃的食物为多选，type 为 checkbox 单选类型
1. 定义对鸡翅的喜爱程度，使用 select 元素下拉选择。option 为每一项
1. 最后定义重设和提交按钮

```html
<!DOCTYPE html> 
<html> 
<head> 
  <meta charset="utf-8">
  <title>表单标签</title> 
</head> 
<body> 
  <header><h1>小调查</h1></header>
  <div>
    <form>
      <div class="form-item">
        <span>姓名</span>
        <input type="text" name="name">
      </div>
      <div class="form-item">
        <span>邮箱</span>
        <input type="text" name="email">
      </div>
      <div class="form-item">
        <span>性别</span>
        <input type="radio" name="radio" value="1" >男
        <input type="radio" name="radio" value="2" >女
      </div>
      <div class="form-item">
        <span>喜欢吃的食物</span>
        <input type="checkbox" name="checkbox" value="1" >酱油鸡翅
        <input type="checkbox" name="checkbox" value="2" >麦辣鸡翅
        <input type="checkbox" name="checkbox" value="3" >椒盐鸡翅
        <input type="checkbox" name="checkbox" value="4" >茄汁鸡翅
      </div>
      <div class="form-item">
        <span>对鸡翅的喜爱程度</span>
        <select>
          <option value="不喜欢">不喜欢</option>
          <option value="一般般">一般般</option>
          <option value="很喜欢">很喜欢</option>
        </select>
      </div>
      <div class="form-item">
        <input type="reset" name="reset" value="重设">
        <input type="submit" name="submit" value="提交">
      </div>
    </form>
  </div> 
  <footer>Designed By AitSchool</footer>
</body> 
</html>
```
