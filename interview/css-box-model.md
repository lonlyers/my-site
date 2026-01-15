# CSS 盒模型详解

## 1. 什么是盒模型？

在 CSS 中，所有的 HTML 元素都可以看作是一个盒子。盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：
- **Margin** (外边距)
- **Border** (边框)
- **Padding** (内边距)
- **Content** (内容)

## 2. 标准盒模型 vs IE 盒模型

### 标准盒模型 (content-box)
在标准盒模型中，`width` 和 `height` 指的是内容区域 (`Content`) 的宽高。
- 实际宽度 = `width` + `padding` + `border` + `margin`

```css
div {
  box-sizing: content-box; /* 默认值 */
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
/* 内容宽度为 200px，元素实际占用宽度为 250px */
```

### IE 盒模型 (border-box)
在 IE 盒模型（也常用于现代开发）中，`width` 和 `height` 指的是内容+内边距+边框的总和。
- 实际宽度 = `width` + `margin` (不包含 padding 和 border，它们被包含在 width 内)

```css
div {
  box-sizing: border-box; /* 推荐做法 */
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
/* 元素占据宽度仍为 200px，内容实际宽度被挤压为 150px */
```
