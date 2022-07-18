const cache = new Map();
const getCache = (key) => {
    return cache.get(key);
};
const setCache = (key, cacheTime, data, params) => {
    const currentCache = cache.get(key);
    // 清楚定时器
    if (currentCache === null || currentCache === void 0 ? void 0 : currentCache.timer) {
        clearTimeout(currentCache.timer);
    }
    let timer = undefined;
    if (cacheTime > -1) {
        timer = setTimeout(() => {
            cache.delete(key);
        }, cacheTime);
    }
    cache.set(key, { data, params, timer, time: Date.now() });
};
export { getCache, setCache };
//# sourceMappingURL=cache.js.map