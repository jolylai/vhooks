<template>
  <p>Favicon: {{ faviconUrl }}</p>

  <a-space>
    <a-button @click="googleFavicon">Google Favicon</a-button>
    <a-button @click="defaultFavicon">Default Favicon</a-button>
  </a-space>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useFavicon } from "usevhooks";

export default defineComponent({
  setup() {
    const DEFAULT_FAVICON_URL = "https://ahooks.js.org/simple-logo.svg";

    const GOOGLE_FAVICON_URL = "https://www.google.com/favicon.ico";

    const faviconUrl = ref(DEFAULT_FAVICON_URL);

    useFavicon(faviconUrl);

    const googleFavicon = () => {
      faviconUrl.value = GOOGLE_FAVICON_URL;
    };

    const defaultFavicon = () => {
      faviconUrl.value = DEFAULT_FAVICON_URL;
    };
    return {
      faviconUrl,
      googleFavicon,
      defaultFavicon,
    };
  },
});
</script>
