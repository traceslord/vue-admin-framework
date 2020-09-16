## 4 Markdown 基础使用

![15953161600588180aedbcde94ba4996fea38c2c4c989.jpeg](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/BZPPUFh2YarCUne71NAs7H2eDegKpR7IuX4ToOVC.jpeg)

本次课程，我们来学习 Markdown 常用的语法。通过本次课程，你将学习到：

- Markdown 简介
- 标题、列表语法
- 加粗、斜体语法
- 图片、链接语法

## Markdown 简介
Markdown 是一种轻量级标记语言，使用易读易写的纯文本格式编写文档。Markdown 的轻量、易读易写，支持图片，图表、数学式等，被广泛用于来撰写帮助文档。

使用 Markdown 你可以：

- 专注你的文字内容而不是排版样式，安心写作。
- 轻松的导出 HTML、PDF 和本身的 .md 文件。
- 纯文本内容，兼容所有的文本编辑器与字处理软件。

在一篇文章中通常有一级标题，二级标题，我们使用 Word 或者富文本编辑器编辑时候常常需要考虑他们的字号、大小。当一处修改，其他地方为了统一往往也需要逐个的检查。使用 Markdown 我们就不需要再纠结于格式，使用统一的语法标记，专注于内容本身。

Markdown 文件格式使用 .md 后缀，我们可以通过 md 后缀辨别是否 md 文件，例如：hello.md 。

## 标题、列表语法
标题的标记语法为 # ，一个 # 标记一级标题，两个 ## 标记二级标题，三个 ### 标记三级标题。

列表的标记为 - ，如果是有序列表可以使用数字和点来标记。

```bash
# 关于我
Hi，我是华仔。是居住在中国的网络开发人员，是技术，设计和音乐的爱好者。

## 想去的地方

- 北京动物园
- 上海南京路
- 成都洞子火锅

## 喜欢吃的美食排行

1. 广州白切鸡
2. 潮汕牛肉火锅
3. 北京胡大小龙虾

```

## 斜体、加粗语法
斜体的语法为两边使用 * 号标示，例如入：文字里面这个是*斜体*，多用于文件名称。

斜体的语法为两边使用 ** 号标示，例如入：文字里面这个是**加粗**，多用于重点突出词组。

```bash
*2020年七月二十一日* 我又一次路过**大董**，它们家的冰淇淋是薄荷味。
```

## 图片、链接语法
链接使用 []() 来标记，[] 中括号里面放置展示内容，() 大括号里面放置跳转地址。

图片使用 ![]() 来标记，[] 中号中放置图片加载失败展示的名称，() 大括号里放置图片资源地址。

```bash
Markdown 的图片
- ![使用相对路径](./images/markdown-image.jpeg)
- ![使用绝对路径](https://assets.jiker.com/wiki/markdown-image.jpg)

Markdown 参考：
- [维基百科 Markdown](https://zh.wikipedia.org/wiki/Markdown)
- [Markdown 官方](https://daringfireball.net/projects/markdown/syntax)
- [少数派 入门与认识 Markdown](https://sspai.com/post/25137)
```

## 小结与作业
通过本次课程，对Markdown 常用的语法有一定的了解 ，包括：

- 为什是 Markdown
- 标题、列表语法
- 加粗、斜体语法
- 图片、链接语法

最后我们的作业是：使用 Markdown 写一篇学习心得，并提交到 Github。

1. 在 Github 上创建 study-web 仓库
2. 在 本地的桌面（也可以其他地方）创建 study-web 文件夹。
3. 使用 VS Code 编辑器创建 README.md 文文件
4. 在 README.md 中使用 Markdown 来记录学习历程、笔记 或者 心得。
5. 同步推送到 Github study-web 仓库中。
