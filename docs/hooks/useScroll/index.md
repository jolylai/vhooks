## 前言

获取元素的滚动状态。

- [使用 document.scrollingElement 控制窗体滚动高度](https://www.zhangxinxu.com/wordpress/2019/02/document-scrollingelement/)

<script setup>
  import Demo1 from './demos/demo1.vue'
  import Demo2 from './demos/demo2.vue'
  import Demo3 from './demos/demo3.vue'
</script>

## 基础用法

<demo1 />

<<< hooks/useScroll/demos/demo1.vue

## 监测整页的滚动

<demo2 />

<<< hooks/useScroll/demos/demo2.vue

页面滚动在 document 滚动监听滚动事件

```js
document.addEventListener("scroll", (event) => {
  if (event.target === document) {
    const { scrollLeft, scrollTop } = document.scrollingElement;
  } else {
    const { scrollLeft, scrollTop } = event.target;
  }
});
```

scrollingElement 返回滚动文档的 Element 对象的引用。 在标准模式下是文档的根元素 `document.documentElement`.当在怪异模式下， scrollingElement 属性返回 HTML body 元素（若不存在返回 null ）。

## 控制滚动状态的监听

在垂直方向 100px 到 200px 的滚动范围内监听

<demo3 />

<<< hooks/useScroll/demos/demo3.vue
