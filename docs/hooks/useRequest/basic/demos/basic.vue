<template>
  <div v-if="loading">loading</div>
  <div v-if="error">{{ error.message }}</div>
  <div>username: {{ data }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";
import Mock from "mockjs";

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(Mock.mock("@name"));
      } else {
        reject(new Error("Failed to get username"));
      }
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const { data, error, loading } = useRequest(getUsername);

    return {
      data,
      error,
      loading,
    };
  },
});
</script>
