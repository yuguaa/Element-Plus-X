<docs>
---
title: Time Grouping and Sticky Effect
---

Automatically groups by the `group` field of session items, group titles stick to top when scrolling, enhancing navigation experience.
</docs>

<script setup lang="ts">
import type { ConversationItem } from 'vue-element-plus-x/types/Conversations';

const timeBasedItems = ref<ConversationItem<{ id: string; label: string }>[]>([
  {
    id: '1',
    label: "Today's Session 111111111111111111111111111",
    group: 'today',
    disabled: true
  },
  {
    id: '2',
    group: 'today',
    label: "Today's Session 2"
  },
  {
    id: '3',
    group: 'yesterday',
    label: "Yesterday's Session 1"
  },
  {
    id: '4',
    label: "Yesterday's Session 2"
  },
  {
    id: '5',
    label: 'Session from a week ago'
  },
  {
    id: '6',
    label: 'Session from a month ago'
  },
  {
    id: '7',
    label: 'Session from long ago'
  }
]);

const activeKey1 = ref('1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey1"
      :items="timeBasedItems"
      groupable
      :label-max-width="200"
      :show-tooltip="false"
      row-key="id"
    />
  </div>
</template>

<style scoped lang="less"></style>
