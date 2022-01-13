<template>
  <p>status: {{ status }}</p>

  <div>
    <span class="badge badge-pill badge-primary">Primary</span>
  </div>

  <a-space>
    <a-button @click="onUnload">unload</a-button>
    <a-button @click="onLoad">load</a-button>
  </a-space>
</template>

<script setup lang="ts">
// @ts-ignore
import { useExternal } from "usevhooks";
import { ref } from "vue";

const path = ref("https://ahooks.gitee.io/useExternal/bootstrap-badge.css");

const status = useExternal(path, {
  type: "css",
});

const onLoad = () => {
  path.value = "https://ahooks.gitee.io/useExternal/bootstrap-badge.css";
};

const onUnload = () => {
  path.value = "";
};
</script>
