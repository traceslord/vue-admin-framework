## 1 HTML - 概览
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/Sc8XQ01S1KRvcEouySD0C2tF7g2LmaKFqPgL2Ocr.mp4"></video>

本次课程，我们一起来学习下 HTML 基本构成，包括：

- 什么是 HTML 文档
- 什么是 HTML 元素
- 什么是 HTML 标签
- 什么事 HTML 属性

HTML 的英文名：HyperText Markup Language，全称为超文本标记语言。超文本的基本特征就是超链接，能把除了基础文本以外的资源给引入进来，例如：图片、音频、视频、样式、脚本等等，不仅仅只有文字。标记语言，并不是真正的的程序语言，用于用来结构化和含义页面的元素。

在网页开发中，前端重要语言有三个，分别是：HTML、CSS、JavaScript，HTML负责页面结构、CSS负责样式、JavaScript负责事件。用类比的方法，我们把网页想象成一个人，那么 HTML 就是人的骨骼，CSS 是人的衣服，JS 是人的动作行为。

HTML，是我们所有信息、资源流的集合与标记，如同树干与树叶的关系，告诉我们页面有什么，在哪里。就其核心来说, 是由元素组成的语言，为文本赋予它在一个文档中不同的意义, 结构化文档为逻辑区块并且可以嵌入图片影像等资源到一个页面中。

## HTML 文档
在这节课程中，我们一起来学习什么是 HTML 文档。

HTML 文档类型的后缀为 **.html** 。

接下来，我们一起来创建一个 HTML 文档文件：

1. 我们可以在桌面新建一个 HTML类型的文件，`hello.html`
2. 使用 Sublime 编辑器打开并复制到以下内容到文件中
3. 最后用 chrome 浏览器打开此文件。我们就可以看到网页中出现 Hello, HTML! 字段。

以下是一个完整小精简的文档

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>A tiny HTML document</title>
</head>
<body>
    <p>Hello,HTML!</p>
</body>
</html>
```

如果使用 VS Code ，可以输入 html:5 会有提示可以自动生成 HTML 5 的基础类型文档。![image.png](https://cdn.nlark.com/yuque/0/2020/png/166094/1595823111749-b12fd62d-c25d-4e35-a04f-e6574f84fc55.png#align=left&display=inline&height=180&margin=%5Bobject%20Object%5D&name=image.png&originHeight=180&originWidth=744&size=11030&status=done&style=none&width=744)

> HTML 以及之后代码文件的命名，尽量以英文为主，不要以中文命名。

## HTML 元素
在这节课程中，我们一起来学习什么是 HTML 元素。

HTML 是由元素组成，元素的组成部分有：开始标签、内容、闭合标签。例如以下一个段落元素事例：

```html
<p>Hello,HTML!</p>
```

- 开始标签：这里包含了元素的名称，被开、闭尖括号所包围。如 ：(`<p>`)。
- 内容：元素的内容，如例子中就是所输入的文本本身 **Hello,html!**。
- 闭合标签：与开始标签相似，只是其在元素名之前包含了一个斜杠。如这一段落的结尾(`</p>`)。

## HTML 标签
在这节课程中，我们一起来学习什么是 HTML 标签。

HTML 为由一对尖括号所括起来的内容赋予了特定含义. 这样的标识称为一个 标签（tag）。

大多数 HTML 元素由一个起始标签和一个结束标签标识。起始标签和结束标签应成对出现，也就是说在一个起始标签之后应有其对应的结束标签。  由两个标签（起始标签和结束标签）构成的元素而言，缺少其中之一，这个元素都可能会被认为是无效的。

```html
<em>我<strong>真的</strong>是这个意思</em> <!-- 有效: -->
<em>我<strong>真的</em>是这个意思</strong> <!-- 无效: -->
```

**空元素的标签**有些元素没有包含文本内容或者其他元素，我们称为空元素。它们没有结束标签，例如图片元素、换行元素:

```html
<img src="smileyface.jpg" alt="Smiley face" >
```

## HTML 属性
在这节课程中，我们一起来学习什么是 HTML 属性。

开始标签可能包含一些信息，这些信息叫做元素的特性，包括两部分:属性名、属性值。

```html
<img id="testId" class="test-klass" src="smileyface.jpg" alt="Smiley face" title="Smiley face">
```

一些元素可以只有特性名没有特性值。它们的特性名类似“是否”，“有或没有”，所以可以省略特性值，所以下面三种写法都是一样的意思:

```html
<input required="required">
<input required="">
<input required>
```

以下是 HTML 元素的公共属性：

| 属性 | 值 | 描述 |
| :--- | :--- | :--- |
| class | classname | 规定元素的类名（classname） |
| id | id | 规定元素的唯一 id |
| style | style_definition | 规定元素的行内样式（inline style） |
| title | text | 规定元素的额外信息（可在工具提示中显示） |
