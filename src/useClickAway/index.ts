import { watchPostEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils/dom";

const defaultEvent = "click";

const useClickAway = (
  onClickAway: (e: MouseEvent | TouchEvent) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent
) => {
  const handler = (event: any) => {
    const targets = Array.isArray(target) ? target : [target];

    const isContains = targets.some((target) => {
      const targetElement = getTargetElement(target);

      if (targetElement) {
        return (targetElement as HTMLElement).contains(event.target);
      }

      return false;
    });

    if (!isContains) {
      onClickAway(event);
    }
  };

  watchPostEffect((onInvalidate) => {
    onInvalidate(() => {
      document.removeEventListener(eventName, handler, false);
    });
    document.addEventListener(eventName, handler, false);
  });
};

export default useClickAway;
