<template>
  <a-list bordered :loading="loading" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>{{ item.body }}</a-list-item>
    </template>
    <template #header>
      <div>Header</div>
    </template>
    <template #footer>
      <a-space>
        <a-button @click="run">Run</a-button>
        <a-button @click="cancel">Stop</a-button>
      </a-space>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";

const fetchComments = async (params: number) => {
  const id = Math.floor(Math.random() * 100);

  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  ).then((response) => response.json());
};

export default defineComponent({
  setup() {
    const { data, loading, run, cancel } = useRequest(fetchComments, {
      pollingInterval: 1000,
      pollingWhenHidden: false,
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
