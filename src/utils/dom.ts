import { isRef } from "vue";
import type { Ref } from "vue";

export type BasicTarget<T = HTMLElement> = T | (() => T) | null | Ref<T>;
export type TargetElement = HTMLElement | Element | Window | Document;

/**
 * 获取目标元素
 * @param target
 */
export const getTargetElement = (
  target: BasicTarget,
  defaultTarget?: TargetElement
): TargetElement | null | undefined => {
  if (!target) {
    return defaultTarget;
  }

  let targetElement: TargetElement | null | undefined;

  if (typeof target === "function") {
    targetElement = target();
  } else if (isRef(target)) {
    targetElement = target.value;
  } else {
    targetElement = target;
  }

  return targetElement;
};
