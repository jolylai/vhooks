import { onBeforeUnmount, onMounted, ref, watch } from "vue";
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

const useInViewport = (target) => {
  const isInViewport = ref(false);

  const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        isInViewport.value = true;
      } else {
        isInViewport.value = false;
      }
    }
  });

  onMounted(() => {
    const targetElement = getTargetElement(target);

    if (!targetElement) {
      return;
    }

    observer.observe(targetElement as HTMLElement);
  });

  watch(
    () => target,
    () => {
      const targetElement = getTargetElement(target);

      if (!targetElement) {
        isInViewport.value = false;
        return;
      }

      observer.observe(targetElement as HTMLElement);
    }
  );

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return isInViewport;
};

export default useInViewport;
