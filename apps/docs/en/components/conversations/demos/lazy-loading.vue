<docs>
---
title: Lazy Loading Feature
---

Automatically triggers loading more data when scrolling to bottom, supports loading state display, optimizes performance for large data scenarios.
</docs>

<script setup lang="ts">
import { ChatDotRound, ChatLineRound } from '@element-plus/icons-vue';

const lazyItems = shallowRef([
  {
    key: 'l1',
    label: 'Initial Item 1',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l2',
    label: 'Initial Item 2',
    prefixIcon: ChatDotRound
  },
  {
    key: 'l3',
    label: 'Initial Item 3',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l4',
    label: 'Initial Item 1',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l5',
    label: 'Initial Item 2',
    prefixIcon: ChatDotRound
  },
  {
    key: 'l6',
    label: 'Initial Item 3',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l7',
    label: 'Initial Item 1',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l8',
    label: 'Initial Item 2',
    prefixIcon: ChatDotRound
  },
  {
    key: 'l9',
    label: 'Initial Item 3',
    prefixIcon: ChatLineRound
  }
]);

// Load more handling
const isLoading = ref(false);

function loadMoreItems() {
  if (isLoading.value)
    return;

  isLoading.value = true;
  console.log('Loading more data...');

  // Simulate async loading
  setTimeout(() => {
    const newItems = [
      {
        key: `l${lazyItems.value.length + 1}`,
        label: `Loaded Item ${lazyItems.value.length + 1}`,
        prefixIcon: markRaw(ChatLineRound)
      },
      {
        key: `l${lazyItems.value.length + 2}`,
        label: `Loaded Item ${lazyItems.value.length + 2}`,
        prefixIcon: markRaw(ChatDotRound)
      }
    ];

    lazyItems.value = [...lazyItems.value, ...newItems];
    isLoading.value = false;
  }, 2000);
}

const activeKey6 = ref('l1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey6"
      :items="lazyItems"
      :label-max-width="200"
      row-key="key"
      :show-tooltip="true"
      :load-more="loadMoreItems"
      :load-more-loading="isLoading"
      show-to-top-btn
    />
  </div>
</template>

<style scoped lang="less"></style>
