<template>
  <div>
    <img
      src="https://picsum.photos/200/80"
      alt="img"
      style="width: 100%; height: 100%"
    />
  </div>
  <div>width: {{ width }}, height: {{ height }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useSize } from "usevhooks";

export default defineComponent({
  setup() {
    const { width, height } = useSize(document.querySelector("body"));

    return { width, height };
  },
});
</script>
