## 5 HTML - 表格标签
<video controls src="https://assets.jiker.com/attachment/2020/0219/folder/zXwl8EtfRRBZPqaW3XD6UJuyeQnFAU4UZUYkLbZO.mp4"></video>

本课程将为大家讲解表格标签的使用方法，包括：

- 表格的基础元素
- 表格的其他元素
- 表格的跨行跨列属性
- 表格的其他属性

## 表格基础元素
在这节课程中，我们一起来学习表格的基础元素。

简单的 HTML 表格由 table、tr、td、th 元素组成

- table  定义表格的元素
- tr 定义表格中的行
- th 定义表格中表头单元格
- td 定义表格中标准单元格

接下来我们一起来操作一下：

1. 创建一个 HTML 文件
2. 在 body 中书写一下代码

```html
<table>
  <tr>
    <th>星期一</th>
    <th>星期二</th>
    <th>星期三</th>
    <th>星期四</th>
    <th>星期五</th>
  </tr>
  <tr>
    <td>语文</td>
    <td>数学</td>
    <td>英语</td>
    <td>化学</td>
    <td>物理</td>
  </tr>
  <tr>
    <td>音乐</td>
    <td>体育</td>
    <td>政治</td>
    <td>生物</td>
    <td>地理</td>
  </tr>
  <tr>
    <td>美术</td>
    <td>电脑</td>
    <td>自习</td>
    <td>历史</td>
    <td>自习</td>
  </tr>
</table>
```

## 表格其他元素
在这节课程中，我们一起来学习表格的其他元素。

更复杂的 HTML 表格也可能包括 caption、thead、tfoot 以及 tbody 元素。

- caption (定义表格标题，必须紧随 table 标签之后，通常这个标题会被居中于表格之上)
- thead (定义表格的表头)
- tfoot (定义表格的页脚、脚注或表注)
- tbody (定义表格的表主体)

接下来我们一次操作一下：

```html
<table>
  <caption>简单的课程表</caption>
  <thead>
    <tr>
      <th>星期一</th>
      <th>星期二</th>
      <th>星期三</th>
      <th>星期四</th>
      <th>星期五</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>语文</td>
      <td>数学</td>
      <td>英语</td>
      <td>化学</td>
      <td>物理</td>
    </tr>
    <tr>
      <td>音乐</td>
      <td>体育</td>
      <td>政治</td>
      <td>生物</td>
      <td>地理</td>
    </tr>
    <tr>
      <td>美术</td>
      <td>电脑</td>
      <td>自习</td>
      <td>历史</td>
      <td>自习</td>
    </tr>
  </tbody>
</table>
```

## 跨行跨列属性
在这节课程中，我们一起来学习表格的跨行跨列属性。

- rowspan 属性规定单元格可横跨的行数。
- colspan 属性规定单元格可横跨的列数。

接下来我们一起操作一下：

1. 在原来的表格基础上，尝试添加 rowspan、colspan 属性

```html
<table>
  <caption>简单的课程表</caption>
  <thead>
    <tr>
      <th>时间</th>
      <th>星期一</th>
      <th>星期二</th>
      <th>星期三</th>
      <th>星期四</th>
      <th>星期五</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">上午</td>
      <td >语文</td>
      <td>数学</td>
      <td>英语</td>
      <td>化学</td>
      <td>物理</td>
    </tr>
    <tr>
      <td>音乐</td>
      <td>体育</td>
      <td>政治</td>
      <td>生物</td>
      <td>地理</td>
    </tr>
    <tr>
      <td>中午</td>
      <td colspan="5" align="center">休息</td>
    </tr>
    <tr>
      <td>下午</td>
      <td>美术</td>
      <td>电脑</td>
      <td>自习</td>
      <td>历史</td>
      <td>自习</td>
    </tr>
  </tbody>
</table>
```

## 表格其他属性
在这节课程中，我们一起来学习表格的其他属性。

- border 定义表格边框宽度
- cellpadding 定义单元边沿与其内容之间的空白
- cellspacing 定义单元格之间的空白
- width 定义表单宽度

接下来我们一起操作一下：

```html
<table border="1" cellpadding="10" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th>时间</th>
      <th>星期一</th>
      <th>星期二</th>
      <th>星期三</th>
      <th>星期四</th>
      <th>星期五</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">上午</td>
      <td >语文</td>
      <td>数学</td>
      <td>英语</td>
      <td>化学</td>
      <td>物理</td>
    </tr>
    <tr>
      <td>音乐</td>
      <td>体育</td>
      <td>政治</td>
      <td>生物</td>
      <td>地理</td>
    </tr>
    <tr>
      <td>中午</td>
      <td colspan="5" align="center">休息</td>
    </tr>
    <tr>
      <td>下午</td>
      <td>美术</td>
      <td>电脑</td>
      <td>自习</td>
      <td>历史</td>
      <td>自习</td>
    </tr>
  </tbody>
</table>
```

## 小结与作业
通过这次课程我们应该对表格标签及属性有了一定的了解 ，包括：

- 表格的基础元素
- 表格的其他元素
- 表格的跨行跨列属性
- 表格的其他属性

接下来我们来完成一个课程表：

1. 首先我们桌面新建一个 demo 文件夹
2. 接下来我们使用编辑器打开 demo 文件夹，并在里面创建一个 demo.html 文件。
3. 接着我们使用快捷方式在 demo.html 中创建结构元素，并定义好 title 内容和文字编码。
4. 创建 header 元素、创建、div 容器防止内容、创建 footer 元素。
5. 首先我们开始编写基础的课程表，table 标签，tr 标签定义行，th 标签定义表头单元格，td 定义标准单元格。（切换浏览器看一下，说，好了效果显示了）
6. 然后我们加入时间的概念来跨行，添加上午、下午 的纵向跨行（切换浏览器看一下，说，好了效果显示了）
7. 中午及休息阶段 的横向换行（切换浏览器看一下，说，好了效果显示了）
8. 最后为表格添加其他属性，边框宽度 为 1、单元边沿与其内容之间的空白 为 9、单元格之间的空白 为 0、宽度 100%（切换浏览器看一下，说，好了效果显示了）
