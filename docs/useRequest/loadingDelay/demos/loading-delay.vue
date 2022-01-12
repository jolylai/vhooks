<template>
  <div>Username: {{ loading ? "loading" : data }}</div>

  <a-button @click="run">Run</a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";
import Mock from "mockjs";

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock("@name"));
    }, 200);
  });
}

export default defineComponent({
  setup() {
    const { data, loading, run, cancel } = useRequest(getUsername, {
      loadingDelay: 300,
    });

    return {
      data,
      loading,
      run,
      cancel,
    };
  },
});
</script>
