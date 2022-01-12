<template>
  <div>Username: {{ loading ? "Loading" : data }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";
import Mock from "mockjs";

function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock("@name"));
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const { data, loading } = useRequest(getUsername, {
      refreshOnWindowFocus: true,
    });

    return {
      data,
      loading,
    };
  },
});
</script>
