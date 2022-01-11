import * as cache from "../utils/cache";

import { Plugin } from "../types";

const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { cacheKey, cacheTime = 5 * 60 * 1000, staleTime = 0 }
) => {
  if (!cacheKey) return {};

  return {
    onBefore: () => {
      const cacheData = cache.getCache(cacheKey);
      // 首次未缓存
      if (!cacheData) return {};

      if (Date.now() - cacheData.time <= staleTime) {
        // 当前缓存新鲜，无需再请求
        return {
          loading: false,
          data: cacheData.data,
          returnNow: true,
        };
      } else {
        return {
          data: cacheData.data,
        };
      }
    },
    onSuccess: (data, params) => {
      cache.setCache(cacheKey, cacheTime, data, params);
    },
  };
};

export default useCachePlugin;
