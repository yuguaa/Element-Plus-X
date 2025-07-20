<docs>
---
title: Custom Group Sorting
---

Pass sorting function through `groupable` property to customize group order (e.g.: Study > Work > Personal > Ungrouped).
</docs>

<script setup lang="ts">
import type { GroupableOptions } from 'vue-element-plus-x/types/Conversations';

const groupBasedItems = ref([
  {
    key: 'g1',
    label: 'Work Document 1',
    group: 'Work'
  },
  {
    key: 'g2',
    label: 'Work Document 11111111111111111111111111111111111111111',
    group: 'Work'
  },
  {
    key: 'g3',
    label: 'Work Document 3',
    group: 'Work'
  },
  {
    key: 'g4',
    label: 'Work Document 4',
    group: 'Work'
  },
  {
    key: 'g5',
    label: 'Work Document 5',
    group: 'Work'
  },
  {
    key: 'g6',
    label: 'Work Document 6',
    group: 'Work'
  },
  {
    key: 'g7',
    label: 'Study Notes 1',
    group: 'Study'
  },
  {
    key: 'g8',
    label: 'Study Notes 2',
    group: 'Study'
  },
  {
    key: 'g9',
    label: 'Personal Document 1',
    group: 'Personal'
  },
  {
    key: 'g10',
    label: 'Ungrouped Item'
  }
]);

// Custom group options
const customGroupOptions: GroupableOptions = {
  // Custom group sorting, Study > Work > Personal > Ungrouped
  sort: (a: any, b: any) => {
    const order: Record<string, number> = {
      Study: 0,
      Work: 1,
      Personal: 2,
      Ungrouped: 3
    };
    const orderA = order[a] !== undefined ? order[a] : 999;
    const orderB = order[b] !== undefined ? order[b] : 999;
    return orderA - orderB;
  }
};

const activeKey2 = ref('g1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey2"
      :items="groupBasedItems"
      :groupable="customGroupOptions"
      :label-max-width="200"
      :show-tooltip="true"
      show-to-top-btn
      row-key="key"
    >
      <template #groupTitle="{ group }">
        <div class="custom-group-title">
          <!-- Add different prefixes for different groups -->
          <span v-if="group.title === 'Work'">📊 </span>
          <span v-else-if="group.title === 'Study'">📚 </span>
          <span v-else-if="group.title === 'Personal'">🏠 </span>
          <span v-else>📁 </span>
          {{ group.title }}
        </div>
      </template>
    </Conversations>
  </div>
</template>

<style scoped lang="less">
.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #409eff;
}
</style>
