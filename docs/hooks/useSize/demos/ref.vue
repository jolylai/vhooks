<template>
  <p ref="containerRef">
    <img
      src="https://picsum.photos/200/80"
      alt="img"
      style="width: 100%; height: 100%"
    />
  </p>
  <div>width: {{ width }}, height: {{ height }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// @ts-ignore
import { useSize } from "usevhooks";

const containerRef = ref();
const { width, height } = useSize(containerRef);
</script>
