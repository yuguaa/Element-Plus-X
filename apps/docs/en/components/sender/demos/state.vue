<docs>
---
title: Component States
---

You can implement component states through simple properties

::: info
- Through the `loading` property, you can control whether the input box is loading.
- Through the `readOnly` property, you can control whether the input box is editable.
- Through the `disabled` property, you can control whether the input box is disabled.
- Through the `clearable` property, you can control whether the input box shows a delete button for clearing.
- Through the `inputWidth` property, you can control the width of the input box. Default is `100%`.
:::
</docs>

<script setup lang="ts">
const senderReadOnlyValue = ref(
  `Read-only: 💌 Welcome to use Element-Plus-X ~`
);
const senderClearableValue = ref(
  `Clearable: 💌 Welcome to use Element-Plus-X ~`
);

function handleSubmit(value: string) {
  console.log(value);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Sender loading placeholder="Loading..." @submit="handleSubmit" />
    <Sender v-model="senderReadOnlyValue" read-only @submit="handleSubmit" />
    <Sender
      value="Disabled: 💌 Welcome to use Element-Plus-X ~"
      disabled
      @submit="handleSubmit"
    />
    <Sender v-model="senderClearableValue" clearable @submit="handleSubmit" />
    <Sender
      style="width: fit-content"
      value="Input box max width: 💌 Welcome to use Element-Plus-X ~"
      input-width="150px"
      @submit="handleSubmit"
    />
  </div>
</template>
