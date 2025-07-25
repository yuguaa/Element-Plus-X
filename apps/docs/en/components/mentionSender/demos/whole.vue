<docs>
---
title: whole Delete as Whole
---

- Set the `whole` property to `true`, when you press the backspace key, the `mention` area here will be deleted as a whole.

- Set the `check-is-whole` property to customize the check logic. When you need to do multiple conditions, you can use the `check-is-whole` property to customize the check logic.

- The check-is-whole property is not an event, the type is (pattern: string, prefix: string) => boolean, returning `true` means the match is successful and will be deleted as a whole, returning `false` means the match fails and will not be deleted as a whole. Default is `true`
</docs>

<script setup lang="ts">
import type { MentionOption } from 'vue-element-plus-x/types/MentionSender';

const senderValue1 = ref('');
const senderValue2 = ref('');

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

function checkIsWhole(pattern: string, prefix: string) {
  console.log('checkIsWhole', pattern, prefix);
  return (MOCK_DATA[prefix] || []).includes(pattern);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender
      v-model="senderValue1"
      placeholder="Single directive delete as whole: Input @ to trigger directive popover"
      clearable
      :options="options"
      :trigger-strings="['@']"
      :whole="true"
      @search="handleSearch"
    />

    <MentionSender
      v-model="senderValue2"
      placeholder="Multiple directives delete as whole: Input @ and # to trigger directive popover"
      clearable
      :options="options"
      :trigger-strings="['@', '#']"
      whole
      :check-is-whole="checkIsWhole"
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss"></style>
