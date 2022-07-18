import { unref, watchEffect } from "vue";
import type { Ref } from "vue";

const ImgTypeMap = {
  SVG: "image/svg+xml",
  ICO: "image/x-icon",
  GIF: "image/gif",
  PNG: "image/png",
};

type ImgTypes = keyof typeof ImgTypeMap;

const useFavicon = (faviconURL: string | Ref<string>) => {
  watchEffect(() => {
    const url = unref(faviconURL);

    if (!url) return;

    const urlSuffix = url.split(".");
    const imgSuffix = urlSuffix[
      urlSuffix.length - 1
    ].toLocaleLowerCase() as ImgTypes;

    const ImageType = ImgTypeMap[imgSuffix];

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
