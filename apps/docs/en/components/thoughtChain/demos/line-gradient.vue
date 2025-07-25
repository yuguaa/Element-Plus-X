<docs>
---
title: lineGradient Property
---

Enable line color gradient, but custom colors are not supported. Effective when array length is greater than 1
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
  },
  {
    id: '2',
    status: 'loading',
    isCanExpand: true,
    title: 'Loading - Main Title',
    thinkTitle: 'Thinking Content Title - Default Expanded',
    thinkContent: 'Search text'.repeat(20)
  },
  {
    id: '3',
    status: 'error',
    isCanExpand: true,
    title: 'Failed - Main Title',
    thinkTitle: 'Thinking Content Title - Default Expanded',
    thinkContent: 'Search text'.repeat(20)
  },
  {
    id: '4',
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
  <ThoughtChain :thinking-items="thinkingItems" line-gradient />
</template>

<style scoped lang="less"></style>
