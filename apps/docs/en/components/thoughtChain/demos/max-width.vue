<docs>
---
title: MaxWidth Attribute
---

Set the maximum width of the thought chain, default is '500px'. String type, meaning you can pass percentages like '50%', or other units, even CSS calculated width like 'calc(100% - 200px)'.
</docs>

<script setup lang="ts">
import type { ThoughtChainItemProps } from 'vue-element-plus-x/types/ThoughtChain';

interface DataType {
  id: string;
  title?: string;
  thinkTitle?: string;
  thinkContent?: string;
  status?: 'success' | 'loading' | 'error';
  hideTitle?: boolean;
}

const thinkingItems: ThoughtChainItemProps<DataType>[] = [
  {
    id: '1',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: true,
    title: 'Success - Main Title',
    thinkTitle: 'Thinking Content Title - Default Expanded',
    thinkContent: 'Search text'.repeat(20)
  }
];
</script>

<template>
  <ThoughtChain
    :thinking-items="thinkingItems"
    max-width="calc(100% - 300px)"
  />
</template>

<style scoped lang="less"></style>
