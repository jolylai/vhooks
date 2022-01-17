<template>
  <p>{{ current }} [max: 10; min: 1;]</p>
  <a-space>
    <a-button @click="() => inc()">inc</a-button>
    <a-button @click="() => dec()">dec</a-button>
    <a-button @click="() => set(3)">set</a-button>
    <a-button @click="() => reset()">reset</a-button>
  </a-space>
</template>

<script setup>
import { useCounter } from "usevhooks";

const [current, { inc, dec, set, reset }] = useCounter(100, {
  min: 1,
  max: 10,
});
</script>
