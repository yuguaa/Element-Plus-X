<docs>
---
title: Component States
---

You can implement component states through simple properties

::: info
- Through the `loading` property, you can control whether the input is loading.
- Through the `readOnly` property, you can control whether the input is editable.
- Through the `disabled` property, you can control whether the input is disabled.
- Through the `clearable` property, you can control whether the input shows a delete button for clearing.
- Through the `inputWidth` property, you can control the input width. Default is `100%`.
:::
</docs>

<script setup lang="ts">
const senderReadOnlyValue = ref(`Read-only: 💌 Welcome to Element-Plus-X ~`);
const senderClearableValue = ref(`Clearable: 💌 Welcome to Element-Plus-X ~`);

function handleSubmit(value: string) {
  console.log(value);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Sender loading placeholder="Loading..." @submit="handleSubmit" />
    <Sender v-model="senderReadOnlyValue" read-only @submit="handleSubmit" />
    <Sender value="Disabled: 💌 Welcome to Element-Plus-X ~" disabled @submit="handleSubmit" />
    <Sender v-model="senderClearableValue" clearable @submit="handleSubmit" />
    <Sender style="width: fit-content;" value="Input max width: 💌 Welcome to Element-Plus-X ~" input-width="150px" @submit="handleSubmit" />
  </div>
</template>
