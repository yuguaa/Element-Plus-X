# useSend & XRequest (XRequest is deprecated, recommend using hook-fetch) 🌳

## Background Introduction

Based on `ant-design-x`'s `XRequest` and `XStream`, we conducted in-depth learning and discussion.

After replicating `XStream`, for more general scenarios of **controlling request data** and **aborting requests**, we refactored `ant-design-x`'s `XRequest`, splitting it into **`Frontend Abort Scenario`** and **`Request Abort Scenario`**

The two scenarios correspond to:

- hooks `useSend` -- Frontend abort scenario
- utility class `XRequest` -- Request abort scenario

**🍒 Both can be used separately, and combined use can achieve `useXStream`. Below are their usage examples**

## Code Demo

Just pass a `start method` to get the corresponding **loading** state and **finish** method.

Single control, code doesn't exceed 10 lines

<demo src="./demos/useSend-base.vue"></demo>

With control over the state, we can easily customize loading states for some buttons

<demo src="./demos/useSend-use.vue"></demo>

After knowing the basic usage of `useSend`, since there's control over `frontend loading state`, there must be `request state` control. Next, let's introduce the simple usage of the utility class `XRequest`.

<demo src="./demos/XRequest-base.vue"></demo>

::: warning
Here, for your convenience in reading the documentation and seeing the requests, we simply wrote a node service. In this case, 💩 please don't click frantically. It will make frantic requests to the interface, please be moderate. 💩 We didn't do any security processing 🙉 because we won't

This can also help you better understand the usage of the utility class `XRequest`, which only handles `requests`.
:::

<demo src="./demos/XRequest-use.vue"></demo>

Below, let's introduce the combined usage of `useSend` and `useSendStream`

**Use `useSend` to control frontend state, use `useSendStream` to control backend state**

<demo src="./demos/useSend-XRequest.vue"></demo>

## Configuration Parameters and Return Hooks

#### - `useSend`

- **Parameters**

| Parameter Name | Description  | Type         |
| -------------- | ------------ | ------------ |
| sendHandler    | send method  | `() => void` |
| abortHandler   | abort method | `() => void` |

- **Return Value**

| Property Name | Description                            | Type         |
| ------------- | -------------------------------------- | ------------ |
| send          | Start loading state, supports callback | `() => void` |
| abort         | Abort loading state, supports callback | `() => void` |
| loading       | Loading state                          | `boolean`    |
| finish        | End loading state                      | `() => void` |

#### - `XRequest`

- **Parameters**

| Config Parameter Name | Description                                               | Type                                                   |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| baseURL               | Base request URL                                          | `string`                                               |
| type                  | Request type, default SSE                                 | `BaseSSEProps<T = string>.type?: SSEType \| undefined` |
| transformer           | transformer callback, here you can parse and process data | `(e: string) => string \| undefined`                   |
| onMessage             | Callback during request                                   | `(msg: string \| undefined) => void`                   |
| onError               | Error callback                                            | `(es: EventSource, e: Event) => void`                  |
| onOpen                | SSE Open state                                            | `SSEWithSSEProps.onOpen?: (() => void) \| undefined`   |
| onAbort               | Callback when request is aborted                          | `(messages: (string \| undefined)[]) => void`          |
| onFinish              | Callback when request ends                                | `(data: (string \| undefined)[]) => void`              |

- **Return Value**

| Property Name | Description             | Type                                                                                                                                     |
| ------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| send          | Start request interface | `XRequest<string \| undefined>.send(url: string, options?: EventSourceInit \| BaseFetchOptions): Promise<XRequest<string \| undefined>>` |
| abort         | Abort request           | `XRequest<string \| undefined>.abort(): void`                                                                                            |

## Summary

`useSend` allows users to more conveniently display and control **loading** state on the frontend. It's a packaging solution for `loading` state.
Accepts a `send callback` and an `abort callback`, provides `send`, `abort loading state`, `end loading state`, and returns `loading` state.

`XRequest` is a request packaging that provides a more convenient request method, accepts a `request configuration`, and returns a `request response` object.
