<docs>
---
title: triggerStrings Trigger Field
---

Trigger field through the `triggerStrings` property. This is different from the `Sender` component, where the string length must be and can only be 1. Type is `Array<string>`.

If you need to trigger through **multiple strings**, you can use the `@search` event to control the display of the floating layer content.

::: info
Just setting the `options` property cannot enable the mention functionality. The `triggerStrings` property is needed to enable the mention functionality.
:::
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';

const senderValue = ref('');

const MOCK_DATA: Record<string, string[]> = {
  '@': [
    'Element-Plus-X',
    'HeJiaYue520',
    'JsonLee12138',
    'lisentowind',
    'ZRMYDYCG'
  ],
  '#': ['1.0', '2.0', '3.0', '4.0', '5.0']
};

const options = ref<MentionOption[]>([]);

function handleSearch(_: string, prefix: string) {
  console.log('handleSearch', _, prefix);

  options.value = (MOCK_DATA[prefix] || []).map(value => ({
    value
  }));
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue"
      placeholder="Input @ and # to trigger popup"
      clearable
      :options="options"
      :trigger-strings="['@', '#']"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss"></style>
