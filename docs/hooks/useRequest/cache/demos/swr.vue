<template>
  <a-button @click="toggle">show/hide</a-button>
  <a-list v-if="!hide" bordered :data-source="data">
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

const fetchComments = async () => {
  const id = Math.floor(Math.random() * 100);

  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  ).then((response) => response.json());
};

export default defineComponent({
  setup() {
    const hide = ref(true);
    const { data } = useRequest(fetchComments, {
      cacheKey: "cacheKey-demo",
    });

    const toggle = () => {
      hide.value = !hide.value;
    };

    return {
      hide,
      data,
      toggle,
    };
  },
});
</script>
