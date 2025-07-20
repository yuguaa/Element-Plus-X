<docs>
---
title: Custom Menu Interaction
---

Extend menu content through slots, supporting icons, text, and custom commands to meet complex business logic needs.
</docs>

<script setup lang="ts">
import { Delete, Edit, EditPen, Share } from '@element-plus/icons-vue';

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

const conversationMenuItems = [
  {
    key: 'edit',
    label: 'Edit',
    icon: Edit,
    command: {
      self_id: '1',
      self_message: 'Edit',
      self_type: 'primary'
    }
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Delete,
    disabled: true,
    divided: true
  },
  {
    key: 'share',
    label: 'Share',
    icon: Share,
    command: 'share'
  }
];

const activeKey4 = ref('m1');

// Handle menu click
function handleMenuClick(menuKey: string, item: any) {
  console.log('Menu click', menuKey, item);

  switch (menuKey) {
    case 'edit':
      console.log(`Edit: ${item.label}`);
      ElMessage.warning(`Edit: ${item.label}`);
      break;
    case 'delete':
      console.log(`Delete: ${item.label}`);
      ElMessage.error(`Delete: ${item.label}`);
      break;
    case 'share':
      console.log(`Share: ${item.label}`);
      ElMessage.success(`Share: ${item.label}`);
      break;
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey4"
      :items="menuTestItems"
      row-key="key"
      :label-max-width="200"
      :show-tooltip="true"
      show-to-top-btn
      show-built-in-menu
    >
      <template #more-filled>
        <el-icon>
          <EditPen />
        </el-icon>
      </template>

      <template #menu="{ item }">
        <div class="menu-buttons">
          <el-button
            v-for="menuItem in conversationMenuItems"
            :key="menuItem.key"
            link
            size="small"
            @click.stop="handleMenuClick(menuItem.key, item)"
          >
            <el-icon v-if="menuItem.icon">
              <component :is="menuItem.icon" />
            </el-icon>
            <span v-if="menuItem.label">{{ menuItem.label }}</span>
          </el-button>
        </div>
      </template>
    </Conversations>
  </div>
</template>

<style module lang="less">
.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 12px;

  // Custom menu button el-button style
  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 8px;
    }
  }
}
</style>
