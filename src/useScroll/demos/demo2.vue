<template>
  <p>left: {{ left }} top: {{ top }}</p>
</template>

<script setup>
import { useScroll } from "usevhooks";

const { left, top } = useScroll(document);
</script>
