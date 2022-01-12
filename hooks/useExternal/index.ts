import { ref, watchEffect, Ref, isRef, computed } from "vue";

import { BasicTarget, getTargetElement } from "../utils/dom";

export interface Options {
  type?: string;
  async?: boolean;
  media?: string;
  target?: BasicTarget;
}

export type Status = "unset" | "loading" | "ready" | "error";

type ExternalElement = HTMLScriptElement | HTMLLinkElement | HTMLImageElement;

const cssReg = /\.css$/;
const jsReg = /\.js$/;
const imgReg = /(^img!|\.(png|gif|jpg|svg|webp)$)/;

const useExternal = (path: string | Ref<string>, options: Options) => {
  const src = computed(() => {
    return path;
  });

  const isPath = () => {
    if (typeof path === "string" && path !== "") return true;
    if (isRef(path) && typeof path.value === "string" && path.value)
      return true;

    return false;
  };

  const externalRef = ref<ExternalElement>();

  const status = ref<Status>(path ? "loading" : "unset");
  const activeRef = ref<boolean>(isPath());

  watchEffect(() => {
    externalRef.value?.remove();

    const src = isRef(path) ? path.value : path;

    if (!path || !activeRef.value) {
      externalRef.value = undefined;
      return;
    }

    if (options?.type === "js" || jsReg.test(src)) {
      const scriptElement = document.createElement("script");

      scriptElement.async = options.async;
      scriptElement.src = src;

      scriptElement.setAttribute("data-status", "loading");

      document.body.appendChild(scriptElement);

      externalRef.value = scriptElement;
    } else if (options?.type === "css" || cssReg.test(src)) {
      const linkElement = document.createElement("link");

      linkElement.rel = "stylesheet";
      linkElement.media = options.media;
      linkElement.href = src;
      linkElement.setAttribute("data-status", "loading");

      externalRef.value = linkElement;

      document.head.appendChild(linkElement);
    } else if (options?.type === "image" || imgReg.test(src)) {
      const imgTargetElement = getTargetElement(options.target);
      if (!imgTargetElement) return;

      const imgElement = document.createElement("img");

      imgElement.src = src;

      imgElement.setAttribute("data-status", "loading");

      (imgTargetElement as HTMLElement).appendChild(imgElement);

      externalRef.value = imgElement;
    } else {
      // do nothing
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css' | 'img'). " +
          "Refer to the https://ahooks.js.org/hooks/dom/use-external/#options"
      );
    }

    if (!externalRef.value) return;

    const setAttributeFromEvent = (event: Event) => {
      externalRef.value.setAttribute(
        "data-status",
        event.type === "load" ? "ready" : "error"
      );
    };

    externalRef.value.addEventListener("load", setAttributeFromEvent);

    const setStatusFromEvent = (event: Event) => {
      status.value = event.type === "load" ? "ready" : "error";
    };

    externalRef.value.addEventListener("load", setStatusFromEvent);
  });

  const toggle = () => {
    activeRef.value = !activeRef.value;
  };

  const load = () => {
    activeRef.value = true;
  };

  const unload = () => {
    activeRef.value = false;
  };

  return [status, { toggle, load, unload }];
};

export default useExternal;
