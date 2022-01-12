<template>
  <div class="container">
    <div style="height: 800px">
      scroll here
      <div ref="observerRef" class="observer">observer dom</div>
    </div>
  </div>
  <p>inViewport: {{ inViewport ? "visible" : "hidden" }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useInViewport } from "usevhooks";

export default defineComponent({
  setup() {
    const observerRef = ref();

    const [inViewport] = useInViewport(observerRef);

    return {
      inViewport,
      observerRef,
    };
  },
});
</script>

<style scoped>
.container {
  width: 300px;
  height: 300px;
  overflow: scroll;
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
