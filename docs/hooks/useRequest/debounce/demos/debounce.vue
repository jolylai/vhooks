<template>
  <a-select
    show-search
    placeholder="请输入用户名"
    style="width: 260px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="data"
    @search="handleSearch"
  >
  </a-select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import { useRequest } from "usevhooks";
import Mock from "mockjs";

async function getEmail(search?: string): Promise<string[]> {
  console.log("debounce getEmail", search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ "data|5": [{ "id|+1": 1, value: "@cname" }] }).data);
    }, 300);
  });
}

export default defineComponent({
  setup() {
    const { data, loading, run } = useRequest(getEmail, {
      debounceWait: 1000,
      manual: true,
    });

    const handleSearch = (val: string) => {
      run(val);
    };

    return {
      data,
      loading,
      handleSearch,
    };
  },
});
</script>
