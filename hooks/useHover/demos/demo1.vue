<template>
  <div ref="hoverRef">{{ isHovering ? "hover" : "leaveHover" }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useHover } from "usevhooks";

export default defineComponent({
  setup() {
    const hoverRef = ref();

    const isHovering = useHover(hoverRef);

    return { isHovering, hoverRef };
  },
});
</script>
