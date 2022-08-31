type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;
type CachedData = {
  data: any;
  params: any;
  time: number;
};

interface RecordData extends CachedData {
  timer: Timer | undefined;
}

export const cache = new Map<CachedKey, RecordData>();

export const getCache = (key: CachedKey) => {
  return cache.get(key);
};

export const setCache = (
  key: CachedKey,
  cacheTime: number,
  cachedData: CachedData
) => {
  const currentCache = cache.get(key);

  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer: Timer | undefined = undefined;
  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }

  cache.set(key, { ...cachedData, timer });
};

export const clearCache = (key?: CachedKey | CachedKey[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((key) => cache.delete(key));
  } else {
    cache.clear();
  }
};
