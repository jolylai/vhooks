<template>
  <p>
    There are <a-tag color="pink">{{ days }}</a-tag> days
    <a-tag color="red">{{ hours }}</a-tag> hours
    <a-tag color="orange"> {{ minutes }}</a-tag> minutes
    <a-tag color="green">{{ seconds }}</a-tag> seconds
    <a-tag color="cyan">{{ milliseconds }}</a-tag> milliseconds until 2022-12-31
    24:00:00
  </p>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { useCountDown } from "usevhooks";

const [countdown, formattedRes] = useCountDown({
  targetDate: "2022-12-31 24:00:00",
});

const { days, hours, minutes, seconds, milliseconds } = formattedRes;
</script>
