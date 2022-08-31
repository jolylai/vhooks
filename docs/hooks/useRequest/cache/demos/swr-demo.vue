<template>
  <a-space direction="vertical">
    <a-button @click="toggle">{{ isShow ? "show" : "hidden" }}</a-button>
    <swr v-if="isShow" />
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import swr from "./swr.vue";

const isShow = ref(false);

const toggle = () => {
  isShow.value = !isShow.value;
};
</script>
