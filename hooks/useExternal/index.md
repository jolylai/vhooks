## 前言

一个用于动态地向页面加载或卸载外部资源的 Hook。

1. 如何处理传入类型为 `string | Ref<string>`

data-status loading | ready | error

<script setup>
  import Demo1 from './demos/demo1.vue'
  import Demo2 from './demos/demo2.vue'
  // import Demo3 from './demos/demo3.vue'
  // import Demo4 from './demos/demo4.vue'
</script>

## 加载 JS

<demo1 />

<<< hooks/useExternal/demos/demo1.vue

## 加载 CSS

<demo2 />

<<< hooks/useExternal/demos/demo2.vue

<!--## 加载图片

<demo3 />

<<< hooks/useExternal/demos/demo3.vue

#### Params

| 参数 | 说明              | 类型                    | 默认值 |
| ---- | ----------------- | ----------------------- | ------ |
| path | 外部资源 url 地址 | `string \| Ref<string>` | -      | -->
