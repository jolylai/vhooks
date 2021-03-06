# useSize

一个用于监听 dom 节点尺寸变化的 Hook。

## Ref

<demo src='./demos/ref.vue' />

## DOM 节点

useSize 可以接收 dom，在 SSR 场景可以传入函数 ()=> dom

<demo src='./demos/dom.vue' />

#### 参数

| 参数   | 说明              | 类型                                                   | 默认值 |
| ------ | ----------------- | ------------------------------------------------------ | ------ |
| target | DOM 节点或者 Refs | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -      |

#### Reference

- [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 监听元素尺寸变化
