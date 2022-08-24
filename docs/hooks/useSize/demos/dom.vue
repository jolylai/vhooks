<template>
  <div id="use-size-dom">
    <img
      src="https://picsum.photos/200/80"
      alt="img"
      style="width: 100%; height: 100%"
    />
  </div>
  <div>width: {{ width }}, height: {{ height }}</div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { useSize } from "usevhooks";

const { width, height } = useSize(document.querySelector("#use-size-dom"));
</script>
