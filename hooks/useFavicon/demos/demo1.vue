<template>
  <p>Favicon: {{ faviconUrl }}</p>

  <div>
    <button @click="gooleFavicon">Google Favicon</button>
    <button @click="defaultFavicon">Default Favicon</button>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useFavicon } from "usevhooks";

const DEFAULT_FAVICON_URL = "https://ahooks.js.org/simple-logo.svg";

const GOOGLE_FAVICON_URL = "https://www.google.com/favicon.ico";

const faviconUrl = ref(DEFAULT_FAVICON_URL);

useFavicon(faviconUrl);

const gooleFavicon = () => {
  faviconUrl.value = GOOGLE_FAVICON_URL;
};

const defaultFavicon = () => {
  faviconUrl.value = DEFAULT_FAVICON_URL;
};
</script>
