import { ref } from "vue";
import { Plugin } from "../types";

const useLoadingDelayPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { loadingDelay }
) => {
  const timerRef = ref();

  const cancelTimeout = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
    }
  };

  if (!loadingDelay) return {};

  return {
    onBefore: () => {
      cancelTimeout();

      timerRef.value = setTimeout(() => {
        fetchInstance.state.loading = true;
      }, loadingDelay);

      return { loading: false };
    },
    onFinally: () => {
      cancelTimeout();
    },

    onCancel: () => {
      cancelTimeout();
    },
  };
};

export default useLoadingDelayPlugin;
