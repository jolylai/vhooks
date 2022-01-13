<template>
  <div id="useHoverBtn" :class="{ hover: isHovering }">
    {{ isHovering ? "hover" : "leaveHover" }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useHover } from "usevhooks";

export default defineComponent({
  setup() {
    const isHovering = useHover(() => document.getElementById("useHoverBtn"), {
      onEnter() {
        console.log("enter");
      },
      onLeave() {
        console.log("leave");
      },
    });

    return { isHovering };
  },
});
</script>

<style scoped>
.hover {
  background-image: linear-gradient(
    45deg,
    #ff9a9e 0%,
    #fad0c4 99%,
    #fad0c4 100%
  );
}
</style>
