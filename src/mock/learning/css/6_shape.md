## 6 CSS - 特殊图形
<video controls src="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/HGetr91YwkADcM2jI7WFZUuz6V6rTsZAcdYh5EGC.mp4" poster="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/bbLJTQDzAD4EcwD5Sgfix4BiEdugLGU5dMomCR2k.jpg"></video>
使用盒子绘制特殊图形，圆形和三角形是我们最常绘制的图像。

- 圆/椭圆形
- 三角形

## 圆和椭圆
border-radius 属性定义元素的圆角，可以配合绘制出 圆形、椭圆形。当 border-radius 为 50% 时候，圆角为元素本身的一半，如果元素是的宽高比1:1，那么元素就会呈现圆形。当元素的宽高比非 1:1 时候，就会呈现出椭圆形。

- 圆

```css
.text-test {
  display: inline-block;
  height: 200px;
  width: 200px;
  background: #fff;
  border-radius: 50%;
}
```

- 椭圆

```css
.text-test {
  display: inline-block;
  height: 150px;
  width: 200px;
  background: #fff;
  border-radius: 50%;
}
```

- 二分一椭圆

```css
.text-test {
  display: inline-block;
  height: 150px;
  width: 200px;
  background: #fff;
  border-radius: 100% 0 0 100% / 50%;
}
```

- 四分一椭圆

```css
.text-test {
  display: inline-block;
  height: 150px;
  width: 200px;
  background: #fff;
  border-radius: 100% 0 0 0;
}
```

## 三角形
绘制出三角形的方法使用透明和非透明的 border 组合。以尖角朝上的三角形为例子，我们设置宽和高都为 0，然后设置下边框为 20px 黑色，设置左右边框为 10px 透明。这样设置三角形的高为下边框的宽度 20px，宽度为左右边框的和 20px。同理大家可以更具算法规则，绘制出不同朝向的三角形及等边三角形。

```css
.text-test {
  //向上三角形
  width: 0;
  height: 0;
  border-bottom: 20px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  //向下三角形
  width: 0;
  height: 0;
  border-top: 20px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  //向左三角形
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 20px solid #fff;

  //向右三角形
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 20px solid #fff;
}
```
