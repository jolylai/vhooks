import { debounce } from "lodash";
import { computed, ref, unref, watch } from "vue";
const useDebouncePlugin = (fetchInstance, { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait }) => {
    const debouncedRef = ref();
    const debounceOptions = computed(() => {
        const options = {};
        if (debounceLeading) {
            options.leading = debounceLeading;
        }
        if (debounceTrailing) {
            options.trailing = debounceTrailing;
        }
        if (debounceMaxWait) {
            options.maxWait = debounceMaxWait;
        }
        return options;
    });
    watch(() => [unref(debounceWait), debounceOptions], () => {
        if (debounceWait) {
            const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
            debouncedRef.value = debounce((callback) => {
                console.log("callback: ", callback);
                callback();
            }, debounceWait, debounceOptions.value);
            // debounce runAsync should be promise
            // https://github.com/lodash/lodash/issues/4400#issuecomment-834800398
            fetchInstance.runAsync = (...args) => {
                return new Promise((resolve, reject) => {
                    debouncedRef.value(() => {
                        _originRunAsync(...args)
                            .then(resolve)
                            .catch(reject);
                    });
                });
            };
        }
    }, { deep: true, immediate: true });
    return {};
};
export default useDebouncePlugin;
//# sourceMappingURL=useDebouncePlugin.js.map