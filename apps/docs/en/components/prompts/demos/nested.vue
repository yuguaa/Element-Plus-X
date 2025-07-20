<docs>
---
title: Basic Usage
---

Quickly create a set of prompts list. By default, overflow will not wrap and scrollbars are hidden.
</docs>

<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts';

const items = ref<PromptsItemsProps[]>([]);

onMounted(() => {
  for (let index = 0; index < 3; index++) {
    items.value.push({
      key: index,
      label: `🐠 Main Title ${index}`,
      description: `Description ${index}`,
      // icon: h(InfoFilled, { style: { color: '#409EFF' } }),
      // icon: 'ancient-gate-fill',
      disabled: false,
      itemStyle: {
        width: `calc(100% / ${3} - 43px)`,
        backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`
      },
      itemHoverStyle: {
        cursor: 'unset'
        // background: '#409EFF',
        // color: '#fff',
      },
      // itemActiveStyle: {
      //   // background: 'red',
      //   // color: '#fff',
      // },
      children: [
        {
          key: `${index}-1`,
          label: `🐛 Sub Title ${index}-1`,
          description: `Description ${index}`,
          disabled: false,
          itemStyle: {
            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
            border: '1px solid #FFF'
          },
          itemHoverStyle: {
            cursor: 'unset'
          },
          children: [
            {
              key: `${index}-1-1`,
              label: `🐛 Grandchild Title ${index}-1-1`,
              description: `Description ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #FFF'
              }
            },
            {
              key: `${index}-1-2`,
              label: `🐛 Grandchild Title ${index}-1-1`,
              description: `Description ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #'
              }
            },
            {
              key: `${index}-1-3`,
              label: `🐛 Grandchild Title ${index}-1-1`,
              description: `Description ${index}`,
              disabled: false,
              itemStyle: {
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid #FFF'
              }
            }
          ]
        },
        {
          key: `${index}-2`,
          label: `🐛 Sub Title ${index}-2`,
          description: `Description ${index}`,
          disabled: false,
          itemStyle: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF'
          }
        },
        {
          key: `${index}-3`,
          label: `🐛 Sub Title ${index}-3`,
          description: `Description ${index}`,
          disabled: false,
          itemStyle: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF'
          }
        }
      ]
    });
  }
});

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`Clicked ${item.key}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Prompts
      title="🐛 Prompts Component Title"
      :items="items"
      wrap
      @item-click="handleItemClick"
    />
  </div>
</template>

<style module lang="less"></style>
