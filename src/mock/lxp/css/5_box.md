## 5 CSS - 盒模型
<video controls src="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/69HUtJ1VdFG0QAtM9N7INzld2Ji9wPyXcFIzdrey.mp4" poster="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/dqYzjtXtI7Kg4mrtlweIeca2ChR7cAJsrFIp6CjD.jpg"></video>
CSS盒模型（Box Model）本质上是一个盒子，它包括：边距(margin)，边框(border)，填充(padding)，和内容(content)。

- 标准盒模型 - W3C的标准模型 CSS中的宽（width） = 内容 （content）的宽
- IE盒模型  - 低版本IE非H5声明 CSS中的宽（width）= 内容（content）的宽+（border + padding）* 2

```css
.content-box {
  box-sizing: content-box;
  width: 100px;
  height: 100px;
  padding: 25px;
  border: 25px solid #303133;
}
.border-box{
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  padding: 25px;
  border: 25px solid #303133;
}
```

以上两个选择器样式中，CSS 设置的宽高不一样，实际显示的大小一样。

属性知识点：

- 模型模式 box-sizing
- 显示方式 display
- 外边距 marign
- 内边距 padding
- 宽度 width
- 高度 height

> 在标准盒模型中可以通过 CSS 中 box-sizing 属性的值为 border-box 来切换到IE盒模型的渲染模式，两种盒模型只是计算方式不一样（IE盒模型中的宽度包括了边框和内边距），具体使用哪一种取决于团队决定。

## margin
marign，外边距。定义元素之间的距离。

以下示例定义了了连个元素（container-1、container-2），container-1 定义了元素距离下一个元素的外边距为10px，container-2定义了元素距离上一个元素的距离为20px，实际他们直接的间隔为20px，这种现象叫做外边距合并。

```html
<div style="width: 200px; height: 50px; background: #ccc; margin-bottom: 10px">
  container-1
</div>
<div style="width: 200px; height: 50px; background: #ccc; margin: 20px 0">
  container-2
</div>
<div style="width: 200px; height: 50px; background: #ccc; margin-top: 20px">
  container-3
</div>
```

> 外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

## border
border 简写属性在一个声明设置所有的边框属性。可以按顺序设置如下属性：

- border-width  规定边框的宽度
- border-style  规定边框的样式
- border-color  规定边框的颜色

> 如果不设置其中的某个值，也不会出问题，比如 border:solid #ff0000; 也是允许的。

```html
<div style="display: inline-block; margin-right: 20px; width: 100px; height: 100px; border: 1px solid #e4e4e4"></div>
<div style="display: inline-block; margin-right: 20px; width: 100px; height: 100px; border: 1px dotted #e4e4e4"></div>
<div style="display: inline-block; margin-right: 20px; width: 100px; height: 100px; border: 1px dashed #e4e4e4"></div>
```

```css
border: 1px solid #e4e4e4;  // 实线框
border: 1px dotted #e4e4e4; // 点状框
border: 1px dashed #e4e4e4; // 虚线框
```

## padding
padding 简写属性在一个声明中设置所有内边距属性。

```css
.text-test {
  padding-top: 5px; //上内边距为5px
  padding-top: 10px; //上内边距为10px
  padding-top: 20px; //上内边距为20px

  padding: 10px;      // 上下左右内边距为 10px
  padding: 10px 20px; // 上下内边距为 10px，左右内边距为 20px
  padding: 10px 20px 0; // 上边距为 10px，左右内边距为 20px，下内边距为 0
  padding: 10px 20px 0 5px; // 上边距为 10px，右内边距为 20px，下内边距为 0，左内边距为 10px
}
```

## content
height 、width 属性设置元素的宽度。在不同的盒子模型上，计算方式不一样。

```css
.content-box {
  padding: 10px;
  width: 60px;
  height: 60px;
  border:10px solid #e4e4e4;
}

.ie-box {
  box-sizing: border-box;
  padding: 10px;
  width: 100px;
  height: 100px;
  border:10px solid #e4e4e4;
}
```
