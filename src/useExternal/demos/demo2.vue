<template>
  <p>status: {{ status }}</p>

  <div>
    <span class="badge badge-pill badge-primary">Primary</span>
  </div>
  <div>
    <button @click="toggle">toggle</button>
    <button @click="unload">unload</button>
    <button @click="load">load</button>
  </div>
</template>

<script setup>
import { useExternal } from "usevhooks";

const [status, { toggle, load, unload }] = useExternal(
  "https://ahooks.gitee.io/useExternal/bootstrap-badge.css",
  {
    media: "all",
  }
);
</script>
