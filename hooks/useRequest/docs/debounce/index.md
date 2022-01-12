通过设置 options.debounceWait，进入防抖模式，此时如果频繁触发 run 或者 runAsync，则会以防抖策略进行请求。

<script setup>
  import Debounce from './demos/debounce.vue'
</script>

<debounce />
