# HTML & CSS 核心摘要

## 1. HTML 语义化

使用正确的标签做正确的事（如 `header`, `footer`, `nav`, `article`, `section`）。
- **优点**：有利于 SEO，代码可读性高，方便无障碍阅读（阅读器）。

## 2. BFC (块级格式化上下文)

**触发条件**：
- float 不为 none
- position 为 absolute 或 fixed
- overflow 不为 visible
- display 为 inline-block, flex, grid 等

**作用**：
- 清除浮动（父元素高度塌陷）。
- 防止 Margin 重叠（外边距合并）。
- 自适应布局（防止被浮动元素覆盖）。

## 3. 居中布局方案

**水平居中**：
- 行内元素：`text-align: center`
- 块级元素：`margin: 0 auto`

**垂直居中**：
- `line-height` 等于 height (单行文本)。
- `position: absolute; top: 50%; transform: translateY(-50%)`
- **Flexbox (推荐)**:
  ```css
  .parent {
    display: flex;
    justify-content: center; /* 水平 */
    align-items: center;     /* 垂直 */
  }
  ```

## 4. Flex 布局常用属性

- **容器属性**:
  - `flex-direction`: row | column
  - `justify-content`: flex-start | center | space-between
  - `align-items`: stretch | center | flex-start
  - `flex-wrap`: nowrap | wrap

- **项目属性**:
  - `flex`: `flex-grow` `flex-shrink` `flex-basis` 的缩写。
    - `flex: 1` => `1 1 0%`

## 5. 移动端适配

- **Rem**: 相对于根元素 `html` 的 `font-size`。需配合 JS 动态计算根字体大小。
- **Vw/Vh**: 相对于视口宽/高。`100vw` = 视口宽度。
- **Media Query**: `@media screen and (max-width: 768px) { ... }` 响应式调整。
