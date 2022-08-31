<template>
  <a-list bordered :loading="loading" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>{{ item.body }}</a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import { useRequest } from "usevhooks";

const fetchComments = async () => {
  const id = Math.floor(Math.random() * 100);

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  return response.json();
};

const { data, loading } = useRequest(fetchComments, {
  cacheKey: "cacheKey-demo",
});
</script>
