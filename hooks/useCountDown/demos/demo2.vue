<template>
  <a-space>
    <a-button @click="onStart">{{
      countdown === 0
        ? "Start Interval"
        : `Reset After
      ${Math.round(countdown / 1000)}s`
    }}</a-button>

    <a-button @click="onStop">stop</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useCountDown } from "usevhooks";

const targetDate = ref();

const [countdown] = useCountDown({
  targetDate,
  onEnd: () => {
    alert("End of the time");
  },
});

const onStart = () => {
  targetDate.value = Date.now() + 5000;
};

const onStop = () => {
  targetDate.value = undefined;
};
</script>
