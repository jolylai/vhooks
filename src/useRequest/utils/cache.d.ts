declare type Timer = ReturnType<typeof setTimeout>;
declare type CachedKey = string | number;
declare type CachedData = {
    data: any;
    params: any;
    timer: Timer | undefined;
    time: number;
};
declare const getCache: (key: CachedKey) => CachedData | undefined;
declare const setCache: (key: CachedKey, cacheTime: number, data: any, params: any) => void;
export { getCache, setCache };
