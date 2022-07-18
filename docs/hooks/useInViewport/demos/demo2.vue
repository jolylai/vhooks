<template>
  <div class="container" id="parent">
    <div style="height: 800px">
      scroll here
      <div class="observer" id="children">observer dom</div>
    </div>
  </div>
  <p>inViewport: {{ inViewport ? "visible" : "hidden" }}</p>
  <p>ratio: {{ ratio }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useInViewport } from "usevhooks";

export default defineComponent({
  setup() {
    const [inViewport, ratio] = useInViewport(
      () => document.getElementById("children"),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        root: () => document.getElementById("parent"),
      }
    );

    return {
      inViewport,
      ratio,
    };
  },
});
</script>

<style scoped>
.container {
  width: 300px;
  height: 300px;
  overflow: auto;
  border: 1px solid #9d9d9d;
}

.observer {
  border: 1px solid #9d9d9d;
  height: 100px;
  width: 100px;
  text-align: center;
  margin-top: 80px;
}
</style>
