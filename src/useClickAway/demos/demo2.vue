<template>
  <button id="useClickAwayBtn">点击</button>
  <p>点击了 {{ count }} 次</p>
</template>

<script setup>
import { ref } from "vue";
import { useClickAway } from "usevhooks";

const count = ref(0);

useClickAway(
  () => {
    count.value += 1;
  },
  () => document.getElementById("useClickAwayBtn")
);
</script>
