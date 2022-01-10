import { toRef } from "vue";
import Fetch from "./fetch";
import { Service, Options } from "./types";

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  userOptions?: Options<TData, TParams>
) {
  const { manual = false, ...options } = userOptions || {};

  const fetchInstance = new Fetch(service, options);

  const params = fetchInstance.state.params || options.defaultParams || [];

  if (manual === false) {
    fetchInstance.run(...(params as TParams));
  }

  return {
    loading: toRef(fetchInstance.state, "loading"),
    data: toRef(fetchInstance.state, "data"),
    error: toRef(fetchInstance.state, "error"),
    params: toRef(fetchInstance.state, "params") || [],
    // ？ bind
    // @ts-ignore
    run: fetchInstance.run.bind(fetchInstance, ...params),
    // @ts-ignore
    runAsync: fetchInstance.runAsync.bind(fetchInstance, ...params),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
  };
}

export default useRequest;
