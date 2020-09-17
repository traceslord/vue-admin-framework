## 4 HTML - 资源标签
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/xJygoTJIrEoTbCvfP85dgLe212zzqV5iGnHAeg8z.mp4"></video>

本课程将为大家讲解资源标签的使用方法，包括：

- img 标签
- link、script 标签
- video、audio 标签

## img
在这节课程中，我们一起来学习什么是 img 标签。

img 代表文档中的一个图像。HTML 标准并没有给出必须支持的图像格式的列表，因此每个用户代理支持一组不同的格式。

- src 图像的 URL，这个属性对 img 元素来说是必需的。
- alt 这个属性定义了描述图像的替换文本。用户将看到这个显示，如果图像的URL是错误的，该图像不在 支持的格式 列表中，或者如果图像还没有被下载。

```html
<img src="https://www.baidu.com/img/bd_logo1.png" alt="Baidu">
```

## link、script 标签
在这节课程中，我们一起来学习什么是 link、script 标签。

- link 用于链接一个外部样式表，引入CSS样式。一般放置在head标签中的底部。
- script 用于在 HTML 页面中插入一段 JavaScript。一般放置在body标签中的底部。

```html
<head>
  <link href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.css" rel="stylesheet">
</head>
<body>
  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
</body>
```

## video、audio 标签
在这节课程中，我们一起来学习什么是 vidoe、audio 标签。

video 标签定义视频，用于在HTML或者XHTML文档中嵌入视频内容，比如电影片段或其他视频流。Internet Explorer 8 以及更早的版本不支持 video 标签。

- src      播放的视频的 URL
- width    视频播放器的宽度
- height   视频播放器的高度
- autoplay 视频在就绪后马上播放
- controls 向用户显示控件，比如播放按钮
- loop     当媒介文件完成播放后再次开始播放
- muted    规定视频的音频输出应该被静音
- poster   规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像
- preload  视频在页面加载时进行加载，并预备播放。

```html
<video controls src="https://q2.cdn.youked.com/w2/guide/guide-course-mac-02.mp4" controls>
    您的浏览器不支持 video 标签。
</video>
```

audio 标签定义声音，比如音乐或其他音频流。Internet Explorer 8 以及更早的版本不支持 audio 标签。

- src      播放的音频的 URL
- autoplay 音频在就绪后马上播放
- controls 向用户显示控件，比如播放按钮
- loop     当媒介文件完成播放后再次开始播放
- muted    规定音频的音频输出应该被静音
- preload  音频在页面加载时进行加载，并预备播放。

```html
<audio src="http://m128.xiami.net/737/72737/2103660423/1802802237_1522651341530.mp3?auth_key=1524366000-0-0-83305dc0651d96a960ce1cf1cf959f5d" controls>
    您的浏览器不支持 audio 标签。
</audio>
```

## 小结和作业
通过这次课程我们应该对 HTML 资源标签的概念及使用方法有了一定的了解 ，包括：

- img 标签
- link、script 标签
- video、audio 标签

接下来我们一起操作一下：

1. 首先我们桌面新建一个 demo 文件夹
2. 文件夹中，我们放置了一张 demo.png 的图片，demo.mp3 音频，demo.mp4 视频
3. 接下来我们使用 sublime 编辑器打开 demo 文件夹，并在里面创建一个 demo.html 文件、demo.css 文件、demo.js 文件。
4. 接着我们使用快捷方式在 demo.html 中创建结构元素，并定义好 title 内容和文字编码。
5. 引用 CSS、JavaScript 类型文件
6. 创建 header 元素、创建、div 容器防止内容、创建 footer 元素。
7. 在内容容器中，创建 h2 二级标题，及使用 div 容器包含 video 视频元素。
8. 在内容容器中，创建 h2 二级标题，及使用 div 容器包含 video 音频元素
9. 浏览器打开预览一下，就可以看到我们的图片、视频、音频都出现在页面上了。
10. 我们使用的是相对的路径。同学们可以直接使用网络绝对路径，或者资源下载到本地然后再使用相对路径。

作业资源下载：

- 图片地址：[https://q2.cdn.prodegree.com/aitschool/2018/1024/d38QP4C7bVCbgetxCdVinbVuzanz6Ld0TJLHw2xL.jpg](https://q2.cdn.prodegree.com/aitschool/2018/1024/d38QP4C7bVCbgetxCdVinbVuzanz6Ld0TJLHw2xL.jpg)
- 视频地址：[https://q2.cdn.prodegree.com/aitschool/2018/1024/f2UdkDUxEqzL8oAWDlLhzKt1lkkVIxM9JdYtsiEl.mp4](https://q2.cdn.prodegree.com/aitschool/2018/1024/f2UdkDUxEqzL8oAWDlLhzKt1lkkVIxM9JdYtsiEl.mp4)
- 音频地址：[https://q2.cdn.prodegree.com/aitschool/2018/1024/2YgUuZxs4apofgPBTJP6qyX8ZKFAaQ5qBcVOqpP0.mp3](https://q2.cdn.prodegree.com/aitschool/2018/1024/2YgUuZxs4apofgPBTJP6qyX8ZKFAaQ5qBcVOqpP0.mp3)

代码参考：

```html
<!DOCTYPE html> 
<html> 
<head> 
  <meta charset="utf-8">
  <title>资源引用</title> 
  <link href="./index.css" rel="stylesheet">
</head> 
<body> 
  <header><h1>资源引用</h1></header>
  <div>
    <h2>图像</h2>
    <div>
      <img src="./demo.jpg">
    </div>
    <h2>视频</h2>
    <div>
      <video controls src="./demo.mp4" controls></video>
    </div>
    <h2>音频</h2>
    <div>
      <audio src="./demo.mp3" controls></audio>
    </div>
  </div> 
  <footer>Designed By AitSchool</footer>
  <script src="./index.js"></script>
</body> 
</html>
```
