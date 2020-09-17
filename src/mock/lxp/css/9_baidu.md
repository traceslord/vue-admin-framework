## 9 CSS - 百度首页
<video controls src="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/H5Y3MlsAmFl6e6Dwe5Ok7Ol6r1Y5x1SNYYxLWeN6.mp4" poster="https://assets.jiker.com/_for_plus_sub_project/2020/0917/admin/bWx9Gq9K0pqWYRbGmgJe48OTTB5hWuNm9SWGKmUo.jpg"></video>

## 样式分析
百度首页分成上中下三个部分的内容。
上部分头部有一行导航信息，靠右对齐，导航的最后一项需要特别处理。
中部分主体有图片和表单，表单有输入框和提交按钮。
下部分脚部分有二维码图片和两行文本。

我们沿用在 HTML 课程中完成的 baidu.html 代码。在书写样式的时候，可以安装以下步骤：

1. 我们沿用在 HTML 课程中完成的 baidu.html 代码。
2. 在桌面新建文件夹 baidu ，新建文件 baidu.html 、 baidu.css ，粘贴之前的百度代码HTML进去。
3. 在 HTML 中 通过 link 引入 baidu.css
4. 样式重设，使用通配符设置所有元素的内外边距都为 0
5. 字体设置，选中 body 设置默认字体大小、颜色 及 字体族。
6. 整体布局，让底部紧贴浏览器底部。
7. 导航样式，右对齐及内编剧的调整，还有字体的颜色和大小
8. 更多信息，对导航的最后一项进行单独的调整
9. 主体内容，设置对齐方式及外边距，和头部拉开距离。
10. 主体图片，设置图片的大小
11. 主体表单，设置表单布局及输入框和按钮的样式
12. 脚部图片，设置脚部的对齐方式，文本样式及边距

## 参考代码
```css
/*1.样式重设*/
* {
  margin: 0;
  padding: 0;
}

/*3.整体布局*/
html, body {
  height: 100%;
}

/*2.字体设置*/
body {
  display: flex;          /*3.整体布局*/
  flex-direction: column; /*3.整体布局*/
  font-size: 12px;        /*2.字体设置*/
  font-family: arial;     /*2.字体设置*/
}

/*4.导航样式*/
.page-header {
  padding-top: 20px;
  padding-right: 10px;
  text-align: right;
}

.page-header nav a {
  font-size: 13px;
  font-weight: 700;
  color: #333;
  margin-left: 20px;
}

/*5.更多信息*/
.page-header nav a:last-child {
  display: inline-block;
  width: 60px;
  height: 23px;
  background: #38f;
  color: #fff;
  text-decoration: none;
  text-align: center;
  line-height: 23px;
}

/*3.整体布局*/
.page-mainer {
  flex: 1;
  text-align: center; /*6.主体内容*/
  margin-top: 100px;  /*6.主体内容*/
}

/*7.主体图片*/
.page-mainer .logo-container img {
  width: 270px;
  height: 129px;
  margin-bottom: 22px;
}

/*8.主体表单*/
.form-container form {
  display: flex;
  justify-content: center;
}

/*表单输入框*/
.form-container .form-search {
  display: inline-block;
  padding-left: 10px;
  width: 539px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #b6b6b6;
  border-right: 0;
  outline: none;
}

/*表单按钮*/
.form-container .submit-btn {
  width: 100px;
  height: 36px;
  font-size: 15px;
  color: #fff;
  letter-spacing: 1px;
  background: #3385ff;
  border: 1px solid #3385ff;
  outline: none;
  cursor: pointer;
}

.form-container .submit-btn:hover {
  opacity: 0.8;
}

/*9.脚部图片*/
.page-footer {
  padding-bottom: 50px;
  text-align: center;
}

.page-footer .footer-info {
  margin-top: 15px;
  color: #909399;
}

.page-footer .footer-info a {
  margin-right: 15px;
  color: #909399;
}
.page-footer .footer-info a:last-child {
  margin-right: 0;
}
```
