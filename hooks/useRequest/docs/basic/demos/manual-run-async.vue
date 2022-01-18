<template>
  <a-input-search
    :loading="loading"
    v-model:value="userName"
    placeholder="请输入用户名"
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

    const { data, error, loading, runAsync } = useRequest(editUsername, {
      manual: true,
    });

    const onEdit = async () => {
      try {
        await runAsync(userName.value);
        message.success("编辑成功");
      } catch (error) {
        message.error(error.message);
      }
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
