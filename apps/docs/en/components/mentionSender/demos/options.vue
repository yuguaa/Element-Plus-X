<docs>
---
title: options Mention Option List
---

- Through the `options` property, you can pass an array to define the mention option list.
- Through the `triggerStrings` property, the prefix of the trigger field. This is different from the `Sender` component, where the string length must be exactly 1.

```ts
// Type definition for options mention option list
interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
  [key: string]: any
}
```

::: info
Setting only the `options` property cannot enable the mention functionality. The `triggerStrings` property is needed to enable the mention functionality.
:::
</docs>

<script setup lang="ts">
const senderValue = ref('');

const options = [
  {
    value: 'value1',
    label: 'Option 1'
  },
  {
    value: 'value2',
    label: 'Option 2',
    disabled: true
  },
  {
    value: 'value3',
    label: 'Option 3'
  }
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue"
      placeholder="Input / to trigger directive popover"
      clearable
      :options="options"
      :trigger-strings="['/']"
    />
  </div>
</template>

<style scoped lang="scss"></style>
