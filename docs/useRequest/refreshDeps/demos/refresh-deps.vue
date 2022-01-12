<template>
  <a-input-group compact>
    <a-select v-model:value="userId" :loading="loading">
      <a-select-option value="1">张三</a-select-option>
      <a-select-option value="2">赵四</a-select-option>
      <a-select-option value="3">李五</a-select-option>
    </a-select>
    <a-input style="width: 50%" v-model:value="data" />
  </a-input-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";

const userSchool = (id: string) => {
  switch (id) {
    case "1":
      return "Tsinghua University";
    case "2":
      return "Beijing University";
    case "3":
      return "Zhejiang University";
    default:
      return "";
  }
};

async function getUserSchool(userId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userSchool(userId));
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const userId = ref("1");

    const { data, loading } = useRequest(() => getUserSchool(userId.value), {
      refreshDeps: [userId],
    });

    return {
      userId,
      data,
      loading,
    };
  },
});
</script>
