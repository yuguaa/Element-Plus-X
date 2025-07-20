<docs>
---
title: Built-in Dropdown Menu
---

Built-in basic menu functionality (rename, delete), supports menu command callbacks, easily implement quick operations for conversation items.

`@menu-command` triggers the built-in menu click event.
</docs>

<script setup lang="ts">
import type {
  ConversationItem,
  ConversationMenuCommand
} from 'vue-element-plus-x/types/Conversations';

const menuTestItems = ref([
  {
    key: 'm1',
    label:
      'Menu test item 1 - Long text effect demo text overflow effect test'.repeat(
        2
      )
  },
  {
    key: 'm2',
    label: 'Menu test item 2',
    disabled: true
  },
  {
    key: 'm3',
    label: 'Menu test item 3'
  },
  {
    key: 'm4',
    label: 'Menu test item 4'
  },
  {
    key: 'm5',
    label: 'Menu test item 5'
  },
  {
    key: 'm6',
    label: 'Menu test item 6'
  },
  {
    key: 'm7',
    label: 'Menu test item 7'
  },
  {
    key: 'm8',
    label: 'Menu test item 8'
  },
  {
    key: 'm9',
    label: 'Menu test item 9'
  },
  {
    key: 'm10',
    label: 'Menu test item 10'
  },
  {
    key: 'm11',
    label: 'Menu test item 11'
  },
  {
    key: 'm12',
    label: 'Menu test item 12'
  },
  {
    key: 'm13',
    label: 'Menu test item 13'
  },
  {
    key: 'm14',
    label: 'Menu test item 14'
  }
]);

const activeKey4 = ref('m1');

// Built-in menu click method
function handleMenuCommand(
  command: ConversationMenuCommand,
  item: ConversationItem
) {
  console.log('Built-in menu click event:', command, item);
  // Check if directly modifying item is effective
  if (command === 'delete') {
    const index = menuTestItems.value.findIndex(
      itemSlef => itemSlef.key === item.key
    );

    if (index !== -1) {
      menuTestItems.value.splice(index, 1);
      console.log('Delete successful');
      ElMessage.success('Delete successful');
    }
  }
  if (command === 'rename') {
    item.label = 'Modified';
    console.log('Rename successful');
    ElMessage.success('Rename successful');
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey4"
      :items="menuTestItems"
      :label-max-width="200"
      :show-tooltip="true"
      row-key="key"
      tooltip-placement="right"
      :tooltip-offset="35"
      show-to-top-btn
      show-built-in-menu
      @menu-command="handleMenuCommand"
    />
  </div>
</template>

<style module lang="less"></style>
