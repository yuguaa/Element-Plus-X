<docs>
---
title: options 提及选项列表
---

- 通过 `options` 属性，可以传入一个数组，用于定义提及选项列表。
- 通过 `triggerStrings` 属性 触发字段的前缀。 这里和 `Sender` 组价不同，这里的字符串长度必须且只能为 1。

```ts
// options 提及选项列表的 类型定义
interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
  [key: string]: any
}
```

::: info
光设置 `options` 属性，不能开启提及功能。需要 `triggerStrings` 属性来开启提及功能。
:::
</docs>

<script setup lang="ts">
const senderValue = ref('')

const options = [
  {
    value: 'value1',
    label: '选项1',
  },
  {
    value: 'value2',
    label: '选项2',
    disabled: true,
  },
  {
    value: 'value3',
    label: '选项3',
  },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue"
      placeholder="输入 / 触发指令弹框"
      clearable
      :options="options"
      :trigger-strings="['/']"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
