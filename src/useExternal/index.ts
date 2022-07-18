import { ref, watchEffect, Ref, unref } from "vue";

export interface Options {
  type?: "js" | "css";
  js?: Partial<HTMLOrSVGElement>;
  css: Partial<HTMLStyleElement>;
}

export type Status = "unset" | "loading" | "ready" | "error";

interface LoadResult {
  ref: Element;
  status: Status;
}

const loadScript = (
  path: string,
  props: Partial<HTMLScriptElement> = {}
): LoadResult => {
  const script = document.querySelector(`script[src="${path}"]`);

  if (script) return { ref: script, status: "ready" };

  const newScript = document.createElement("script");
  newScript.src = path;

  Object.keys(props).forEach((key) => {
    // @ts-ignore
    newScript[key] = props[key];
  });

  newScript.setAttribute("data-status", "loading");
  document.body.appendChild(newScript);

  return { ref: newScript, status: "loading" };
};

const loadCss = (
  path: string,
  props: Partial<HTMLLinkElement> = {}
): LoadResult => {
  const css = document.querySelector(`link[href="${path}"]`);

  if (css) return { ref: css, status: "ready" };

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;

  Object.keys(props).forEach((key) => {
    // @ts-ignore
    link[key] = props[key];
  });

  link.setAttribute("data-status", "loading");

  document.head.appendChild(link);

  return { ref: link, status: "loading" };
};

const useExternal = (path: string | Ref<string>, options: Options) => {
  const status = ref<Status>(path ? "loading" : "unset");
  const elementRef = ref<Element>();

  watchEffect((onInvalid) => {
    const url = unref(path);

    if (!url) {
      status.value = "unset";
      return;
    }

    if (options.type === "js") {
      const result = loadScript(url, options.js);
      elementRef.value = result.ref;
      status.value = result.status;
    } else if (options.type === "css") {
      const result = loadCss(url, options.css);
      elementRef.value = result.ref;
      status.value = result.status;
    } else {
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css'). " +
          "Refer to the https://ahooks.js.org/hooks/dom/use-external/#options"
      );
    }

    if (!elementRef.value) return;

    const handler = (event: Event) => {
      const targetStatus = event.type === "load" ? "ready" : "error";

      status.value = targetStatus;
      elementRef.value?.setAttribute("data-status", targetStatus);
    };

    onInvalid(() => {
      elementRef.value?.removeEventListener("load", handler);
      elementRef.value?.removeEventListener("error", handler);

      elementRef.value?.remove();
    });

    elementRef.value?.addEventListener("load", handler);
    elementRef.value?.addEventListener("error", handler);
  });

  return status;
};

export default useExternal;
