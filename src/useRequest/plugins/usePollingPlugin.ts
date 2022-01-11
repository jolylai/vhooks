import { ref } from "vue";
import { Plugin } from "../types";
import isDocumentVisible from "../utils/isDocumentVisible";
import subscribeReVisible from "../utils/subscribeReVisible";

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true }
) => {
  const timerRef = ref();

  const unsubscribeRef = ref();

  const stopPolling = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
    }
    unsubscribeRef.value?.();
  };

  if (!pollingInterval) return {};

  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      if (!pollingWhenHidden && !isDocumentVisible()) {
        unsubscribeRef.value = subscribeReVisible(() => {
          fetchInstance.refresh();
        });

        return;
      }

      timerRef.value = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
