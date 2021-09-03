<template>
  <p>status: {{ status }}</p>
  <a :href="path" target="_blank">{{ path }}</a>

  <div ref="targetRef"></div>

  <button @click="random">random</button>
  <button @click="toggle">toggle</button>
  <button @click="unload">unload</button>
  <button @click="load">load</button>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import { useExternal } from "usevhooks";

const targetRef = ref();
const path = ref("https://picsum.photos/200/100");

const [status, { toggle, load, unload }] = useExternal(path, {
  type: "image",
  target: targetRef,
});

const random = () => {
  path.value = `https://picsum.photos/200/100?random=${Math.floor(
    Math.random() * 100
  )}`;
};
</script>
