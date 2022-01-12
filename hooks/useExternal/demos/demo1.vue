<template>
  <p>status: {{ status }}</p>

  <div>
    <button @click="toggle">toggle</button>
    <button @click="unload">unload</button>
    <button @click="load">load</button>
  </div>
</template>

<script setup>
import { watch } from "@vue/runtime-core";
import { useExternal } from "usevhooks";

const [status, { toggle, load, unload }] = useExternal(
  "https://ahooks.gitee.io/useExternal/test-external-script.js",
  {
    media: "all",
  }
);

watch(status, (status) => {
  console.log("status: ", status);
  if (status === "ready") {
    TEST_SCRIPT?.start();
  }
});
</script>
