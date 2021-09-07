<template>
  <div id="useHoverBtn">{{ isHovering ? "hover" : "leaveHover" }}</div>
</template>

<script setup>
import { useHover } from "usevhooks";

const isHovering = useHover(() => document.getElementById("useHoverBtn"), {
  onEnter() {
    console.log("enter");
  },
  onLeave() {
    console.log("leave");
  },
});
</script>
