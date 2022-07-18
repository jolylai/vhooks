import { watchEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils";

interface DropOptions {
  onText?: (text: string, event: DragEvent) => void;
  onFiles?: (files: File[], event: DragEvent) => void;
  onUri?: (text: string, event: DragEvent) => void;
  onDom?: (content: string, event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
  onPast?: (text: string, event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
}

const useDrop = (target: BasicTarget, options: DropOptions) => {
  watchEffect((onInvalidate) => {
    const targetElement = getTargetElement(target);

    if (!targetElement) return;

    const onData = (event: DragEvent) => {
      // uri
      const uri = event.dataTransfer?.getData("text/uri-list");
      if (uri && options.onUri) {
        options.onUri(uri, event);
        return;
      }

      const dom = event.dataTransfer?.getData("custom");
      if (dom && options.onDom) {
        let data = dom;
        try {
          data = JSON.parse(dom);
        } catch (error) {
          data = dom;
        }

        options.onDom(data, event);
        return;
      }

      // 文件拖拽
      const files = event.dataTransfer?.files;
      if (files && files.length) {
        options?.onFiles?.(Array.from(files), event);
        return;
      }

      if (event.dataTransfer?.items && options.onText) {
        event.dataTransfer.items[0].getAsString((text) => {
          options.onText!(text, event);
        });
      }
    };

    const onDragEnter = (event: DragEvent) => {
      options?.onDragEnter?.(event);
    };

    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      options?.onDragOver?.(event);
    };

    const onDragLeave = (event: DragEvent) => {
      options?.onDragLeave?.(event);
    };

    const onDrop = (event: DragEvent) => {
      console.log("event: onDrop", event);
      onData(event);
    };

    const onPast = (event: ClipboardEvent) => {
      console.log("event: ", event);
    };

    onInvalidate(() => {
      targetElement.removeEventListener("dragenter", onDragEnter as any);
      targetElement.removeEventListener("dragover", onDragOver as any);
      targetElement.removeEventListener("dragleave", onDragLeave as any);
      targetElement.removeEventListener("drop", onDrop as any);
      targetElement.removeEventListener("past", onPast as any);
    });

    targetElement.addEventListener("dragenter", onDragEnter as any);
    targetElement.addEventListener("dragover", onDragOver as any);
    targetElement.addEventListener("dragleave", onDragLeave as any);
    targetElement.addEventListener("drop", onDrop as any);
    targetElement.addEventListener("past", onPast as any);
  });
};

export default useDrop;
