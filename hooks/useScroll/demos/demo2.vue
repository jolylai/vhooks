<template>
  <p>left: {{ left }} top: {{ top }}</p>
</template>

<script setup lang="ts">
// @ts-ignore
import { useScroll } from "usevhooks";

const { left, top } = useScroll(document);
</script>
