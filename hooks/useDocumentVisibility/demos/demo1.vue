<template>
  <div>Current document visibility state: {{ documentVisibility }}</div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
// @ts-ignore
import { useDocumentVisibility } from "usevhooks";

export default defineComponent({
  setup() {
    const documentVisibility = useDocumentVisibility();

    watch(documentVisibility, (documentVisibility) => {
      console.log("documentVisibility", documentVisibility);
    });

    return { documentVisibility };
  },
});
</script>
