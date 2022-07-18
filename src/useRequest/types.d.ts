import type { WatchSource } from "vue";
import Fetch from "./fetch";
export declare type Subscribe = () => void;
export interface Options<TData, TParams extends any[]> {
    manual?: boolean;
    onBefore?: (params: TParams) => void;
    onSuccess?: (data: TData, params: TParams) => void;
    onError?: (e: Error, params: TParams) => void;
    onFinally?: (params: TParams, data?: TData, e?: Error) => void;
    defaultParams?: TParams;
    refreshDeps?: WatchSource;
    refreshDepsAction?: () => void;
    loadingDelay?: number;
    pollingInterval?: number;
    pollingWhenHidden?: boolean;
    refreshOnWindowFocus?: boolean;
    focusTimespan?: number;
    debounceWait?: number;
    debounceLeading?: boolean;
    debounceTrailing?: boolean;
    debounceMaxWait?: number;
    throttleWait?: number;
    throttleLeading?: boolean;
    throttleTrailing?: boolean;
    cacheKey?: string;
    cacheTime?: number;
    staleTime?: number;
    retryCount?: number;
    retryInterval?: number;
    ready?: boolean;
}
export declare type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;
export interface FetchState<TData, TParams extends any[]> {
    loading: boolean;
    params?: TParams;
    data?: TData;
    error?: Error;
}
export interface PluginReturn<TData, TParams extends any[]> {
    onBefore?: (params: TParams) => ({
        stopNow?: boolean;
        returnNow?: boolean;
    } & Partial<FetchState<TData, TParams>>) | void;
    onRequest?: (service: Service<TData, TParams>, params: TParams) => {
        servicePromise?: Promise<TData>;
    };
    onSuccess?: (data: TData, params: TParams) => void;
    onError?: (e: Error, params: TParams) => void;
    onFinally?: (params: TParams, data?: TData, e?: Error) => void;
    onCancel?: () => void;
    onMutate?: (data: TData) => void;
}
export declare type Plugin<TData, TParams extends any[]> = {
    (fetchInstance: Fetch<TData, TParams>, options: Options<TData, TParams>): PluginReturn<TData, TParams>;
    onInit?: (options: Options<TData, TParams>) => Partial<FetchState<TData, TParams>>;
};
