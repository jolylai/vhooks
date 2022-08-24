type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;
type CachedData = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
};

const cache = new Map<CachedKey, CachedData>();

const getCache = (key: CachedKey) => {
  return cache.get(key);
};

const setCache = (
  key: CachedKey,
  cacheTime: number,
  data: any,
  params: any
) => {
  const currentCache = cache.get(key);

  // 清楚定时器
  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer: Timer | undefined = undefined;

  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }

  cache.set(key, { data, params, timer, time: Date.now() });
};

export { getCache, setCache };
