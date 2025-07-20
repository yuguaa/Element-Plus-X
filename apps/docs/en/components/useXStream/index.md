# useXStream 🌱

## Introduction

This hook function allows users to more conveniently control **streaming requests**. It provides `initiate request`, `abort request`, returns `loading` request status, returns SSE protocol `real-time data stream`, and returns request `error` information.

::: info
Currently only SSE and SIP protocol requests have been tested. Other protocol requests still need testing. If you have good ideas and discoveries, welcome to join the discussion group 👨‍👩‍👧‍👧 **[Discussion Group](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81)** to get in touch with us. Welcome to discuss solutions, submit issues and PRs. Please read the submission guidelines 👉 **[Development Documentation](https://element-plus-x.com/guide/develop.html)**
:::

## Code Demo

<demo src="./demos/useSSE.vue"></demo>

<demo src="./demos/useSIP.vue"></demo>

::: warning
The parsing rules for this hooks are also consistent with ant-design-x, all handled internally. **Feel free to switch and use**

sseEventPart
**`'event: message\ndata: {"id":"${i}","content":"${contentChunks[i]}"}\n\n'`**

```ts
// Default data stream separator (uses two newlines to separate one stream data)
const DEFAULT_STREAM_SEPARATOR = '\n\n';
// Default segment separator (uses single newline to wrap current data)
const DEFAULT_PART_SEPARATOR = '\n';
// Default key-value pair separator (uses colon)
const DEFAULT_KV_SEPARATOR = ':';
```

:::

## Return Hook

| Property Name | Description                         | Type                                          |
| ------------- | ----------------------------------- | --------------------------------------------- |
| startStream   | Start request stream mode API       | `({readableStream, transformStream}) => void` |
| cancel        | Abort streaming request             | `() => void`                                  |
| loading       | Whether requesting streaming data   | `boolean`                                     |
| data          | Real-time returned streaming data   | `string`                                      |
| error         | Streaming request error information | `string`                                      |
