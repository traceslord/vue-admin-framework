## 3 HTML - 文本标签
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/kXNTTldz5MrH1IhBBRdnWtQ14RhXzrvNGCkRdt9R.mp4"></video>

本课程将为大家讲解文本标签的概念及使用方法，包括：

- h1 ~ h6 标签
- strong、span、a 标签
- p 标签
- ul、ol、li 标签
- dl、dt、dd 标签
- div、br 标签

## h1 ~ h6 标签
在这节课程中，我们一起来学习什么是 h1 ~ h6 标签。

h1 ~ h6 定义标题。h1 定义最大的标题，h6 定义最小的标题。文档页面中应当最多只出现一个 h1 标签。可以理解为 h1 标记一级标题，h2 标记二级标题、h3 标记三级标题，以此类推 h4、h5、h6。

```html
<h1>这是 1 级标题</h1>
<h2>这是 2 级标题</h2>
<h3>这是 3 级标题</h3>
<h4>这是 4 级标题</h4>
<h5>这是 5 级标题</h5>
<h6>这是 6 级标题</h6>
```

## strong、span、a 标签
在这节课程中，我们一起来学习什么是 strong、span、a 标签。

strong 用于强调的内容，主要用于关键字处，不适宜大量使用

```html
<h1><strong>关键字</strong>了解一下</h1>
```

span 标签被用来组合文档中的行内元素。span 没有固定的格式表现。当对它应用样式时，它才会产生视觉上的变化。

```html
<div>
    <span>some text.</span>some other text.
</div>
```

a 标签定义超链接，用于从一个页面链接到另一个页面。

- a 标签中的 href 属性用于指定超链接目标的 URL。
- a 标签中的 target 属性指定在何处显示链接的资源。\_self 当前页面加载, \_blank 新页面打开加载。

```html
<a href="https://www.baidu.com" target="_blank">打开百度网页</a>
```

## p 标签
在这节课程中，我们一起来学习什么是 p 标签。

p（ paragraph ）表示文本的一个段落。该元素通常表现为一整块与相邻文本分离的文本。

```html
<p>这是第一个段落。</p>
<p>这是第二个段落。</p>
```

## ul ol li 标签
在这节课程中，我们一起来学习什么是 ul、ol、li 标签。

- ul 定义无序列表
- ol 定义有序列表
- li 标签定义列表项目。

## dl dt dd 标签
在这节课程中，我们一起来学习什么是 ul、ol、li 标签。

- dl 标签定义了定义列表（definition list）。 dl 标签用于结合 dt、dd 使用。
- dt 定义列表中的项目标题
- dd 定义列表中的项目描述

## br

- div 标签通用型的内容容器
- br 标签定义换行符，用于换行使用。

div 标签它在语义上不代表任何特定类型的内容，它可以被用来对其它元素进行分组，一般用于样式化相关的需求（使用 class 或 id 特性) 或者对具有相同特性的一组元素进行分组 (比如 lang)，它应该在没有任何其它语义元素可用是才使用 (比如 article 或 nav) 。同是也是最常用的标签。

```html
<div>
    Mozilla Foundation<br>
    1981 Landings Drive<br>
    Building K<br>
    Mountain View, CA 94043-0801<br>
    USA
</div>
```

## 小结和作业
通过这次课程我们应该对 HTML 文本标签的概念及使用方法有了一定的了解 ，包括：

- h1 ~ h6 标签
- strong、span、a 标签
- p 标签
- ul、ol、li 标签
- dl、dt、dd 标签
- div、br 标签

接下来我们一起操作一下：

1. 在上节桌面创建的 HTML 文件夹中，新建一个 story.html 文件
2. 我们使用快捷方式创建结构文件
3. 修改下 title 和 字符编码，title 修改
4. 创建 header 标签，在 header 中创建 h1 一级标题和 p 段落描述
5. 创建 div 容器标签，用于存放其他内容
6. 创建 h2 二级标题，及使用 ul 列表标签来显示目录的每一项
7. 创建 h2 二级标题，及使用 p 段落来存放创作背景内容
8. 创建 h2 二级标题，及使用 div 容器来存放歌词并用 br 标签换行
9. 创建 h2 二级标题，及使用 dl 列表标签来表达更多信息
10. 最后 创建 footer 标签，来存放最后的信息，来自 AitSchool

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>为你写诗</title>
</head>
<body>
  <header>
    <h1>为你写诗 <span>（吴克群演唱歌曲）</span></h1>
    <p><strong>《为你写诗》</strong>是台湾歌手吴克群作词谱曲并演唱的一首歌曲，收录于他2008年3月14日发行的专辑
      <a href="javascript:;" target="_blank">《为你写诗》</a>中 。
    </p>
  </header>
  <div>
    <h2>目录</h2>
    <ul>
      <li>创作背景</li>
      <li>歌曲歌词</li>
      <li>更多信息</li>
    </ul>
    <h2>创作背景</h2>
    <p>在爱情里，每个人都是傻子，我们愿意为了对方付出，做出许多疯狂甜蜜的事。一封温馨的简讯，一则关心对方的离线讯息，还有在部落格上面写下对对方的感觉，其实都是一首诗，一首为了爱而疯狂的情诗。基于这样的原因，吴克群写下了这一首代表作品。</p>
    <h2>歌曲歌词</h2>
    <div>
      为你写诗<br>
      为你静止<br>
      为你做不可能的事<br>
      为你我学会弹琴写词<br>
      为你失去理智<br>
    </div>
    <h3>更多信息</h3>
    <dl>
      <dt>词条标签</dt>
      <dd>音乐作品</dd>
      <dd>单曲</dd>
      <dd>专辑</dd>
    </dl>
  </div>
  <footer>Designed By AitSchool</footer>
</body>
</html>
```
