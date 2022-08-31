<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
import { useRequest } from "usevhooks";

const randomImg = async () => {
  const response = await fetch("https://picsum.photos/200/300");
  return response.json();
};

const { loading, data } = useRequest(randomImg);
</script>
