<template>
  <a-input-search
    v-model:value="keyword"
    placeholder="input search text"
    enter-button="Search"
    @search="onSearch"
  />

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
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";

const fetchComments = async (params: number) => {
  console.log("params: ", params);
  const id = Math.floor(Math.random() * 100);

  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  ).then((response) => response.json());
};

export default defineComponent({
  setup() {
    const { data, loading, params, run } = useRequest(fetchComments, {
      manual: true,
      cacheKey: "cacheKey-demo",
      staleTime: 5000,
    });
    console.log("params: ", params);

    const keyword = ref(params[0]?.value);

    const onSearch = () => {
      run(keyword);
    };

    return {
      data,
      loading,
      keyword,
      onSearch,
    };
  },
});
</script>
