# useCountDown

<script setup>
  import Demo1 from './demos/demo1.vue'
  import Demo2 from './demos/demo2.vue'
</script>

## 到未来某一时间点的倒计时

<demo1 />

将时间戳格式化成剩余时间

```js
const formatTimestamp = (ms: number) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const milliseconds = ms % 1000;

  return { days, hours, minutes, seconds, milliseconds };
};
```

## 配置项动态变化

动态变更配置项, 适用于验证码或类似场景，时间结束后会触发 onEnd 回调。

<demo2 />
