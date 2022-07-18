import { watch } from "vue";
// support refreshDeps & ready
const useAutoRunPlugin = (fetchInstance, { refreshDeps = [] }) => {
    // ref  refs getter
    watch(refreshDeps, () => {
        fetchInstance.refresh();
    });
    return {};
};
export default useAutoRunPlugin;
//# sourceMappingURL=useAutoRunPlugin.js.map