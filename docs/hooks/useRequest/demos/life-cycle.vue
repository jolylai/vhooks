<template>
  <input :value="userName" @input="onChange" />
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
    const userName = ref("");

    const { data, error, loading, run } = useRequest(editUsername, {
      manual: true,
      onBefore: (params) => {
        console.log(`Start Request: ${params[0]}`);
      },
      onSuccess: (result, params) => {
        console.log(`The username was changed to "${params[0]}" !`);
      },
      onError: (error: Error) => {
        console.log(error.message);
      },
      onFinally: (params, result, error) => {
        console.log(`Request finish`);
      },
    });

    const onChange = (event: Event) => {
      const inputTarget = event.target as HTMLInputElement;
      const value = inputTarget.value;
      userName.value = value;
    };

    const onEdit = () => {
      console.log("userName.value: ", userName.value);
      run(userName.value);
    };

    return {
      userName,
      data,
      error,
      loading,
      onEdit,
      onChange,
    };
  },
});
</script>
