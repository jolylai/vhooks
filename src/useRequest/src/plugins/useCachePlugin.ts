import * as cache from "../utils/cache";
import * as cachePromise from "../utils/cachePromise";
import { Plugin } from "../types";
import { ref } from "vue";

export type CacheOptions = {
  cacheKey?: string;
};

const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    // setCache: customSetCache,
    // getCache: customGetCache,
  }
) => {
  const currentPromiseRef = ref();
  if (!cacheKey) return {};

  return {
    onBefore(params) {
      const cacheData = cache.getCache(cacheKey);

      if (!cacheData) {
        return {};
      }

      // 缓存新鲜，直接使用缓存，不重新发送请求
      if (Date.now() - cacheData.time > staleTime) {
        return {
          data: cacheData.data,
          loading: false,
          returnNow: true,
        };
      }

      return {
        data: cacheData?.data,
      };
    },
    onRequest: (service, args) => {
      let servicePromise = cachePromise.getCachePromise(cacheKey);

      // 防止多次重复发送
      if (servicePromise && servicePromise !== currentPromiseRef.value) {
        return { servicePromise };
      }

      servicePromise = service(...args);
      currentPromiseRef.value = servicePromise;
      cachePromise.setCachePromise(cacheKey, servicePromise);
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      // 请求成功设置缓存
      if (cacheKey) {
        cache.setCache(cacheKey, cacheTime, {
          data,
          params,
          time: new Date().getTime(),
        });
      }
    },
  };
};

export default useCachePlugin;
