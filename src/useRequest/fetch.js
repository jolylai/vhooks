import { reactive } from "vue";
export default class Fetch {
    constructor(service, options, subscribe, initState) {
        this.service = service;
        this.options = options;
        this.subscribe = subscribe;
        this.initState = initState;
        this.count = 0;
        this.pluginImpls = [];
        this.state = reactive({
            loading: false,
            params: undefined,
            data: undefined,
            error: undefined,
        });
        this.setState({
            loading: !options.manual,
            ...initState,
        });
    }
    setState(s) {
        Object.assign(this.state, s);
    }
    runPluginHandler(event, ...params) {
        const r = this.pluginImpls
            // @ts-ignore
            .map((plugin) => { var _a; return (_a = plugin[event]) === null || _a === void 0 ? void 0 : _a.call(plugin, ...params); })
            .filter(Boolean);
        return Object.assign({}, ...r);
    }
    run(...params) {
        this.runAsync(...params).catch((error) => { });
    }
    async runAsync(...params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.count++;
        const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler("onBefore", ...params);
        if (stopNow) {
            return new Promise(() => { });
        }
        this.setState({
            loading: true,
            params,
            ...state,
        });
        if (returnNow) {
            return Promise.resolve(state.data);
        }
        (_b = (_a = this.options).onBefore) === null || _b === void 0 ? void 0 : _b.call(_a, params);
        try {
            let { servicePromise } = this.runPluginHandler("onRequest", this.service, params);
            if (!servicePromise) {
                servicePromise = this.service(...params);
            }
            let res = await servicePromise;
            this.setState({
                data: res,
                error: undefined,
                loading: false,
            });
            (_d = (_c = this.options).onSuccess) === null || _d === void 0 ? void 0 : _d.call(_c, res, params);
            this.runPluginHandler("onSuccess", res, params);
            (_f = (_e = this.options).onFinally) === null || _f === void 0 ? void 0 : _f.call(_e, params, res, undefined);
            this.runPluginHandler("onFinally", params, res, undefined);
            return res;
        }
        catch (error) {
            // 保留上次请求成功的结果
            this.setState({
                error: error,
                loading: false,
            });
            (_h = (_g = this.options).onError) === null || _h === void 0 ? void 0 : _h.call(_g, error, params);
            this.runPluginHandler("onError", error, params);
            (_k = (_j = this.options).onFinally) === null || _k === void 0 ? void 0 : _k.call(_j, params, undefined, error);
            this.runPluginHandler("onFinally", params, undefined, error);
            // 抛出错误用户自行处理
            throw error;
        }
    }
    refresh() {
        this.run(...this.state.params);
    }
    refreshAsync() {
        this.runAsync(...this.state.params);
    }
    mutate(data) {
        let targetData;
        if (typeof data === "function") {
            // @ts-ignore
            targetData = data(this.state.data);
        }
        else {
            targetData = data;
        }
        this.runPluginHandler("onMutate", targetData);
        this.setState({
            data: targetData,
        });
    }
    cancel() {
        this.count += 1;
        this.runPluginHandler("onCancel");
        this.setState({
            loading: false,
        });
    }
}
//# sourceMappingURL=fetch.js.map