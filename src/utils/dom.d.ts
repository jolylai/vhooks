import type { Ref } from "vue";
declare type TargetValue<T> = T | undefined | null;
export declare type BasicTarget<T extends TargetElement = Element> = TargetValue<T> | (() => T) | Ref<T>;
export declare type TargetElement = HTMLElement | Element | Window | Document;
export declare function getTargetElement<T extends TargetElement>(target: BasicTarget<T>, defaultTarget?: T): TargetValue<T>;
export {};
