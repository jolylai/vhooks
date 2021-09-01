## useVirtualList

<virtual-list />

<script setup>
  import VirtualList from '../../../src/useVirtualList/demos/virtual-list.vue'
</script>

| 参数       | 说明                                                   | 类型                                  | 默认值 |
| ---------- | ------------------------------------------------------ | ------------------------------------- | ------ |
| itemHeight | 行高度，静态高度可以直接写入像素值，动态高度可传入函数 | number \| ((index: number) => number) | -      |
| overscan   | 视区上、下额外展示的 dom 节点数量                      | number                                | 5      |
