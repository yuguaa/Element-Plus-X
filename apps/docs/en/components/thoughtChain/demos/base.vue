<docs>
---
title: Basic Usage of thinkingItems
---

Control rendering by passing an array through `thinkingItems`.

::: info
`id` is a required field. You can also set the unique identifier name through `rowKey`, default is `id`.
:::
</docs>

<script setup lang="ts">
import type { ThoughtChainItemProps } from 'vue-element-plus-x/types/ThoughtChain';

interface DataType {
  codeId: string;
  title?: string;
  thinkTitle?: string;
  thinkContent?: string;
  status?: 'success' | 'loading' | 'error';
}

const thinkingItems: ThoughtChainItemProps<DataType>[] = [
  {
    id: '1',
    codeId: '1',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: true,
    title: 'Success - Main Title',
    thinkTitle: 'Thinking Content Title - Default Expanded',
    thinkContent: 'Search text'.repeat(10)
  },
  {
    id: '2',
    codeId: '2',
    title: 'Loading - Main Title',
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Search text'.repeat(10)
  },
  {
    id: '3',
    codeId: '3',
    title: 'Failed - Main Title',
    status: 'error',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Search text'.repeat(10)
  },
  {
    id: '4',
    codeId: '4',
    title: 'Failed - Main Title',
    status: 'error',
    isCanExpand: true,
    isDefaultExpand: true,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Search text'.repeat(10)
  }
];
</script>

<template>
  <ThoughtChain :thinking-items="thinkingItems" row-key="codeId" />
</template>

<style scoped lang="less"></style>
