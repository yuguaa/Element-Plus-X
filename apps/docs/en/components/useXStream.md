# useXStream 🌱

## Introduction

This hook function allows users to more conveniently control **streaming requests**. It provides `initiate request`, `interrupt request`, returns `loading` request state, returns SSE protocol `real-time data stream`, and returns request `error` information.

::: info
Currently only tested SSE and SIP protocol requests, other protocol requests still need testing. If you have good ideas and discoveries, welcome to join the discussion group 👨‍👩‍👧‍👦 **[Discussion Group](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81)**, get in touch with us, welcome to discuss solutions, submit issues and PRs. Please read the submission specifications 👉 **[Development Documentation](https://element-plus-x.com/guide/develop.html)**
:::

## Code Examples

<demo src="../../components/useXStream/demos/useSSE.vue"></demo>

<demo src="../../components/useXStream/demos/useSIP.vue"></demo>

::: warning
The parsing rules of this hooks are also consistent with ant-design-x, all processed internally. **Please feel free to switch and use**

sseEventPart
**`'event: message\ndata: {"id":"${i}","content":"${contentChunks[i]}"}\n\n'`**

```ts
// Default stream separator (uses two newlines to separate one stream data)
const DEFAULT_STREAM_SEPARATOR = '\n\n';
// Default part separator (uses single newline to wrap current data)
const DEFAULT_PART_SEPARATOR = '\n';
// Default key-value pair separator (uses colon)
const DEFAULT_KV_SEPARATOR = ':';
```

:::

## Return Hooks

| Property    | Description                                 | Type                                          |
| ----------- | ------------------------------------------- | --------------------------------------------- |
| startStream | Start streaming request mode interface      | `({readableStream, transformStream}) => void` |
| cancel      | Interrupt streaming request                 | `() => void`                                  |
| loading     | Whether currently requesting streaming data | `boolean`                                     |
| data        | Real-time returned streaming data           | `string`                                      |
| error       | Streaming request error information         | `string`                                      |
