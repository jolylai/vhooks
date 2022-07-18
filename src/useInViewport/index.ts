import { ref, watchPostEffect } from "vue";
import { BasicTarget, getTargetElement } from "../utils/dom";

// const useInViewport = (target: BasicTarget) => {
//   const isInViewport = ref(false);

//   let targetElement;

//   const handleScroll = () => {
//     if (!targetElement) return;

//     const targetRect = (targetElement as HTMLElement).getBoundingClientRect();

//     const viewPortHeight =
//       window.innerHeight || document.documentElement.clientHeight;

//     const viewPortWidth =
//       window.innerHeight || document.documentElement.clientWidth;

//     isInViewport.value =
//       targetRect.top <= viewPortHeight &&
//       targetRect.bottom >= 0 &&
//       targetRect.left <= viewPortWidth &&
//       targetRect.right > 0;
//   };

//   onMounted(() => {
//     targetElement = getTargetElement(target);

//     handleScroll();

//     document.addEventListener("scroll", handleScroll, false);
//   });

//   onBeforeUnmount(() => {
//     document.addEventListener("scroll", handleScroll, false);
//   });

//   return isInViewport;
// };

const useInViewport = (
  target: BasicTarget,
  options: IntersectionObserverInit = {}
) => {
  const isInViewport = ref(false);
  const ratio = ref();

  const observeCb = (entries: IntersectionObserverEntry[]) => {
    for (let entry of entries) {
      ratio.value = entry.intersectionRatio;
      if (entry.isIntersecting) {
        isInViewport.value = true;
      } else {
        isInViewport.value = false;
      }
    }
  };

  watchPostEffect((onInvalidate) => {
    const targetElement = getTargetElement(target);

    if (options.root) {
      options.root = getTargetElement(options.root);
    }

    if (!targetElement) return;

    const observer = new IntersectionObserver(observeCb, options);

    observer.observe(targetElement as Element);

    onInvalidate(() => {
      observer.disconnect();
    });
  });

  return [isInViewport, ratio];
};

export default useInViewport;
