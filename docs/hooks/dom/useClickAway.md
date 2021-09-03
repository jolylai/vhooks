## 前言

优雅的管理目标元素外点击事件的 Hook。

1. document 监听全局事件
2. 使用 `Node.contains()` 判断触发事件元素（event.target）是否在监听的元素内

## 基础使用

<script setup>
  import Demo1 from '@/src/useClickAway/demos/demo1.vue'
  import Demo2 from '@/src/useClickAway/demos/demo2.vue'
  import Demo3 from '@/src/useClickAway/demos/demo3.vue'
  import Demo4 from '@/src/useClickAway/demos/demo4.vue'
</script>

<demo1 />

<<< src/useClickAway/demos/demo1.vue

## 自定义 DOM

<demo2 />

通过 function 返回一个对象的方式引入。

<<< src/useClickAway/demos/demo2.vue

## 多个 DOM 对象

<demo3 />

<<< src/useClickAway/demos/demo3.vue

## 监听其他事件

<demo4 />

通过设置 eventName，可以指定需要监听的事件。试试点击鼠标右键。

<<< src/useClickAway/demos/demo4.vue

#### Params

| 参数        | 说明                            | 类型               | 默认值 |
| ----------- | ------------------------------- | ------------------ | ------ |
| onClickAway | 触发事件的函数                  | (event ) => void   | -      |
| target      | DOM 节点或者 Ref 对象，支持数组 | Target \| Target[] | -      |
| eventName   | 指定需要监听的事件              | string             | click  |
