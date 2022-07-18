import { ref, watchPostEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils";

interface UseScrollPosition {
  top: number;
  left: number;
}

const useScroll = (
  target: BasicTarget,
  shouldUpdate?: (position: UseScrollPosition) => boolean
) => {
  const top = ref(0);
  const left = ref(0);

  const handleScroll = (event: Event) => {
    let scrollTop = 0;
    let scrollLeft = 0;

    const target = event.target;

    if (target === document) {
      if (!document.scrollingElement) return;

      scrollTop = document.scrollingElement.scrollTop;
      scrollLeft = document.scrollingElement.scrollLeft;
    } else {
      scrollTop = (target as HTMLElement).scrollTop;
      scrollLeft = (target as HTMLElement).scrollLeft;
    }

    if (shouldUpdate?.({ top: scrollTop, left: scrollLeft })) {
      top.value = scrollTop;
      left.value = scrollLeft;
    }
  };

  watchPostEffect((onInvalid) => {
    const targetElement = getTargetElement(target) || document;

    onInvalid(() => {
      targetElement.removeEventListener("scroll", handleScroll);
    });

    targetElement.addEventListener("scroll", handleScroll);
  });

  return { top, left };
};

export default useScroll;
