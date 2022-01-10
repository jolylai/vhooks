<template>
  <div v-if="loading">loading</div>
  <div v-else>
    <div v-if="error">{{ error.message }}</div>
    <div v-else>username: {{ data }}</div>
  </div>

  <button @click="refresh">Refresh</button>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
// @ts-ignore
import { useRequest } from "usevhooks";

function getUsername(id: number): Promise<string> {
  console.log("use-request-refresh-id", id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("@name");
    }, 1000);
  });
}

const { data, loading, error, run, refresh } = useRequest(
  (id: number) => getUsername(id),
  {
    manual: true,
  }
);

onMounted(() => {
  run(1);
});
</script>
