import { ref } from "vue";

const useVirtualList = (originalList: any[], options) => {
  const list = ref();

  const containerProps = ref({});

  const wrapperProps = ref([]);
  return {
    list,
    containerProps,
    wrapperProps,
  };
};

export default useVirtualList;
