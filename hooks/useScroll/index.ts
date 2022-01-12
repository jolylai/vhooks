import { Ref, ref, watchPostEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils";

interface UseScrollPosition {
  top: number;
  left: number;
}

const useScroll = (
  target: BasicTarget,
  shouldUpdate: (position: UseScrollPosition) => boolean
) => {
  const top = ref(null);
  const left = ref(null);

  const handleScroll = (event) => {
    let scrollTop = null;
    let scrollLeft = null;

    const target = event.target;

    if (target === document) {
      if (!document.scrollingElement) return;

      scrollTop = document.scrollingElement.scrollTop;
      scrollLeft = document.scrollingElement.scrollLeft;
    } else {
      scrollTop = target.scrollTop;
      scrollLeft = target.scrollLeft;
    }

    if (shouldUpdate && !shouldUpdate({ top: scrollTop, left: scrollLeft }))
      return;

    top.value = scrollTop;
    left.value = scrollLeft;
  };

  watchPostEffect((onInvalid) => {
    const targetElement = getTargetElement(target, document);

    if (!targetElement) return;

    onInvalid(() => {
      targetElement.removeEventListener("scroll", handleScroll);
    });

    targetElement.addEventListener("scroll", handleScroll);
  });

  return {
    top,
    left,
  };
};

export default useScroll;
