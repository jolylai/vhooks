## 前言

一个用于判断 dom 元素是否在可视范围之内的 Hook。

offset

getBoundingClientRect

IntersectionObserver

<script setup>
  import Demo1 from './demos/demo1.vue'
  import Demo2 from './demos/demo2.vue'
</script>

## 基础用法

<demo1 />

<<< hooks/useInViewport/demos/demo1.vue

## 监听元素可见区域比例

<demo2 />

传入 options.threshold, 可以控制在可见区域达到该比例时触发 ratio 更新。
options.root 可以控制相对父级元素，在这个例子中，不会相对浏览器视窗变化。
