import { ref } from "vue";
import isDocumentVisible from "../utils/isDocumentVisible";
import subscribeReVisible from "../utils/subscribeReVisible";
const usePollingPlugin = (fetchInstance, { pollingInterval, pollingWhenHidden = true }) => {
    const timerRef = ref();
    const unsubscribeRef = ref();
    const stopPolling = () => {
        var _a;
        if (timerRef.value) {
            clearTimeout(timerRef.value);
        }
        (_a = unsubscribeRef.value) === null || _a === void 0 ? void 0 : _a.call(unsubscribeRef);
    };
    if (!pollingInterval)
        return {};
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
//# sourceMappingURL=usePollingPlugin.js.map