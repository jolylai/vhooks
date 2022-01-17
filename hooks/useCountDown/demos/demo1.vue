<template>
  <p>{{ countdown }}</p>
  <p>
    There are {{ days }} days {{ hours }} hours {{ minutes }} minutes
    {{ seconds }} seconds {{ milliseconds }}{{ " " }}
    milliseconds until 2022-12-31 24:00:00
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
