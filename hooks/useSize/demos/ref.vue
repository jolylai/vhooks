<template>
  <p ref="containerRef">cupiditate</p>
  <div>width{{ width }}</div>
  <div>height{{ height }}</div>
</template>

<script setup>
import { ref } from "vue";

import { useSize } from "usevhooks";

const containerRef = ref();

const { width, height } = useSize(containerRef);
</script>
