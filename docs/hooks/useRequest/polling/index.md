<script setup>
  import Polling from './demos/polling.vue'
</script>

## 前言

请求成功后设置一个定时器，在 options.pollingInterval 后重新发起请求

通过设置 options.pollingInterval，进入轮询模式，useRequest 会定时触发 service 执行。

例如上面的场景，会每隔 3000ms 请求一次 getUsername。同时你可以通过 cancel 来停止轮询，通过 run/runAsync 来启动轮询。

你可以通过下面的示例来体验效果

<Polling />
