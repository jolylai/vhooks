<template>
  <p ref="targetRef">isInViewport: {{ isInViewport }}</p>
  <div class="anchor">
    Element {{ isInViewport ? "inside" : "outside" }} the viewport
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useInViewport } from "usevhooks";

const targetRef = ref();

const isInViewport = useInViewport(targetRef);
</script>

<style scoped>
.anchor {
  position: fixed;
  bottom: 120px;
  right: 80px;
  border: 1px solid #eee;
  padding: 16px;
  background-color: beige;
  z-index: 1;
}
</style>
