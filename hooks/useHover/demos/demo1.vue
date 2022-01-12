<template>
  <div ref="hoverRef">{{ isHovering ? "hover" : "leaveHover" }}</div>
</template>

<script setup>
import { ref } from "vue";
import { useHover } from "usevhooks";

const hoverRef = ref();

const isHovering = useHover(hoverRef);
</script>
