<docs>
---
title: Absolute Custom Styles and Group Titles
---

Customize session item appearance and group title icons through slots and style properties, supports hover, active, menu opened state style customization.
</docs>

<script setup lang="ts">
import type { GroupableOptions } from 'vue-element-plus-x/types/Conversations';

const menuTestItems1 = ref([
  {
    key: 'm1',
    label:
      'Menu Test Item 1 - Long text effect demonstration text length overflow effect test'.repeat(
        2
      ),
    group: 'Work'
  },
  {
    key: 'm2',
    label: 'Menu Test Item 2',
    disabled: true,
    group: 'Work'
  },
  {
    key: 'm3',
    label: 'Menu Test Item 3',
    group: 'Work'
  },
  {
    key: 'm4',
    label: 'Menu Test Item 4',
    group: 'Study'
  },
  {
    key: 'm5',
    label: 'Menu Test Item 5',
    group: 'Study'
  },
  {
    key: 'm6',
    label: 'Menu Test Item 6',
    group: 'Study'
  },
  {
    key: 'm7',
    label: 'Menu Test Item 7',
    group: 'Study'
  },
  {
    key: 'm8',
    label: 'Menu Test Item 8',
    group: 'Personal'
  },
  {
    key: 'm9',
    label: 'Menu Test Item 9',
    group: 'Personal'
  },
  {
    key: 'm10',
    label: 'Menu Test Item 10',
    group: 'Personal'
  },
  {
    key: 'm11',
    label: 'Menu Test Item 11',
    group: 'Personal'
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
const conversationMenuItems1 = [
  {
    key: 'edit',
    label: 'Edit',
    icon: '🍉',
    command: {
      self_id: '1',
      self_message: 'Edit',
      self_type: 'primary'
    }
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: '🍎',
    disabled: true,
    divided: true
  },
  {
    key: 'share',
    label: 'Share',
    icon: '🍆',
    command: 'share'
  }
];

const activeKey5 = ref('m1');

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
      v-model:active="activeKey5"
      :items="menuTestItems1"
      :label-max-width="200"
      :show-tooltip="true"
      tooltip-placement="right"
      :tooltip-offset="35"
      show-built-in-menu
      :groupable="customGroupOptions"
      row-key="key"
      :items-style="{
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s',
        marginBottom: '20px',
        border: '2px dashed transparent'
      }"
      :items-hover-style="{
        background: '#FAFAD2',
        border: '2px dashed #006400'
      }"
      :items-active-style="{
        background: '#006400',
        color: '#FFFAFA',
        border: '2px dashed transparent'
      }"
      :items-menu-opened-style="{
        border: '2px dashed transparent'
      }"
      :menu-style="{
        backgroundColor: 'red',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        height: '200px'
      }"
    >
      <template #label="{ item }">
        <div class="custom-label">
          {{ item.label }}
        </div>
      </template>

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

      <template
        #more-filled="{ item, isHovered, isActive, isMenuOpened, isDisabled }"
      >
        <span v-if="isHovered">✍️</span>
        <span v-if="isActive">✅</span>
        <span v-if="isMenuOpened">🥰</span>
        <span
          v-if="isDisabled"
          :style="{
            background: 'black',
            padding: '5px',
            borderRadius: '10px',
            color: 'white',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }"
        >
          🫥Is Disabled: {{ item?.disabled }}
        </span>
      </template>

      <template #menu="{ item }">
        <div class="menu-buttons">
          <div
            v-for="menuItem in conversationMenuItems1"
            :key="menuItem.key"
            class="menu-self-button"
            @click.stop="handleMenuClick(menuItem.key, item)"
          >
            <span v-if="menuItem.icon">{{ menuItem.icon }}</span>
            <span v-if="menuItem.label">{{ menuItem.label }}</span>
          </div>
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

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 12px;

  // Custom menu button-el-button styles
  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 8px;
    }
  }

  // Custom menu button-custom styles
  .menu-self-button {
    display: flex;
    padding: 4px 8px;
    align-items: center;
    border-radius: 5px;
    margin-left: 0;
    cursor: pointer;
    gap: 8px;

    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
}

.custom-label {
  display: flex;
  align-items: center;
  // Overflow hidden
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>
