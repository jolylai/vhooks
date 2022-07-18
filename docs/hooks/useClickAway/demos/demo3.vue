<template>
  <button ref="btnRef1">点击</button>
  <button ref="btnRef2">点击</button>
  <p>点击了 {{ count }} 次</p>
</template>

<script setup>
import { ref } from "vue";
import { useClickAway } from "usevhooks";

const btnRef1 = ref();
const btnRef2 = ref();

const count = ref(0);

useClickAway(() => {
  count.value += 1;
}, [btnRef1, btnRef2]);
</script>
