<docs>
---
title: trigger-popover-offset Popover Window Offset
---

You can set the offset of the popover from the window through the `triggerPopoverOffset` property. Default value is 20, representing 20px.
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';

const senderValue1 = ref('');

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
  options.value = (MOCK_DATA[prefix] || []).map(value => ({
    value
  }));
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue1"
      placeholder="Input @ and / to trigger directive popover, current offset 50px"
      clearable
      :options="options"
      :trigger-strings="['@', '/']"
      :whole="true"
      trigger-popover-placement="bottom"
      :trigger-popover-offset="50"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss"></style>
