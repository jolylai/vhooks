# 缓存 & SWR

你也可以通过 options.cacheTime 设置数据缓存时间，超过该时间，我们会清空该条缓存数据。

## 缓存

- 缓存怎么存储
- 跟新缓存
- 清除缓存

#### 缓存数据

```ts
type CachedKey = string | number;
type CachedData = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
};

export const cache = new Map<CachedKey, CachedData>();

export const getCache = (key: CachedKey) => {
  return cache.get(key);
};

export const setCache = (key: CachedKey, data: CachedData) => {
  cache.set(key, data);
};

export const clearCache = (key?: CachedKey | CachedKey[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((key) => cache.delete(key));
  } else {
    cache.clear();
  }
};
```

## SWR

如果设置了 options.cacheKey，useRequest 会将当前请求成功的数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR(St) 的能力。

下面的示例，我们设置了 cacheKey，在组件第二次加载时，会优先返回缓存的内容，然后在背后重新发起请求。你可以通过点击按钮来体验效果。

<demo src='./demos/swr-demo.vue' />

```ts
import * as cache from "../utils/cache";
import { Plugin } from "../types";

export type CacheOptions = {
  cacheKey?: string;
};

const useCachePlugin: Plugin<any, any[]> = (fetchInstance, { cacheKey }) => {
  if (!cacheKey) return {};

  return {
    onBefore() {
      const cacheData = cache.getCache(cacheKey);

      if (!cacheData) {
        return {};
      }

      return {
        data: cacheData?.data,
      };
    },
  };
};
```

## 数据保持新鲜

你可以通过 options.staleTime 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。

通过设置 staleTime，我们可以指定数据新鲜时间，在这个时间内，不会重新发起请求。下面的示例设置了 5s 的新鲜时间，你可以通过点击按钮来体验效果

<demo src='./demos/stale-wrapper.vue' />

对于过期的缓存

## 数据共享

<demo src='./demos/share.vue' />

同一个 cacheKey 的内容，在全局是共享的，这会带来以下几个特性

1. 请求 Promise 共享，相同的 cacheKey 同时只会有一个在发起请求，后发起的会共用同一个请求 Promise

```ts
import * as cachePromise from "../utils/cachePromise";
import { Plugin } from "../types";

const useCachePlugin: Plugin<any, any[]> = (fetchInstance, { cacheKey }) => {
  return {
    onRequest: (service, args) => {
      let servicePromise = cachePromise.getCachePromise(cacheKey);

      // 共用同一个请求 Promise
      if (servicePromise && servicePromise !== currentPromiseRef.value) {
        return { servicePromise };
      }

      servicePromise = service(...args);
      currentPromiseRef.value = servicePromise;
      cachePromise.setCachePromise(cacheKey, servicePromise);
      return { servicePromise };
    },
  };
};
```

- 数据同步，任何时候，当我们改变其中某个 cacheKey 的内容时，其它相同 cacheKey 的内容均会同步

下面的示例中，初始化时，两个组件只会发起一个请求。并且两篇文章的内容永远是同步的。

## 参数缓存

缓存的数据包括 data 和 params，通过 params 缓存机制，我们可以记忆上一次请求的条件，并在下次初始化。

下面的示例中，我们可以从缓存的 params 中初始化 keyword

<!--
<a-space direction="vertical" style="margin-bottom: 16px">
  <a-button @click="toggleParamsState">show/hide</a-button>
  <params v-if='paramsState' />
</a-space> -->
