import { reactive } from "vue";
import Fetch from "./fetch";
import { Service, Options } from "./types";

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  userOptions?: Options<TData, TParams>
) {
  const { manual = false, ...options } = userOptions || {};

  const state = reactive({
    data: undefined,
    loading: false,
    error: null,
  });

  const fetchInstance = new Fetch(service, options);

  if (manual === false) {
    const params = fetchInstance.state.params || options.defaultParams || [];
    fetchInstance.run(...(params as TParams));
  }

  return state;
}

export default useRequest;
