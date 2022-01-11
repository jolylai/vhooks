<template>
  <div>username: {{ data }}</div>
  <a-input-search
    placeholder="input search text"
    enter-button="Edit"
    @search="onSearch"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";
import { message } from "ant-design-vue";

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Tom");
    }, 1000);
  });
}

function editUsername(username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error("Failed to modify username"));
      }
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const { data, mutate } = useRequest(getUsername);

    const lastRef = ref();

    const { run } = useRequest(editUsername, {
      manual: true,
      onSuccess: (result: string, params: [string]) => {
        message.success(`The username was changed to "${params[0]}" !`);
      },
      onError: (error: Error) => {
        message.error(error.message);
        mutate(lastRef.value);
      },
    });

    const onSearch = (value: string) => {
      lastRef.value = value;
      run(value);
      mutate(value);
    };

    return {
      data,
      onSearch,
    };
  },
});
</script>
