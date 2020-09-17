## 7 HTML - 百度首页
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/YLIGqV02LbfyD9kmK9b3MP632KDuzLxAGoopM4n1.mp4"></video>

本课程将为大家带来简单版的百度首页 HTML 编写。

首先我们分析其页面结构，我们可以大致划分成：头部、主体、脚步三个主要结构。头部部分只包含一个导航信息，主体部分有 Logo 和 一个搜索表单，搜索表单中只有一个输入框和提交按钮。脚步有二维码信息及备案内容。

我们完成的逻辑为：

1. 新建项目文件夹及文件
2. HTML 结构
3. 头部导航信息
4. 主体内容信息 Logo/表单
5. 脚步信息

下面我们来完成一下百度首页的HTML结构：

## 1. 新建项目

在桌面创建**baidu_demo**文件夹进入**baidu_demo**文件夹，创建 **index.html** 文件

## 2. 创建页面结构

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>百度一下，你就知道</title>
</head>
<body>
  <header class="page-header"></header>
  <div class="page-mainer"></div>
  <footer class="page-footer"></footer>
</body>
</html>
```

## 3. 头部导航信息

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>百度一下，你就知道</title>
</head>
<body>
  <header class="page-header">
    <!-- 导航 -->
    <nav>
      <a href="javascript:;">新闻</a>
      <a href="javascript:;">hao123</a>
      <a href="javascript:;">地图</a>
      <a href="javascript:;">视频</a>
      <a href="javascript:;">贴吧</a>
      <a href="javascript:;">学术</a>
      <a href="javascript:;">登录</a>
      <a href="javascript:;">设置</a>
      <a href="javascript:;">更多产品</a>
    </nav>
    <!-- 导航 end -->
  </header>
  <div class="page-mainer"></div>
  <footer class="page-footer"></footer>
</body>
</html>
```

## 4. 主体内容信息

我们可以观察到主体区域里面有比较醒目的 Logo 和一个搜索框

- Logo
- 搜索框

1. Logo 图片自己独立一行，因为图片是行内元素，如果他希望自己独立一行的话需要在外面单独包一成块级元素就是 div 。

我们使用图片的服务器绝对地址 https://www.baidu.com/img/bd_logo1.png。同学们也可以把地址中图片下载改成相对地址。

```html
<div class="logo-container">
  <img class="logo" src="https://www.baidu.com/img/bd_logo1.png" alt="baidu"/>
</div>
```

2. 搜索框包含输入框和提交按钮

```html
<div class="form-container">
  <form>
    <input class="form-search" type="text" name="search" placeholder="">
    <button class="submit-btn">百度一下</button>
  </form>
</div>
```

合并代码

```html
<div class="page-mainer">
  <div class="logo-container">
    <img class="logo" src="https://www.baidu.com/img/bd_logo1.png" alt="baidu"/>
  </div>
  <div class="form-container">
    <form>
      <input class="form-search" type="text" name="search" placeholder="">
      <button class="submit-btn">百度一下</button>
    </form>
  </div>
</div>
```

## 5. 脚步信息

脚部分信息包含三个内容

- 二维码
- 信息（把百度设为主页 关于百度About  Baidu百度推广）
- 信息（©2018 Baidu 使用百度前必读 意见反馈 京ICP证030173号  京公网安备11000002000001号 ）

同样我们一个个来拆分其结构

1. 二维码

```html
<div class="qrcode-contaienr">
  <img class="qrcode" src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png">
</div>
```

2. 信息部分我们可以看到有下划线的都是可以调整的部分，都应该使用 a 标签

```html
<p class="footer-info">
  <a href="javascript:;">把百度设为主页</a>
  <a href="javascript:;">关于百度About</a>
  <a href="javascript:;">Baidu百度推广</a>
</p>
```

3. 剩下的信息部分同理，在需要跳转的文字，使用 a 标签

```html
<p class="footer-info">©2018 Baidu <a href="javascript:;">使用百度前必读</a> <a href="javascript:;">意见反馈</a> 京ICP证030173号  <a href="javascript:;">京公网安备11000002000001号</a></p>
```

4. 在 footer 标签中合并三小部分的代码

```html
<footer class="page-footer">
  <div class="qrcode-contaienr">
    <img class="qrcode" src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png">
  </div>
  <p class="footer-info">
    <a href="javascript:;">把百度设为主页</a>
    <a href="javascript:;">关于百度About</a>
    <a href="javascript:;">Baidu百度推广</a>
  </p>
  <p class="footer-info">©2018 Baidu <a href="javascript:;">使用百度前必读</a> <a href="javascript:;">意见反馈</a> 京ICP证030173号  <a href="javascript:;">京公网安备11000002000001号</a></p>
</footer>
```

## 最终代码参考

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>百度一下，你就知道</title>
</head>
<body>
  <header class="page-header">
    <nav>
      <a href="javascript:;">新闻</a>
      <a href="javascript:;">hao123</a>
      <a href="javascript:;">地图</a>
      <a href="javascript:;">视频</a>
      <a href="javascript:;">贴吧</a>
      <a href="javascript:;">学术</a>
      <a href="javascript:;">登录</a>
      <a href="javascript:;">设置</a>
      <a href="javascript:;">更多产品</a>
    </nav>
  </header>
  <div class="page-mainer">
    <div class="logo-container">
      <img class="logo" src="https://www.baidu.com/img/bd_logo1.png" alt="baidu"/>
    </div>
    <div class="form-container">
      <form>
          <input class="form-search" type="text" name="search" placeholder="">
          <button class="submit-btn">百度一下</button>
      </form>
    </div>
  </div>
  <footer class="page-footer">
    <div class="qrcode-contaienr">
      <img class="qrcode" src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png">
    </div>
    <p class="footer-info">
      <a href="javascript:;">把百度设为主页</a>
      <a href="javascript:;">关于百度About</a>
      <a href="javascript:;">Baidu百度推广</a>
    </p>
    <p class="footer-info">©2018 Baidu <a href="javascript:;">使用百度前必读</a> <a href="javascript:;">意见反馈</a> 京ICP证030173号  <a href="javascript:;">京公网安备11000002000001号</a></p>
  </footer>
</body>
</html>
```
