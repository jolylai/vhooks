import { watchEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils";

interface DragOptions {
  onDragStart: (e: DragEvent) => void;
  onDragEnd: (e: DragEvent) => void;
}

const useDrag = (data: any, target: BasicTarget, options: DragOptions) => {
  watchEffect((onInvalidate) => {
    const targetElement = getTargetElement(target);

    if (!targetElement) return;

    targetElement.setAttribute("draggable", "true");

    const onDragStart = (event: DragEvent) => {
      options?.onDragStart(event);
      event.dataTransfer?.setData("custom", JSON.stringify(data));
    };

    const onDragEnd = (event: DragEvent) => {
      options?.onDragEnd(event);
    };

    onInvalidate(() => {
      targetElement.removeEventListener("dragstart", onDragStart as any);
      targetElement.removeEventListener("dragend", onDragEnd as any);
    });

    targetElement.addEventListener("dragstart", onDragStart as any);
    targetElement.addEventListener("dragend", onDragEnd as any);
  });
};

export default useDrag;
