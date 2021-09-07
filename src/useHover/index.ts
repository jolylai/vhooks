import { ref, watchPostEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils";

interface UseHoverOptions {
  onEnter?: () => void;
  onLeave?: () => void;
}

const useHover = (target: BasicTarget, options: UseHoverOptions = {}) => {
  const isHover = ref<boolean>(false);

  const handleHover = (event: Event) => {
    const { type } = event;
    if (type === "mouseenter") {
      options?.onEnter?.();
      isHover.value = true;
    } else if (type === "mouseleave") {
      options?.onLeave?.();
      isHover.value = false;
    }
  };

  watchPostEffect((onInvalidate) => {
    const targetElement = getTargetElement(target);
    if (!targetElement) return;

    onInvalidate(() => {
      targetElement.removeEventListener("mouseenter", handleHover);
      targetElement.removeEventListener("mouseleave", handleHover);
    });

    targetElement.addEventListener("mouseenter", handleHover);
    targetElement.addEventListener("mouseleave", handleHover);
  });

  return isHover;
};

export default useHover;
