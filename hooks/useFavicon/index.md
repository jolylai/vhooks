## 前言

用于设置与切换页面 favicon。

favicon 图片类型

```js
const ImgTypeMap = {
  SVG: "image/svg+xml",
  ICO: "image/x-icon",
  GIF: "image/gif",
  PNG: "image/png",
};
```

获取页面上的 favicon 元素

```js
document.querySelector("link[rel*='icon']");
```

<script setup>
  import Demo1 from './demos/demo1.vue'
</script>

## 基础用法

<demo1 />

<<< hooks/useFavicon/demos/demo1.vue
