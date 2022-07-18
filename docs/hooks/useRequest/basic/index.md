## 默认请求

默认情况下，useRequest 第一个参数是一个异步函数，在组件初始化时，会自动执行该异步函数。同时自动管理该异步函数的 loading , data , error 等状态。

<script setup>
  import basic from './demos/basic.vue'
  import ManualRun from './demos/manual-run.vue'
  import ManualRunAsync from './demos/manual-run-async.vue'
  import LifeCycle from './demos/life-cycle.vue'
  import Refresh from './demos/refresh.vue'
  import Mutate from './demos/mutate.vue'
</script>

<basic />

## 手动触发

如果设置了 options.manual = true，则 useRequest 不会默认执行，需要通过 run 或者 runAsync 来触发执行。

<manual-run />

run 是一个普通的同步函数，我们会自动捕获异常，你可以通过 options.onError 来处理异常时的行为。

<manual-run-async />

runAsync 是一个返回 Promise 的异步函数，如果使用 runAsync 来调用，则意味着你需要自己捕获异常。

## 生命周期

useRequest 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。

- `onBefore`：请求之前触发
- `onSuccess`：请求成功触发
- `onError`：请求失败触发
- `onFinally`：请求完成触发

<life-cycle />

## 刷新（重复上一次请求）

useRequest 提供了 refresh 和 refreshAsync 方法，使我们可以使用上一次的参数，重新发起请求。

假如在读取用户信息的场景中

我们读取了 ID 为 1 的用户信息 run(1)
我们通过某种手段更新了用户信息
我们想重新发起上一次的请求，那我们就可以使用 refresh 来代替 run(1)，这在复杂参数的场景中是非常有用的

<refresh />

## 立即变更数据

useRequest 提供了 mutate, 支持立即修改 useRequest 返回的 data 参数。

mutate 的用法与 React.setState 一致，支持 mutate(newData) 和 mutate((oldData) => newData) 两种写法。

下面的示例，我们演示了一种 mutate 的应用场景。

我们修改了用户名，但是我们不希望等编辑接口调用成功之后，才给用户反馈。而是直接修改页面数据，同时在背后去调用修改接口，等修改接口返回之后，另外提供反馈。

<mutate />

## 取消请求

useRequest 提供了 cancel 函数，可以取消当前正在进行的请求。同时 useRequest 会在以下时机自动取消当前请求：

- 组件卸载时，取消正在进行的请求
- 竞态取消，当上一次请求还没返回时，又发起了下一次请求，则会取消上一次请求
