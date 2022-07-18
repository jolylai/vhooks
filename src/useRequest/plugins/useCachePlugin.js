import { ref } from "vue";
import * as cache from "../utils/cache";
import * as cachePromise from "../utils/cachePromise";
const useCachePlugin = (fetchInstance, { cacheKey, cacheTime = 5 * 60 * 1000, staleTime = 0 }) => {
    const currentPromiseRef = ref();
    if (!cacheKey)
        return {};
    const cacheData = cache.getCache(cacheKey);
    console.log("cacheData: ", cacheData);
    fetchInstance.state.data = cacheData === null || cacheData === void 0 ? void 0 : cacheData.data;
    fetchInstance.state.params = cacheData === null || cacheData === void 0 ? void 0 : cacheData.params;
    return {
        onBefore: () => {
            const cacheData = cache.getCache(cacheKey);
            console.log("cacheData: ", cacheData);
            // 首次未缓存
            if (!cacheData)
                return {};
            if (Date.now() - cacheData.time <= staleTime) {
                // 当前缓存新鲜，无需再请求
                return {
                    loading: false,
                    data: cacheData.data,
                    returnNow: true,
                };
            }
            else {
                return {
                    data: cacheData.data,
                };
            }
        },
        onRequest: (service, params) => {
            let servicePromise = cachePromise.getCachePromise(cacheKey);
            // 请求 Promise 共享，相同的 cacheKey 同时只会有一个在发起请求，后发起的会共用同一个请求 Promise
            if (servicePromise && servicePromise !== currentPromiseRef.value) {
                return { servicePromise };
            }
            servicePromise = service(...params);
            currentPromiseRef.value = servicePromise;
            cachePromise.setCachePromise(cacheKey, servicePromise);
            return { servicePromise };
        },
        onSuccess: (data, params) => {
            if (cacheKey) {
                cache.setCache(cacheKey, cacheTime, data, params);
            }
        },
    };
};
export default useCachePlugin;
//# sourceMappingURL=useCachePlugin.js.map