<template>
  <div v-if="loading">loading</div>
  <div v-if="error">{{ error.message }}</div>
  <div>username: {{ data }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("name");
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const { data, error, loading } = useRequest(getUsername);
    console.log("data: ", data);

    return {
      data,
      error,
      loading,
    };
  },
});
</script>
