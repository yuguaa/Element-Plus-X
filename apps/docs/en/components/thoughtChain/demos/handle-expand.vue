<docs>
---
title: handleExpand Event
---

Through the handleExpand event, you can get the currently expanded node data.
</docs>

<script setup lang="ts">
import type { ThoughtChainItemProps } from 'vue-element-plus-x/types/ThoughtChain';

interface DataType {
  codeId: string;
  self_title?: string;
  self_thinkTitle?: string;
  self_thinkContent?: string;
  status?: 'success' | 'loading' | 'error';
}

const thinkingItems: ThoughtChainItemProps<DataType>[] = [
  {
    id: '1',
    codeId: '1',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: true,
    self_title: 'Success-Main Title',
    self_thinkTitle: 'Thinking Content Title-Default Expanded',
    self_thinkContent: 'Searching text'.repeat(10),
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '2',
    codeId: '2',
    self_title: 'Loading-Main Title',
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: false,
    self_thinkTitle: 'Thinking Content Title',
    self_thinkContent: 'Searching text'.repeat(10),
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '3',
    codeId: '3',
    self_title: 'Failed-Main Title',
    status: 'error',
    isCanExpand: true,
    isDefaultExpand: false,
    self_thinkTitle: 'Thinking Content Title',
    self_thinkContent: 'Searching text'.repeat(10),
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '4',
    codeId: '4',
    self_title: 'Thanks-Main Title',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: true,
    self_thinkTitle: 'Thinking Content Title',
    self_thinkContent: 'Searching text'.repeat(10),
    thinkContent: 'Searching text'.repeat(10)
  }
];

function handleExpand(value: string[]) {
  const expandedItems = thinkingItems.filter(item =>
    value.includes(item.codeId)
  );
  console.log(expandedItems);
}
</script>

<template>
  <ThoughtChain
    :thinking-items="thinkingItems"
    row-key="codeId"
    title-key="self_title"
    think-title-key="self_thinkTitle"
    think-content-key="self_thinkContent"
    @handle-expand="(value: string[]) => handleExpand(value)"
  />
</template>

<style module lang="less">
.is-loading {
  animation: spin 1s infinite linear;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
