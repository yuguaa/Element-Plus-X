<docs>
---
title: Responsive Width
---

Combined with `wrap` and `styles` to display with fixed width. Note that this only takes effect when used together on `PromptsItem`. Individual use allows for more customization.
</docs>

<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts';

const items = ref<PromptsItemsProps[]>([
  {
    key: '1',
    label: '🐛 Prompts Component Title',
    description: 'Description information'.repeat(3),
    itemStyle: { width: 'calc(50% - 6px)' }
  },
  {
    key: '2',
    label: '🐛 I am disabled',
    disabled: true,
    itemStyle: { width: 'calc(50% - 6px)' }
  },
  {
    key: '3',
    label: '🐛 Individual disable control is more accurate',
    disabled: true,
    itemStyle: { width: 'calc(50% - 6px)' }
  },
  {
    key: '4',
    label: '🐛 Prompts Component Title',
    itemStyle: { width: 'calc(50% - 6px)' }
  }
]);

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`Clicked ${item.key}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Prompts
      title="🐵 Prompts Component Title"
      :items="items"
      wrap
      @item-click="handleItemClick"
    />
  </div>
</template>

<style scoped lang="less"></style>
