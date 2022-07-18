import { ref, watchEffect } from "vue";

const useDocumentVisibility = () => {
  const visibilityState = ref<DocumentVisibilityState>(
    document.visibilityState
  );

  const visibilityHandler = () => {
    visibilityState.value = document.visibilityState;
  };

  watchEffect((onInvalidate) => {
    document.addEventListener("visibilitychange", visibilityHandler, false);

    onInvalidate(() => {
      document.removeEventListener(
        "visibilitychange",
        visibilityHandler,
        false
      );
    });
  });

  return visibilityState;
};

export default useDocumentVisibility;
