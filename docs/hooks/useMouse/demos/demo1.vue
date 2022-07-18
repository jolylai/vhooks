<template>
  <div>
    Mouse Position :
    {{ JSON.stringify({ screenX, screenY, clientX, clientY, pageX, pageY }) }}
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { useMouse } from "usevhooks";

const { screenX, screenY, clientX, clientY, pageX, pageY } = useMouse();
</script>
