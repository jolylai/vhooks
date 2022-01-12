import { watch } from "vue";
import { Plugin } from "../types";

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { refreshDeps = [] }
) => {
  // ref  refs getter
  watch(refreshDeps, () => {
    fetchInstance.refresh();
  });

  return {};
};

export default useAutoRunPlugin;
