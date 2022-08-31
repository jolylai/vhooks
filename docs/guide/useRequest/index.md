## fetch

```ts
import { reactive } from "vue";

export type FetchState<TData, TParams extends any[]> = {
  loading: boolean;
  data?: TData;
  params?: TParams;
  error?: Error;
};

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>;

export default class Fetch<TData, TParams extends any[]> {
  constructor(public service: Service<TData, TParams>) {}

  state = reactive<FetchState<TData, TParams>>({
    loading: false,
    data: undefined,
    params: undefined,
    error: undefined,
  });

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    Object.assign(this.state, s);
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.setState({
      loading: true,
      params,
    });
    try {
      const res = await this.service(...params);

      this.setState({
        loading: false,
        data: res,
      });

      return res;
    } catch (error) {
      this.setState({
        loading: false,
        error: error as Error,
      });

      throw error;
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      console.log("error: ", error);
    });
  }
}
```

run 与 runAsync 的区别在于：

- run 是一个普通的同步函数，我们会自动捕获异常，你可以通过 options.onError 来处理异常时的行为。
- runAsync 是一个返回 Promise 的异步函数，如果使用 runAsync 来调用，则意味着你需要自己捕获异常。
