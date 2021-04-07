import { ref, toRaw } from "vue";

function useRequest(service, options) {
  const {
    formatResult,
    manual,
    defaultParams,
    initialData,
    onSuccess
  } = options;

  const data = ref(initialData);
  const loading = ref(false);
  const error = ref();
  const params = ref(defaultParams);

  const run = async (...parameter) => {
    loading.value = true;
    try {
      const response = await service(...parameter)
        .then(response => {
          if (typeof formatResult === "function") {
            return formatResult(response);
          }
          return response;
        })
        .then(response => {
          if (typeof onSuccess === "function") {
            onSuccess(response);
          }
          return response;
        });
      params.value = parameter;
      data.value = response;

      return response;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // 如果 manual=false ，自动执行 run 的时候，默认带上的参数
  if (!manual) {
    if (Array.isArray(defaultParams)) {
      run(...defaultParams);
    } else {
      run();
    }
  }

  const refresh = () => run(...toRaw(params.value));

  return {
    data,
    loading,
    run,
    error,
    params,
    refresh
  };
}

export default useRequest;
