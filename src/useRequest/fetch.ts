import { reactive } from "vue";
import { FetchState, Service, Options } from "./types";

export default class Fetch<TData, TParams extends any[]> {
  count: number = 0;

  state: FetchState<TData, TParams> = reactive({
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  });

  setState(s: Partial<FetchState<TData, TParams>>) {
    Object.assign(this.state, s);
  }

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>
  ) {}

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {});
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count++;

    this.setState({
      loading: true,
      params,
    });

    this.options.onBefore?.(params);

    try {
      let res = await this.service(...params);

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      });

      this.options.onSuccess?.(res, params);

      this.options.onFinally?.(params, res, undefined);

      return res;
    } catch (error) {
      // 保留上次请求成功的结果

      this.setState({
        error: error as Error,
        loading: false,
      });

      this.options.onError?.(error as Error, params);
      this.options.onFinally?.(params, undefined, error as Error);
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
}
