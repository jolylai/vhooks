<template>
  <input :value="state" @input="onChange" />
  <button @click="onEdit">Edit</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";

function editUsername(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(username);
      } else {
        reject(new Error("Failed to modify username"));
      }
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const state = ref("");

    const { data, error, loading, runAsync } = useRequest(editUsername, {
      manual: true,
    });

    const onChange = (event: Event) => {
      const inputTarget = event.target as HTMLInputElement;
      const value = inputTarget.value;
      state.value = value;
    };

    const onEdit = async () => {
      try {
        await runAsync();
        console.log(`The username was changed to "${state.value}" !`);
      } catch (error) {
        console.error(error.message);
      }
    };

    return {
      state,
      data,
      error,
      loading,
      onEdit,
      onChange,
    };
  },
});
</script>
