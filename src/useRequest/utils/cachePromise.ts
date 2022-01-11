type CachedKey = string | number;
const cachePromise = new Map<CachedKey, Promise<any>>();

export const getCachePromise = (cacheKey: CachedKey) => {
  return cachePromise.get(cacheKey);
};

export const setCachePromise = (cacheKey: CachedKey, promise: Promise<any>) => {
  cachePromise.set(cacheKey, promise);

  promise.finally(() => {
    console.log("finally: promise");
    cachePromise.delete(cacheKey);
  });
};
