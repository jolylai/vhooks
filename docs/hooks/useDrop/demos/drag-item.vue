<template>
  <div class="drag" ref="dragRef">
    {{ dragging ? "dragging" : `Drag` }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useDrag } from "usevhooks";

const dragRef = ref();
const dragging = ref(false);

useDrag("drag", dragRef, {
  onDragStart: () => {
    dragging.value = true;
  },
  onDragEnd: () => {
    dragging.value = false;
  },
});
</script>

<style scoped>
.drag {
  width: 120px;
  padding: 16px;
  border: 1px solid #9d9d9d;
}
</style>
