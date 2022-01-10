// import { reactive } from "vue";
import { FetchState, Service, Options } from "./types";

export default class Fetch<TData, TParams extends any[]> {
  count: number = 0;

  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>
  ) {}

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      console.log("error: ", error);
    });
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count++;

    try {
      console.log("this.service: ", this.service);
      let res = await this.service(...params);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
