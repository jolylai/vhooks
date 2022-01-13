import { ref, watchPostEffect } from "vue";
import type { Ref } from "vue";
import { getTargetElement } from "../utils";

export type TargetType = HTMLElement | Ref<HTMLElement>;

const useSize = (target: TargetType) => {
  const width = ref<number>(0);
  const height = ref<number>(0);

  watchPostEffect((onInvalidate) => {
    const targetElement = getTargetElement(target);
    if (!targetElement) return;

    const observer = new ResizeObserver((entities) => {
      for (let entity of entities) {
        const { clientWidth, clientHeight } = entity.target;

        width.value = clientWidth;
        height.value = clientHeight;
      }
    });

    observer.observe(targetElement);

    onInvalidate(() => {
      observer.disconnect();
    });
  });

  return { width, height };
};

export default useSize;
