<template>
  <a-button ref="btnRef">You click {{ count }} times</a-button>
  <a-button id="btnRef">You click {{ count }} times</a-button>
</template>

<script setup>
import { ref } from "vue";
import { useEventListener } from "usevhooks";

const count = ref(0);
const btnRef = ref();

const handleClick = () => {
  count.value++;
};

useEventListener(btnRef, "click", handleClick);

useEventListener(() => document.getElementById("btnRef"), "click", handleClick);
</script>
