## 2 CSS - 选择器
<video controls src="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/t5cFTlvDYNndNnQA3W4uOuidRTYdcsCHQXeuUi21.mp4" poster="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/ezo34qVVa2sQErDlAkWsuYkh4q10MV4XrYzY5VU4.jpg"></video>

在 CSS 中，选择器是一种模式，用于选择需要添加样式的元素。

属性知识点 ：

- 通配符选择器（ * ）
- 元素选择器（ element )
- class选择器（ .class )
- id选择器 （ #id ）
- 后代选择器（Ｅ Ｆ）
- 子元素选择器 ( E > F )
- 相邻兄弟元素选择器( E + F )
- 通用兄弟选择器（ Ｅ 〜 Ｆ ）
- 群组选择器（selector1,...,selectorN）
- 属性选择器 ( E[attr] )
- 否定选择器（ :not(E) ）
- 动态伪类选择器
- 伪元素选择器
- :nth选择器

## HTML实例结构
新建以下HTML中DOM节点为例子，在 **style** 标签中使用以下的 CSS 命令来观察不同选择器所导致的样式变化：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Select</title>
</head>
<body>
<ul>
  <li data="attr-data">1</li>
  <li class="klass">2</li>
  <li class="klass">3</li>
  <li id="testID">4</li>
  <li><span>5</span></li>
  <li><span>6</span></li>
  <li><a href="https://www.baidu.com">百度</a></li>
</ul>
</body>
</html>
```

我们可以观察到浏览器的默认样式，默认的 margin 和 padding 属性。

## 通配符选择器（ * ）
通配符选择器是用来选择所有元素，也可以选择某个元素下的所有元素。在不同的浏览器下不同元素默认的内外边距都会不一一样，以下就是选择所有元素的内外边距直接设置为零。输入后会发现原本1～6数字的上下间距都消失了。

```css
* {
  margin: 0;
  padding: 0;
}
```

## 元素选择器（ element )
以下实例选择 body 元素并设置起背景为浅灰色。

```css
body {
  background: #f1f1f1;
}
```

## class选择器（ .class )
选择 class="klass" 的所有元素。如下设置class元素的颜色为红色。

```css
.klass {
  color: red;
}
```

## id选择器 （ #id ）
选择 id="testID" 的元素。如下设置id的元素颜色为蓝色。

```css
#testID {
  color: blue;
}
```

## 后代选择器（Ｅ Ｆ）
选择 E 元素下的 所有 F 元素，例如以下选择，li 下 所有 span 元素 为 绿色

```css
li span {
  color: green;
}
```

## 子元素选择器 ( E > F )
子元素选择器只能选择某元素的子元素，其中E为父元素，而F为子元素，其中E>F所表示的是选择了Ｅ元素下的所有子元素Ｆ。这和后代选择器（Ｅ Ｆ）不一样，在后代选择器中Ｆ是Ｅ的后代元素，而子元素选择器Ｅ > F，其中Ｆ仅仅是Ｅ的子元素而以。

```css
li > span {
  color: orange;
}
```

## 相邻兄弟元素选择器( E + F )
相邻兄弟选择器可以选择紧接在另一元素后的元素，而且他们具有一个相同的父元素，换句话说，EF两元素具有一个相同的父元素，而且Ｆ元素在Ｅ元素后面，而且相邻，这样我们就可以使用相邻兄弟元素选择器来选择Ｆ元素。以下设置id为testID的下一个li元素的背景色。

```css
#testID + li {
  background: #ccc;
}
```

## 通用兄弟选择器（ Ｅ 〜 Ｆ ）
通用兄弟元素选择器是CSS3新增加一种选择器，这种选择器将选择某元素后面的所有兄弟元素，他们也和相邻兄弟元素类似，需要在同一个父元素之中，换句话说，E和F元素是属于同一父元素之内，并且F元素在Ｅ元素之后，那么E ~ F 选择器将选择中所有Ｅ元素后面的Ｆ元素。以下设置id为testID的下所有li元素的背景色。

```css
#testID ～ li {
  background: #ccc;
}
```

## 群组选择器（selector1,...,selectorN）
群组选择器是将具有相同样式的元素分组在一起，每个选择器之间使用逗号“，”隔开，这个逗号告诉浏览器，规则中包含多个不同的选择器。一下设置class="klass"及id="testID"的背景色。

```css
#testID, .klass {
  background: #ccc;
}
```

## 属性选择器 ( E[attr] )
使用CSS3属性选择器，你可以只指定元素的某个属性，或者你还可以同时指定元素的某个属性和其对应的属性值。

- E[attr]：只使用属性名，但没有确定任何属性值
- E[attr="value"]：指定属性名，并指定了该属性的属性值
- E[attr`~`="value"]：指定属性名，并且具有属性值，此属性值是一个词列表，并且以空格隔开，其中词列表中包含了一个value词，而且等号前面的“〜”不能不写
- E[attr^="value"]：指定了属性名，并且有属性值，属性值是以value开头的
- E[attr$="value"]：指定了属性名，并且有属性值，而且属性值是以value结束的
- E[attr`*`="value"]：指定了属性名，并且有属性值，而且属值中包含了value
- E[attr|="value"]：指定了属性名，并且属性值是value或者以“value-”开头的值（比如说zh-cn）

以下设置li下有data属性的元素的背景色：

```css
li[data] {
  background: #ccc;
}
```

## 否定选择器（ :not(E) ）
选择非选择E元素的每个元素。以下是li元素中除了id为testID的元素字体大小都为12px

```css
li:not(#testID) {
  font-size: 12px;
}
```

## 动态伪类选择器
动态伪类，因为这些伪类并不存在于HTML中,而只有当用户和网站交互的时候才能体现出来，动态伪类包含两种，第一种是我们在链接中常看到的锚点伪类，如":link",":visited";另外一种被称作用户行为伪类，如“:hover”,":active"和":focus"。

- :link    链接没有被访问时前景色为灰色
- :visited 链接被访问过后前景色为黄色
- :hover   鼠标悬浮在链接上时前景色为绿色
- :active  鼠标点中激活链接那一下前景色为蓝色
- :focus用于元素成为焦点，这个经常用在表单元素上

```css
li a:link {
  color: blue;
}
li a:visited {
  color: blue;
}
li a:hover {
  color: red;;
}
li a:active {
  color: yellow;
}
```

## 伪元素选择器

- ::first-line    选择元素的第一行
- ::first-letter  选择文本块的第一个字母
- ::before        给元素的前面插入内容
- ::after         给元素的后面插入内容

```css
#testID::before {
  content: "A";
}
#testID::after {
  content: "D";
}
#testID::first-letter {
  color: #303133;
}
#testID::first-line {
  background: #f1f1f1;
}
```

## :nth选择器

- :first-child         选择某个元素的第一个子元素
- :last-child          选择某个元素的最后一个子元素
- :nth-child(n)        选择某个元素的一个或多个特定的子元素
- :nth-last-child(n)   选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算
- :nth-of-type(n)      选择指定的元素
- :nth-last-of-type(n) 选择指定的元素，从元素的最后一个开始计算
- :first-of-type       选择一个上级元素下的第一个同类子元素
- :last-of-type        选择一个上级元素的最后一个同类子元素
- :only-child          选择的元素是它的父元素的唯一一个了元素
- :only-of-type        选择一个元素是它的上级元素的唯一一个相同类型的子元素
- :empty               选择的元素里面没有任何内容

(n)可使用公式 (an + b)。描述：表示周期的长度，n 是计数器（从 0 开始），b 是偏移值。

```css
li:first-child::after {
  content: "first-child";
}
li:last-child::after {
  content: "last-child";
}
li:nth-child(4) {
  font-size: 12px;
}
```

## DEMO
可以通过一下DEMO，进一步了解CSS中各类选择器

- HTML

```html
<div class="gird-list">
  <div class="gird-item">1</div>
  <div class="gird-item">2</div>
  <div class="gird-item">3</div>
  <div class="gird-item">4</div>
  <div class="gird-item">5</div>
  <div class="gird-item">6</div>
  <div class="gird-item">7</div>
  <div class="gird-item">8</div>
  <div class="gird-item">9</div>
</div>
```

- CSS

```css
/*定义容器大小、居中*/
.gird-list {
  margin: 100px auto 0;
  width: 600px;
  height: 600px;
  background: #f1f1f1;
  font-size: 0;
}
/*所有项目*/
.gird-item {
  display: inline-block;
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  font-size: 12px;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
}
/*所有以3为倍数项目*/
.gird-item:nth-child(3n) {
  border-right: 1px solid #333;
}
/*从第7个开始所有项目*/
.gird-item:nth-child(n + 7) {
  border-bottom: 1px solid #333;
}
/*第5个项目*/
.gird-item:nth-child(5) {
  background: #606266;
}
/*第1个项目*/
.gird-item:first-child {
  background: #606266;
}
/*最后1个项目*/
.gird-item:last-child {
  background: #606266;
}
/*第3个项目且鼠标悬浮的时候*/
.gird-item:nth-child(3):hover {
  background: #909399;
}
```
