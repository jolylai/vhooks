## 前言

一个用于监听 dom 节点尺寸变化的 Hook。

- [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 监听元素尺寸变化

## Ref

<script setup>
  import Ref from '@/src/useSize/demos/ref.vue'
  import Dom from '@/src/useSize/demos/dom.vue'
</script>

<ref />

<<< src/useSize/demos/ref.vue

## DOM 节点

<dom />

<<< src/useSize/demos/dom.vue

#### 参数

| 参数   | 说明              | 类型                                                   | 默认值 |
| ------ | ----------------- | ------------------------------------------------------ | ------ |
| target | DOM 节点或者 Refs | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -      |
