## 前言

一个跟踪鼠标位置的 Hook

<script setup>
  import Demo1 from '@/src/useMouse/demos/demo1.vue'
</script>

## 基础用法

<demo1 />

<<< src/useHover/demos/demo1.vue

#### 结果

| 参数    | 说明                   | 类型   |
| ------- | ---------------------- | ------ |
| screenX | 距离显示器左侧的距离   | number |
| screenY | 距离显示器顶部的距离   | number |
| clientX | 距离当前视窗左侧的距离 | number |
| clientY | 距离当前视窗顶部的距离 | number |
| pageX   | 距离完整页面顶部的距离 | number |
| pageY   | 距离完整页面顶部的距离 | number |
