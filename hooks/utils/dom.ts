import { isRef } from "vue";
import type { Ref } from "vue";

type TargetValue<T> = T | undefined | null;

export type BasicTarget<T extends TargetElement = Element> =
  | TargetValue<T>
  | (() => T)
  | Ref<T>;

export type TargetElement = HTMLElement | Element | Window | Document;

export function getTargetElement<T extends TargetElement>(
  target: BasicTarget<T>,
  defaultTarget?: T
): TargetValue<T> {
  if (!target) return defaultTarget;

  let targetElement: TargetValue<T>;

  if (typeof target === "function") {
    targetElement = target();
  } else if (isRef(target)) {
    targetElement = target.value;
  } else {
    targetElement = target;
  }

  return targetElement;
}
