<template>
  <div v-bind="containerProps" :style="{ height: '200px' }">
    <ul v-bind="wrapperProps" :style="{ 'list-style': 'none' }">
      <li v-for="{ data } in list" :style="{ height: '30px' }">
        {{ data }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useVirtualList } from "usevhooks";

const dataSource = Array.from(Array(99999).keys());

const { list, containerProps, wrapperProps } = useVirtualList(dataSource, {
  itemHeight: 30,
  overscan: 5,
});
</script>
