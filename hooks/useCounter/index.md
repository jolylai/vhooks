# useCounter

<script setup>
   import Demo1 from './demos/demo1.vue'
 </script>

## 前言

如何保证值在某个区间

```ts
const getTargetValue = (value: number, options: Options) => {
  const { min, max } = options;
  let targetValue = value;

  if (typeof min === "number") {
    targetValue = Math.max(targetValue, min);
  }

  if (typeof max === "number") {
    targetValue = Math.min(targetValue, max);
  }

  return targetValue;
};
```

## 基础用法

<demo1 />
