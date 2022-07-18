import { FetchState, Service, Options, PluginReturn, Subscribe } from "./types";
export default class Fetch<TData, TParams extends any[]> {
    service: Service<TData, TParams>;
    options: Options<TData, TParams>;
    subscribe: Subscribe;
    initState: Partial<FetchState<TData, TParams>>;
    count: number;
    pluginImpls: PluginReturn<TData, TParams>[];
    state: FetchState<TData, TParams>;
    setState(s: Partial<FetchState<TData, TParams>>): void;
    constructor(service: Service<TData, TParams>, options: Options<TData, TParams>, subscribe: Subscribe, initState: Partial<FetchState<TData, TParams>>);
    runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...params: any[]): any;
    run(...params: TParams): void;
    runAsync(...params: TParams): Promise<TData>;
    refresh(): void;
    refreshAsync(): void;
    mutate(data?: TData | ((oldData?: TData) => TData | undefined)): void;
    cancel(): void;
}
