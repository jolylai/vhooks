<template>
  <div>ddd</div>
</template>

<script setup>
import { useVirtualList } from "usevhooks";
console.log("useVirtualList: ", useVirtualList);
const list = Array.from({ length: 10000 }).keys();
</script>
