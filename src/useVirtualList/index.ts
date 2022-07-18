import { computed, reactive, ref, watch, watchEffect } from "vue";
import { BasicTarget } from "../utils";

export interface OptionType<T> {
  itemHeight: number | ((index: number, data: T) => number);
  overscan?: number;
  containerTarget: BasicTarget;
  wrapperTarget: BasicTarget;
}

const useVirtualList = <T>(originalList: T[], options: OptionType<T>) => {
  const list = ref();
  const { itemHeight, overscan = 5 } = options;

  if (!itemHeight) {
    console.warn("please enter a valid itemHeight");
  }

  const state = reactive({
    start: 0,
    end: 10,
  });

  watchEffect(() => {
    const { start, end } = state;

    list.value = originalList
      .slice(start, end)
      .map((data, index) => ({ data, index: index + start }));
  });

  const totalHeight = computed(() => {
    const { length } = originalList;
    return itemHeight * length;
  });

  const offsetTop = computed(() => {
    console.log("offsetTop: ");
    const start = state.start;

    return getDistanceTop(start);
  });

  const containerRef = ref<HTMLElement>();

  // 获取被卷起项的数量
  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === "number") {
      return Math.floor(scrollTop / itemHeight) + 1;
    }

    // todo 动态计算
  };

  // 获取容器能展示几个
  const getViewCapacity = (containerHeight: number) => {
    return Math.ceil(containerHeight / itemHeight);
  };

  const calculateRange = () => {
    const element = containerRef.value;

    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);

      const fromIndex = offset - overscan;
      const toIndex = offset + viewCapacity + overscan;

      state.start = Math.max(fromIndex, 0);
      state.end = toIndex > originalList.length ? originalList.length : toIndex;
    }
  };

  const onContainerScroll = (e) => {
    calculateRange();
  };

  const getDistanceTop = (index: number) => {
    return index * itemHeight;
  };

  const containerProps = ref({
    ref: (el) => {
      containerRef.value = el;
      el.addEventListener("scroll", onContainerScroll, false);
    },
    style: { overflowY: "auto" },
  });

  const wrapperProps = computed(() => {
    const { start } = state;

    const offsetTop = getDistanceTop(start);

    return {
      style: {
        width: "100%",
        height: totalHeight.value - offsetTop + "px",
        marginTop: offsetTop + "px",
      },
    };
  });

  const scrollTo = (index: number) => {};

  return {
    list,
    scrollTo,
  };
};

export default useVirtualList;
