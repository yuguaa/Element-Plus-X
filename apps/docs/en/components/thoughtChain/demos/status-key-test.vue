<docs>
---
title: statusKey, statusEnum Properties
---

Set the status field and corresponding built-in style enum values through `statusKey` and `statusEnum`.

The style of the left dot node is determined by the `statusKey` and `statusEnum` configuration.
</docs>

<script setup lang="ts">
import type { ThoughtChainItemProps } from 'vue-element-plus-x/types/ThoughtChain';

interface DataType {
  codeId: string;
  title?: string;
  thinkTitle?: string;
  thinkContent?: string;
  self_status?: 'yes' | 'no' | 'load';
}

const thinkingItems: ThoughtChainItemProps<DataType>[] = [
  {
    id: '1',
    codeId: '1',
    self_status: 'yes',
    isCanExpand: true,
    isDefaultExpand: true,
    title: 'Success-Main Title',
    thinkTitle: 'Thinking Content Title-Default Expanded',
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '2',
    codeId: '2',
    title: 'Loading-Main Title',
    self_status: 'load',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '3',
    codeId: '3',
    title: 'Failed-Main Title',
    self_status: 'no',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '4',
    codeId: '4',
    title: 'Thanks-Main Title',
    isCanExpand: true,
    isDefaultExpand: true,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Searching text'.repeat(10)
  }
];
</script>

<template>
  <ThoughtChain
    :thinking-items="thinkingItems"
    row-key="codeId"
    status-key="self_status"
    :status-enum="{
      loading: { value: 'load', type: 'warning' },
      error: { value: 'no', type: 'success' },
      success: { value: 'yes', type: 'danger' }
    }"
  >
    <template #icon="{ item }">
      <span>{{ console.log(item) }}</span>
    </template>
  </ThoughtChain>
</template>

<style module lang="less"></style>
