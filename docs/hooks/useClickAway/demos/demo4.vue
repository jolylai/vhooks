<template>
  <button ref="btnRef">点击了 {{ count }} 次</button>
</template>

<script setup>
import { ref } from "vue";
import { useClickAway } from "usevhooks";

const btnRef = ref();
const count = ref(0);

useClickAway(
  () => {
    count.value += 1;
  },
  btnRef,
  "contextmenu"
);
</script>
