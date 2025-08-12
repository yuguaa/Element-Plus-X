<docs>
---
title: Dropdown Menu Button Display Style
---

Use the `showBuiltInMenuType` property to set whether to always display the built-in menu button.

The optional values for the `showBuiltInMenuType` property are:

- `hover`: Show built-in menu button on mouse hover (default)
- `always`: Always show built-in menu button
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
      'Menu Test Item 1 - Long Text Effect Demo Text Length Overflow Effect Test'.repeat(
        2
      )
  },
  {
    key: 'm2',
    label: 'Menu Test Item 2',
    disabled: true
  },
  {
    key: 'm3',
    label: 'Menu Test Item 3'
  },
  {
    key: 'm4',
    label: 'Menu Test Item 4'
  },
  {
    key: 'm5',
    label: 'Menu Test Item 5'
  },
  {
    key: 'm6',
    label: 'Menu Test Item 6'
  },
  {
    key: 'm7',
    label: 'Menu Test Item 7'
  },
  {
    key: 'm8',
    label: 'Menu Test Item 8'
  },
  {
    key: 'm9',
    label: 'Menu Test Item 9'
  },
  {
    key: 'm10',
    label: 'Menu Test Item 10'
  },
  {
    key: 'm11',
    label: 'Menu Test Item 11'
  },
  {
    key: 'm12',
    label: 'Menu Test Item 12'
  },
  {
    key: 'm13',
    label: 'Menu Test Item 13'
  },
  {
    key: 'm14',
    label: 'Menu Test Item 14'
  }
]);

const activeKey4 = ref('m1');

// Built-in menu click method
function handleMenuCommand(
  command: ConversationMenuCommand,
  item: ConversationItem
) {
  console.log('Built-in menu click event:', command, item);
  // Check if directly modifying item works
  if (command === 'delete') {
    const index = menuTestItems.value.findIndex(
      itemSelf => itemSelf.key === item.key
    );

    if (index !== -1) {
      menuTestItems.value.splice(index, 1);
      console.log('Deletion successful');
      ElMessage.success('Deletion successful');
    }
  }
  if (command === 'rename') {
    item.label = 'Modified';
    console.log('Renaming successful');
    ElMessage.success('Renaming successful');
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
      show-built-in-menu-type="always"
      @menu-command="handleMenuCommand"
    />
  </div>
</template>

<style scoped lang="less"></style>
