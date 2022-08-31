<template>
  <a-space direction="vertical">
    <a-button @click="toggle">{{ isShow ? "show" : "hidden" }}</a-button>
    <stale v-if="isShow" />
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import stale from "./stale.vue";

const isShow = ref(false);

const toggle = () => {
  isShow.value = !isShow.value;
};
</script>
