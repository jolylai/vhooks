import { watchPostEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils";

interface EventListenerOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

const useEventListener = (
  target: BasicTarget,
  eventName: string,
  handler: (e: Event) => void,
  options: EventListenerOptions = {}
): void => {
  watchPostEffect((onInvalidate) => {
    const targetElement = getTargetElement(target) || window;

    if (!targetElement) return;

    onInvalidate(() => {
      targetElement.removeEventListener(eventName, handler, options);
    });

    targetElement.addEventListener(eventName, handler, options);
  });
};

export default useEventListener;
