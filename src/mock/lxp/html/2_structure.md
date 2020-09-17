## 2 HTML - 结构标签
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/YncNHwO1BFx1uGr9Xrdp2qGZkzpe0SXcOTtPxFKF.mp4"></video>

本课程将为大家讲解结构标签的概念及使用方法，包括：

- DOCTYPE 标签
- html、head、body 标签
- meta、title 标签
- header、footer、nav 标签
- div 标签

## DOCTYPE 标签
在这节课程中，我们一起来学习什么是 DOCTYPE 标签。

**DOCTYPE** 标签作用是指定 HTML 页面使用的版本和标准，让浏览器知道根据这个版本的标准来渲染，用于文档声明。

DTD（Document Type Definition）是一套为了进行程序间的数据交换而建立的关于标记符的语法规则。HTML的产生到现在经历了多个版本和标准，当时浏览器对各个版本支持不一致，有不兼容的地方。DTD 在 HTML 及 XML源文件中，通过一下语法包装在一个 **!DOCTYPE **声明中：`<!DOCTYPE 根元素 [元素声明]>`。例如： **HTML4.01** 版本的DTD如下：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

早期的HTML版本是基于 SGML, 因此需要套用 SGML 的解析规则。DTD 的作用在于定义 SGML 文档的文档类型以便于浏览器解析。HTML5 不再基于 SGML, 因此不再需要 DTD 来触发不同的浏览器渲染模式。 **HTML5** 版本的文档声明简化为：

```html
<!DOCTYPE html>
```

## html、head、body 标签
在这节课程中，我们一起来学习什么是 html、head、body 标签。

- html 标签定义文档，用于告知浏览器这是一个 html 文档。里面一般包含 head 标签和 body 标签，用于区分分档的头部和主题部分。如果在 html 根元素制定 lang 属性，为文档定义语言，有利语音及翻译工具确定所应遵循的规则。
- head 标签定义文档头部，用于描述文档的各种属性和信息、及应用资源。

里面一般会包含 meta、title、link 及 script 标签。

- body 标签定义文档内容，浏览器窗口展示的标签内容就在这里书写啦。

```html
<!DOCTYPE html lang="zh-CN">
<html>
    <head></head>
    <body></body>
</html>
```

## meta、title 标签
在这节课程中，我们一起来学习什么是 meta、title 标签。

- meta 标签定义元信息，多用于设置文字编码、针对搜素引擎的描述和关键词，还有一些手机端的显示设置。
- title 标签定义文档标题，设置了将出现在浏览器分页上显示。

```html
<!DOCTYPE html> 
<html> 
  <head> 
    <title>这里的文字会展示在浏览器标签里</title>
    <meta name="keywords" content="关键字1,关键字2,关键字3,关键字4" />
    <meta name="description" content="网页描述" />
  </head> 
  <body></body> 
</html>
```

## header、footer、nav 标签
在这节课程中，我们一起来学习什么是 header、footer、nav 标签。

- header 标签用于将 HTML 页面的一部分标记为页眉。
- footer 标签将所包含的元素内容标记为文档的页脚。
- nav 标签中包含的内容主要用于导航。并不是一定必须把所有链接组都要放入nav，把基本的、主要的即可。

```html
<!DOCTYPE html> 
<html> 
<head> 
    <title> A Simple HTML Page </title> 
</head> 
<body> 
    <header>Header 
        <nav> 
            <a href='#'>Some Nav Link</a> 
            <a href='#'>Some Other Nav Link</a> 
            <a href='#'>A Third Nav Link</a> 
        </nav>
    </header>
    <footer>Footer</footer> 
</body> 
</html>
```

## div 标签
在这节课程中，我们一起来学习什么是 div 标签。

div 标签是一个通用型的内容容器，它在语义上不代表任何特定类型的内容，它可以被用来对其它元素进行分组，一般用于样式化相关的需求（使用 class 或 id 特性) 或者对具有相同特性的一组元素进行分组 (比如 lang)，它应该在没有任何其它语义元素可用是才使用 (比如 article 或 nav) 。**同时也是最常用的标签**。

```html
<!DOCTYPE html> 
<html> 
<head> 
    <title> A Simple HTML Page </title> 
</head> 
<body> 
    <header>Header 
        <nav> 
            <a href='#'>Some Nav Link</a> 
            <a href='#'>Some Other Nav Link</a> 
            <a href='#'>A Third Nav Link</a> 
        </nav>
    </header>
    <div>Content</div>
    <footer>Footer</footer> 
</body> 
</html>
```

## 小结与作业
通过这次课程我们应该对 HTML 结构标签的概念及使用方法有了一定的了解 ，包括：

- DOCTYPE 标签
- html、head、body 标签
- meta、title 标签
- header、footer、nav 标签
- div 标签

接下来我们一起操作一下：

1. 新建一个 html 文件
2. 并写入以下信息
3. 保存，并用浏览器打开

```html
<!DOCTYPE html> 
<html> 
<head> 
  <meta charset="utf-8">
  <title>My FirstHTML</title> 
</head> 
<body> 
  <header>Header</header>
  <div>Content</div> 
  <footer>Footer</footer>
</body> 
</html>
```
