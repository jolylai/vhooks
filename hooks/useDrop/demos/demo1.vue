<template>
  <div class="drop" ref="dropRef">
    {{ isHovering ? "release here" : "drop here" }}
  </div>
  <img src="https://picsum.photos/200/300" />
  <a-space>
    <drag-item class="drag-item">1</drag-item>
    <drag-item class="drag-item">2</drag-item>
    <drag-item class="drag-item">3</drag-item>
    <drag-item class="drag-item">4</drag-item>
    <drag-item class="drag-item">5</drag-item>
  </a-space>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useDrop } from "usevhooks";
import DragItem from "./drag-item.vue";

const dropRef = ref();
const isHovering = ref(false);

useDrop(dropRef, {
  onText: (text, e) => {
    console.log(e);
    alert(`'text: ${text}' dropped`);
  },
  onFiles: (files, e) => {
    console.log(e, files);
    alert(`${files.length} file dropped`);
  },
  onUri: (uri, e) => {
    console.log(e);
    alert(`uri: ${uri} dropped`);
  },
  onDom: (content: string, e) => {
    alert(`custom: ${content} dropped`);
  },
  onDragEnter: () => (isHovering.value = true),
  onDragLeave: () => (isHovering.value = false),
});
</script>

<style scoped>
.drop {
  padding: 16px;
  border: 1px solid #9d9d9d;
  margin-bottom: 16px;
}
</style>
