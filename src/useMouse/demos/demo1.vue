<template>
  <div>
    Mouse Position :
    {{ JSON.stringify({ screenX, screenY, clientX, clientY, pageX, pageY }) }}
  </div>
</template>

<script setup>
import { useMouse } from "usevhooks";

const { screenX, screenY, clientX, clientY, pageX, pageY } = useMouse();
</script>
