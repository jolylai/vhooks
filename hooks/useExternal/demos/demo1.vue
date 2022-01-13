<template>
  <p>status: {{ status }}</p>
  <p>
    Response: <i>{{ status === "ready" ? response : "-" }}</i>
  </p>
</template>

<script setup lang="ts">
// @ts-ignore
import { useExternal } from "usevhooks";
import { ref, watch } from "vue";

const status = useExternal(
  "https://ahooks.gitee.io/useExternal/test-external-script.js",
  {
    type: "js",
  }
);

const response = ref();

watch(status, (status) => {
  console.log("status: ", status);
  if (status === "ready") {
    // @ts-ignore
    response.value = TEST_SCRIPT?.start();
  }
});
</script>
