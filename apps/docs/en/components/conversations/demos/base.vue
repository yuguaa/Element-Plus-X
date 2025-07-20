<docs>
---
title: Basic Usage
---

Get selected conversation information through the `@change` event. Bind the currently selected conversation with `v-model:active`.
</docs>

<script setup lang="ts">
import type { ConversationItem } from 'vue-element-plus-x/types/Conversations';

const timeBasedItems = ref<ConversationItem<{ id: string; label: string }>[]>([
  {
    id: '1',
    label: "Today's conversation111111111111111111111111111",
    group: 'today'
  },
  {
    id: '2',
    group: 'today',
    label: "Today's conversation2",
    disabled: true
  },
  {
    id: '3',
    group: 'yesterday',
    label: "Yesterday's conversation1"
  },
  {
    id: '4',
    label: "Yesterday's conversation2"
  },
  {
    id: '5',
    label: 'Conversation from a week ago'
  },
  {
    id: '6',
    label: 'Conversation from a month ago'
  },
  {
    id: '7',
    label: 'Conversation from long ago'
  }
]);

const activeKey1 = ref();

function handleChange(item: ConversationItem<{ id: string; label: string }>) {
  ElMessage.success(`Selected: ${item.label}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey1"
      :items="timeBasedItems"
      :label-max-width="200"
      :show-tooltip="true"
      row-key="id"
      @change="handleChange"
    />
  </div>
</template>

<style module lang="less"></style>
