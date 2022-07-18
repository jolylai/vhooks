<template>
  <a-list bordered :loading="loading" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>{{ item.body }}</a-list-item>
    </template>
    <template #header>
      <div>Header</div>
    </template>
    <template #footer>
      <div>Footer</div>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";

const fetchComments = async () => {
  const id = Math.floor(Math.random() * 100);

  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  ).then((response) => response.json());
};

export default defineComponent({
  setup() {
    const { data, loading } = useRequest(fetchComments, {
      cacheKey: "cacheKey-demo",
    });

    return {
      data,
      loading,
    };
  },
});
</script>
