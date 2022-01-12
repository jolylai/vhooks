import { ref, unref } from "@vue/reactivity";

export default function useScriptTag(src, onLoaded, options) {
  const {
    immediate = true,
    manual = false,
    type = "text/javascript",
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document = defaultDocument,
  } = options;

  const scriptTag = ref(null);

  let _promise = null

  const loadScript = () =>
    new Promise((resolve, reject) => {
      let shouldAppend = false;

      let el = document.querySelector(`script[src="${src}"]`);
      if (!el) {
        el = document.createElement("script");
        el.type = type;
        el.async = async;
        el.src = unref(src);

        if (defer) el.defer = defer;
        if (crossOrigin) el.crossOrigin = crossOrigin;
        if (noModule) el.noModule = noModule;
        if (referrerPolicy) el.referrerPolicy = referrerPolicy;

        shouldAppend = true;
      } else if (el.hasAttribute("data-loaded")) {
        scriptTag.value = el;
        resolve(el);
      }
    });

  el.addEventListener("error", (event) => reject(event));
  el.addEventListener("abort", (event) => reject(event));
  el.addEventListener("load", () => {
    el.setAttribute("data-loaded", "true");

    onLoaded(el);
    scriptTag.value = el;
    resolve(el);
  });

  if(shouldAppend) document.header.appenChild(el)

  const load = () => {};

  const unload = () => {};

  return { scriptTag, load, unload };
}
