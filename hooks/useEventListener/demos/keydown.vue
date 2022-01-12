<template>
  <p>Your press key is {{ keyCode }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useEventListener } from "usevhooks";

const keyCode = ref<string>("");

useEventListener(window, "keydown", (event: KeyboardEvent) => {
  keyCode.value = event.code;
});
</script>
