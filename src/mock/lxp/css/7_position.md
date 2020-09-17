## 7 CSS - 定位
<video controls src="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/MwKLSCI5qWNf7FYTV0Wd5cSORiA45RkFtc6SRc3U.mp4" poster="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/JGf6lYNa9fKHIlK9tvmaTKScR1EizEVb605SdkSt.jpg"></video>
通过使用 position 属性，我们可以选择 4 种不同类型的定位，这会影响元素框生成的方式。

属性知识点：

- 定位 position
- 距离左端距离 left
- 距离右端距离 right

## 非定位 static
默认值。没有定位，元素出现在正常的流中。

## 相对定位 relative
相对（自己）定位的元素。

- 在常规流里面布局
- 相对于自身本应该在的位置偏移
- 使用 top、bottom、left、right 设置偏移长度
- 流内其他元素当作没偏移一样布局

## 绝对定位 absolute
相对于非 static 祖先父元素进行定位。

- 脱离正常流
- 相对于最近非 static 祖先的 padding box 定位
- 不会对流内元素布局造成影响
- 可以有 margin 但不会折叠

## 固定定位 fixed
相对于视口绝对定位。

- 相对于 Viewport 定位
- 不会随着页面滚动发生变化

## 自动计算
如果不指定 top、left、right、bottom、width、height 的时候，会默认安装 auto 计算。

会在自身默认的位置。而非 top:0;left:0;。

## DEMO
可以通过一下DEMO体验绝对定位

- HTML

```html
<div class="pos-list">
  <div class="pos-item abs">绝对定位 1</div>
  <div class="pos-item abs">绝对定位 2</div>
  <div class="pos-item abs">绝对定位 3</div>
  <div class="pos-item abs">绝对定位 4</div>
  <div class="pos-item fixed">固定定位 5</div>
</div>
```

- CSS

```css
/* 定义容器，且定位相对定位 */
/* 绝对定位的位置事相对于其有相对定位的父元素定位，会一直追寻到 body 元素 */
/* 可以尝试注视或者删除容器中的相对定位，在看看效果 */
.pos-list {
  position: relative;
  margin: 100px auto 0;
  width: 600px;
  height: 600px;
  background: #f1f1f1;
}
/* 定义项目 */
.pos-item {
  width: 200px;
  height: 200px;
  border: 5px solid #303133;
  background: #606266;
}
/* 定义绝对定位 */
.abs {
  position: absolute;
}
/* 定义第 1 个绝对定位项目的位置 */
.abs:nth-child(1) {
  top: 20px;
  left: 20px;
}
/* 定义第 2 个绝对定位项目的位置 */
.abs:nth-child(2) {
  top: 40px;
  left: 40px;
}
/* 定义第 3 个绝对定位项目的位置 */
.abs:nth-child(3) {
  top: 60px;
  left: 60px;
}
/* 定义第 4 个绝对定位项目的位置 */
.abs:nth-child(4) {
  top: 80px;
  left: 80px;
}
/* 定义固定定位项目及位置 */
.fixed {
  position: fixed;
  top: 20px;
  right: 20px;
}
```
