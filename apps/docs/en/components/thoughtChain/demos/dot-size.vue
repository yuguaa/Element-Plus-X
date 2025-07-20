<docs>
---
title: dotSize Property
---

Default value is `default`, optional values are `small`, `default`, `large`.
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
    title: 'Success-Main Title',
    thinkTitle: 'Thinking Content Title-Default Expanded',
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '2',
    title: 'Loading-Main Title',
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '3',
    title: 'Failed-Main Title',
    status: 'error',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: 'Thinking Content Title',
    thinkContent: 'Searching text'.repeat(10)
  },
  {
    id: '4',
    hideTitle: true,
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: true,
    thinkTitle: 'Hidden Main Title, Thinking Content Title-Default Expanded',
    thinkContent: 'Searching text'.repeat(10)
  }
];
</script>

<template>
  <ThoughtChain :thinking-items="thinkingItems" dot-size="small" />
  <ThoughtChain :thinking-items="thinkingItems" dot-size="large" />
</template>

<style module lang="less"></style>
