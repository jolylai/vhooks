<template>
  <a-input-search
    :loading="loading"
    v-model:value="userName"
    placeholder="input search text"
    enter-button="Edit"
    @search="onEdit"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";
import { message } from "ant-design-vue";

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
    const userName = ref("");

    const { data, error, loading, run } = useRequest(editUsername, {
      manual: true,
      onSuccess(result: string, params: string) {
        message.success(result, params);
      },
      onError(error: Error) {
        message.error(error.message);
      },
    });

    const onEdit = () => {
      run(userName.value);
    };

    return {
      userName,
      data,
      error,
      loading,
      onEdit,
    };
  },
});
</script>
