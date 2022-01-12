import { ref, watch } from "vue";
import type { Ref } from "vue";

export type TargetType = HTMLElement | Ref<HTMLElement>;

const useSize = (target: TargetType) => {
  const width = ref<number>(0);
  const height = ref<number>(0);

  if (target instanceof HTMLElement) {
    target = ref(target);
  }

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      width.value = entry.target.clientWidth;
      height.value = entry.target.clientHeight;
    });
  });

  watch(
    target,
    (target) => {
      if (target) {
        resizeObserver.disconnect();
        resizeObserver.observe(target as HTMLElement);
      }
    },
    {
      immediate: true,
    }
  );

  return {
    width,
    height,
  };
};

export default useSize;
