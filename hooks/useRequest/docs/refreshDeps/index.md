# 依赖刷新

useRequest 提供了一个 options.refreshDeps 参数，当它的值变化后，会重新触发请求。

<script setup>
  import RefreshDeps from './demos/refresh-deps.vue'
</script>

<RefreshDeps />

```js
const userId = ref("1");

const { data, loading } = useRequest(() => getUserSchool(userId.value), {
  refreshDeps: [userId],
});
```

上面的示例代码，useRequest 会在初始化和 userId 变化时，触发函数执行。

与下面代码实现功能完全一致

```js
const [userId, setUserId] = useState("1");

const { data, refresh } = useRequest(() => getUserSchool(userId));

watch([userId], () => {
  refresh();
});
```
