import { onMounted, onUnmounted, toRef } from "vue";
import Fetch from "./fetch";
function useRequestImplement(service, options = {}, plugins) {
    const { manual = false } = options;
    const update = () => {
        console.log("update");
    };
    // 初始化数据
    const initState = plugins.map((p) => { var _a; return (_a = p === null || p === void 0 ? void 0 : p.onInit) === null || _a === void 0 ? void 0 : _a.call(p, options); }).filter(Boolean);
    const fetchInstance = new Fetch(service, options, update, Object.assign({}, ...initState));
    fetchInstance.options = options;
    // 初始化插件
    fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, options));
    const params = fetchInstance.state.params || options.defaultParams || [];
    onMounted(() => {
        if (manual === false) {
            fetchInstance.run(...params);
        }
    });
    onUnmounted(() => {
        fetchInstance.cancel();
    });
    return {
        loading: toRef(fetchInstance.state, "loading"),
        data: toRef(fetchInstance.state, "data"),
        error: toRef(fetchInstance.state, "error"),
        params: fetchInstance.state.params || [],
        // ？ bind
        // @ts-ignore
        run: fetchInstance.run.bind(fetchInstance, ...params),
        // @ts-ignore
        runAsync: fetchInstance.runAsync.bind(fetchInstance, ...params),
        refresh: fetchInstance.refresh.bind(fetchInstance),
        refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
        mutate: fetchInstance.mutate.bind(fetchInstance),
        cancel: fetchInstance.cancel.bind(fetchInstance),
    };
}
export default useRequestImplement;
//# sourceMappingURL=useRequestImplement.js.map