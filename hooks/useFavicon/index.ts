import { unref, watchEffect } from "vue";
import type { Ref } from "vue";

const ImgTypeMap = {
  SVG: "image/svg+xml",
  ICO: "image/x-icon",
  GIF: "image/gif",
  PNG: "image/png",
};

const useFavicon = (faviconURL: string | Ref<string>) => {
  watchEffect(() => {
    const url = unref(faviconURL);
    const urlSuffix = url.split(".").pop();
    const ImageType = ImgTypeMap[urlSuffix.toUpperCase()];

    const linkElement: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    linkElement.rel = "shortcut icon";
    linkElement.type = ImageType;
    linkElement.href = url;

    document.head.appendChild(linkElement);
  });
};

export default useFavicon;
