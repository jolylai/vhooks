useRequest 提供了一个 options.refreshDeps 参数，当它的值变化后，会重新触发请求。

<script setup>
  import RefreshDeps from './demos/refresh-deps.vue'
</script>

<RefreshDeps />

## 重新请求间隔

其实也就是节流

```ts
function limit(fn: any, timespan: number) {
  let pending = false;
  return function (...args: any[]) {
    if (pending) return;
    pending = true;

    fn(...args);

    setTimeout(() => {
      pending = false;
    }, timespan);
  };
}
```

```ts
const limitRefresh = limit(
  fetchInstance.refresh.bind(fetchInstance),
  focusTimespan
);
```
