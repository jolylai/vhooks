<template>
  <div ref="containerRef" class="container">
    <img src="https://picsum.photos/800" />
  </div>
  <p>left: {{ left }} top: {{ top }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useScroll } from "usevhooks";

const containerRef = ref();

const { left, top } = useScroll(
  containerRef,
  (position: { top: number; left: number }) => {
    return position.top > 100 && position.top < 200;
  }
);
</script>

<style scoped>
.container {
  width: 400px;
  height: 400px;
  overflow: auto;
}

.container img {
  width: 800px;
  min-width: 800px;
  display: block;
}
</style>
