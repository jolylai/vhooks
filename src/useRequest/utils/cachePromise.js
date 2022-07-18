const cachePromise = new Map();
export const getCachePromise = (cacheKey) => {
    return cachePromise.get(cacheKey);
};
export const setCachePromise = (cacheKey, promise) => {
    cachePromise.set(cacheKey, promise);
    promise.finally(() => {
        console.log("finally: promise");
        cachePromise.delete(cacheKey);
    });
};
//# sourceMappingURL=cachePromise.js.map