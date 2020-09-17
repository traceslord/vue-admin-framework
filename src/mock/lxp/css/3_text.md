## 3 CSS - 文本
<video controls src="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/34pxKeN9jVKs1xZ8ci6nvl7mjtDzz3FxnzXPanCB.mp4" poster="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/NyQjJMLfL7TSEEDCCNFUpHA1Zyj9Pfygk95WE3qu.jpg"></video>
文本属性可定义文本的外观。通过文本属性，您可以改变文本的颜色、字符间距，对齐文本，装饰文本，对文本进行缩进，等等。

属性知识点：

- 字体颜色 color
- 字体大小 font-size
- 字体族   font-family
- 字体粗细 font-weight
- 字体风格 font-style
- 文本行高 line-height
- 文本对齐 text-align
- 文本间距 letter-spacing
- 文本缩进 text-indent
- 文本换行 word-break

## HTML结构
已以下HTML结构为示范：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Select</title>
  <link rel="stylesheet" href="text-test.css">
</head>
<body>
  <p class="text-test">技术成就梦想之美</p>
</body>
```

## 颜色
定义文本颜色 可以为

- HexColor（十六进制颜色值），如"#ff00ff"
- rgb & rgba
- hsl & hsla

```css
.text-test {
  color: #35b558;
}
```

## 字体
### 尺寸（ font-size )
定义字体大小，单位可以为 **px** 、 **em** 、 **rem** ，也可以取值为：

- 绝对值 xx-small | x-small | small | medium | large | x-large | xx-large
- 相对值 larger | smaller
- 长度
- 百分数，相对父元素计算值

```css
.text-test {
  font-size: 24px;
}
```

### 字体族（ font-family )
- 使用逗号分隔字体族名称
- 初始值由浏览器设置决定，可继承
- 字体族名称可指定的具体字体的名称，比如："times"、"courier"、"arial"。
- 字体族名称可指定通常字体系列名称：比如："serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"
- 英文字体放在中文字体的前面
- 最后总是添加通用字体族

#### 通常字族
| 名称 | 描述 | 举例 |
| --- | :--- | --- |
| serif(衬线体) | 衬线体有爪形的衬线并且笔划粗细有变化 | Centaur,Garamond,Caslon,Baskerville,Didot,Bodoni |
| sans-serif(无衬线体) | 完全抛弃装饰衬线,笔画粗细对比小,x高度较高 | Helvetica,Franklin Gothic,Futura,Gill Sans,Optima,Univers,Myriad,Avenir |
| cursive(手写体) | 一般具有连笔(joining strokes)或者其它除斜体字体外的手写特征 | Comic Sans MS |
| fantasy(幻想体) | 主要是装饰性的，但仍然具有字符表现(与不表现字符的Pi或者Picture字体相反) | Bodoni Ornaments |
| monospace(等宽体) | 所有字形都具有相等的固定宽度 | Menlo |

#### 匹配算法
1. 浏览器会先获取一个系统字体列表
1. 对元素中每一个字符，使用 font-family 属性及其他属性进行匹配，如果能匹配就暂定该字体。
1. 如果步骤 2 没有匹配上，选择下一个可选的 font-family 执行步骤二
1. 如果匹配到一个字体，但是字体中没有该字符，继续对下一个可选 font-family 执行步骤2
1. 如果没有匹配到字体，使用浏览器默认字体。

```css
.text-test {
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

### 风格（ font-style ）
义字体的风格，有：默认值标准体、斜体、倾斜体

| 值 | 描述 |
| --- | :--- |
| normal | 浏标准的字体样式（ 默认值 ） |
| italic | 斜体的字体样式 |
| oblique | 倾斜的字体样式 |
| inherit | 从父元素继承字体样式 |

> italic和oblique都是向右倾斜的文字, 但区别在于Italic是指斜体字，而Oblique是倾斜的文字，对于没有斜体的字体应该使用Oblique属性值来实现倾斜的文字效果。

```css
.text-test {
  font-style: italic; //将字体设置为斜体
}
```

### 粗细（ font-weight )
定义文字的粗细程度，取值为：normal | bold | bolder | lighter | 100 | 200 | ... | 900

| 数值 | 含义 |
| --- | :--- |
| 100 | Thin |
| 200 | Extra Light(Ultra Light) |
| 300 | Light |
| 400 | Normal |
| 500 | Medium |
| 600 | Semi Bold(Demi Bold) |
| 700 | Bold |
| 800 | Extra Bold(Ultra Bold) |
| 900 | Black(Heavy) |

```css
.text-test {
  font-weight:400; // 把某元素的粗细程度定义为正常
}
```

> 注意：font-weight 的值在之后的开发中，使用数值表示。

### 字体（ font )
可以按顺序设置如下属性：

1. font-style
1. font-variant
1. font-weight
1. font-size/line-height
1. font-family

> 可以不设置其中的某个值，比如 font:100% verdana; 也是允许的。未设置的属性会使用其默认值。

例如小米官网的字体设置：

```css
.text-test {
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
}
```

## 行高
- 元素所属 line box 所占有的高度
- 初始值为 normal
- 取值 长度 | 数字 | 百分比
- 段落一般取值为 1.4 ～ 1.8

```css
.text-test {
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.5;
}
```

> 单行文本垂直居中小技巧，当高为 height 为 40px 的时候，我们可以设置字体的行高和高相等 line-height 40px，这样文字就会在这个40px的高度中剧中。

## 对齐
定义文本在容器中的对齐方式，初始值由 HTML 的 dir 属性决定，可继承

| 取值 | 含义 |
| --- | :--- |
| left | 左对齐 |
| right | 右对齐 |
| center | 居中 |
| justify | 两端对齐 |

```css
.text-test {
  text-align: center; // 文本在容器中居中
}
```

## 间距
定义字符之间的距离

```css
.text-test {
  letter-spacing: 0.5px;
}
```

## 缩进
指定文本缩进，取值 length | percentage ,初始值为 0

```css
.text-test {
  text-indent: 20px;
}
```

## 装饰效果
定义文本的一些装饰效果，例如下划线、删除线等

| 取值 | 含义 |
| --- | :--- |
| none | 没有 |
| underline | 下划线 |
| line-through | 中划线 |
| overline | 上划线 |

```css
a {
  text-decoration: none;
}
```

## 空白符处理
HTML 展示空白符的策略会把连续的空白符号合成一个，在换行不会直接换行。**white-space** 就是指定空白符该如何处理。

| 取值 | 含义 |
| --- | :--- |
| normal | 正常行为 |
| nowrap | 不换号 |
| pre | 换行 |

```css
.text-test {
  white-space: nowrap; //文字不换行
}
```

## 单词换行
指定是否允许单词中间换行，

| 取值 | 含义 |
| --- | :--- |
| normal | 正常行为 |
| break-all | 允许在单词内换行 |
| keep-all | 只能在半角空格或连字符处换行 |

```css
.text-test {
  word-break: break-all;
}
```

## 自定义字体
Iconfont-国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造，设计和前端开发的便捷工具。

- [iconfont](http://iconfont.cn/)

体验 iconfont，可以收藏按照项目收藏图片icon，同时可以把图片转化成字体文件通过 class 来使用。

## 参考
- [给自己的字体课（一）——英文字体基础](http://cdc.tencent.com/2015/07/20/%E7%BB%99%E8%87%AA%E5%B7%B1%E7%9A%84%E5%AD%97%E4%BD%93%E8%AF%BE%EF%BC%88%E4%B8%80%EF%BC%89-%E8%8B%B1%E6%96%87%E5%AD%97%E4%BD%93%E5%9F%BA%E7%A1%80/)
- [给自己的Fonts教程](https://segmentfault.com/a/1190000009920615#articleHeader20)
- [字体漫谈](http://justineo.github.io/slideshows/font/#/)
- [Google 字体](https://fonts.google.com/)
- [Google 字体国内CDN](https://cdn.baomitu.com/index/fonts)
