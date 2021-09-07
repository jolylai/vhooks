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
  const top = ref();
  const left = ref();

  const handleScroll = (event) => {
    let scrollTop;
    let scrollLeft;

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
    console.log("document: ", document);
    console.log("targetElement: ", targetElement);

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
