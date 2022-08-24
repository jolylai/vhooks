import { reactive } from "vue";
import { FetchState, Service, Options, PluginReturn, Subscribe } from "./types";

export default class Fetch<TData, TParams extends any[]> {
  count: number = 0;

  pluginImpls: PluginReturn<TData, TParams>[] = [];

  state = reactive<FetchState<TData, TParams>>({
    loading: false,
    data: undefined,
    params: undefined,
    error: undefined,
  });

  setState(s: Partial<FetchState<TData, TParams>>) {
    Object.assign(this.state, s);
  }

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe,
    public initState: Partial<FetchState<TData, TParams>>
  ) {
    this.setState({
      loading: !options.manual,
      ...initState,
    });
  }

  runPluginHandler(
    event: keyof PluginReturn<TData, TParams>,
    ...params: any[]
  ) {
    const r = this.pluginImpls
      // @ts-ignore
      .map((plugin) => plugin[event]?.(...params))
      .filter(Boolean);

    return Object.assign({}, ...r);
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      console.log("error: ", error);
    });
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count++;

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler("onBefore", ...params);

    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    if (returnNow) {
      return Promise.resolve(state.data);
    }

    this.options.onBefore?.(params);

    try {
      let { servicePromise } = this.runPluginHandler(
        "onRequest",
        this.service,
        params
      );

      if (!servicePromise) {
        servicePromise = this.service(...params);
      }

      let res = await servicePromise;

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      });

      this.options.onSuccess?.(res, params);
      this.runPluginHandler("onSuccess", res, params);

      this.options.onFinally?.(params, res, undefined);
      this.runPluginHandler("onFinally", params, res, undefined);

      return res;
    } catch (error) {
      // 保留上次请求成功的结果

      this.setState({
        error: error as Error,
        loading: false,
      });

      this.options.onError?.(error as Error, params);
      this.runPluginHandler("onError", error, params);
      this.options.onFinally?.(params, undefined, error as Error);
      this.runPluginHandler("onFinally", params, undefined, error);
      // 抛出错误用户自行处理
      throw error;
    }
  }

  refresh() {
    this.run(...(this.state.params as TParams));
  }

  refreshAsync() {
    this.runAsync(...(this.state.params as TParams));
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    let targetData: TData | undefined;
    if (typeof data === "function") {
      // @ts-ignore
      targetData = data(this.state.data);
    } else {
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
