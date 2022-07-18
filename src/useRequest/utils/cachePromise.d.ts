declare type CachedKey = string | number;
export declare const getCachePromise: (cacheKey: CachedKey) => Promise<any> | undefined;
export declare const setCachePromise: (cacheKey: CachedKey, promise: Promise<any>) => void;
export {};
