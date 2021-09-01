import { ref } from "vue";

export interface OptionType {
  itemHeight?: number;
  overscan?: number;
}

const useVirtualList = <T>(originalList: T[], options: OptionType) => {
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
