import { onUnmounted, ref } from "vue";
import { Plugin } from "../types";
import limit from "../utils/limit";
import subscribeReVisible from "../utils/subscribeReVisible";

const useRefreshOnWindowFocusPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { refreshOnWindowFocus = false, focusTimespan = 5000 }
) => {
  const unsubscribeRef = ref();

  const stopSubscribe = () => {
    if (unsubscribeRef.value) {
      unsubscribeRef.value();
    }
  };

  if (refreshOnWindowFocus) {
    const limitRefresh = limit(
      fetchInstance.refresh.bind(fetchInstance),
      focusTimespan
    );

    unsubscribeRef.value = subscribeReVisible(() => {
      limitRefresh();
    });
  }

  onUnmounted(() => {
    stopSubscribe();
  });

  return {};
};

export default useRefreshOnWindowFocusPlugin;
