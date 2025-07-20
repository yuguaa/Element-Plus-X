<docs>
---
title: trigger-popover-placement Directive Popover Placement
---

Set the popup direction through `trigger-popover-placement`. Default is `'top'`, can be set to `'bottom'`. Currently only supports `'top'` and `'bottom'` two types.
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';

const senderValue1 = ref('');

const MOCK_DATA: Record<string, string[]> = {
  '@': ['Element-Plus-X', 'HeJiaYue520', 'JsonLee12138', 'lisentowind', 'ZRMYDYCG'],
  '#': ['1.0', '2.0', '3.0', '4.0', '5.0'],
};

const options = ref<MentionOption[]>([]);

function handleSearch(_: string, prefix: string) {
  options.value = (MOCK_DATA[prefix] || []).map(value => ({
    value,
  }));
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ and / to trigger directive popover"
      clearable
      :options="options"
      :trigger-strings="['@', '/']"
      :whole="true"
      trigger-popover-placement="bottom"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
