<docs>
---
title: Footer Slot
---

Set input bottom content through the `#footer` slot

:::info
  If you want to set the `#footer` slot and don't want the built-in layout of the updown variant, you can add the `showUpdown` property to hide the built-in layout of the updown variant
:::
</docs>

<script setup lang="ts">
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue';

const senderValue = ref('');
const isSelect = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender v-model="senderValue" :auto-size="{ minRows: 1, maxRows: 5 }" clearable allow-speech placeholder="💌 Welcome to Element-Plus-X">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>
        </div>
      </template>

      <template #action-list>
        <div style="display: flex; align-items: center; gap: 8px;">
          <el-button round color="#626aef">
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>
      </template>

      <!-- Custom footer slot -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px;">
          Default variant custom footer
        </div>
      </template>
    </MentionSender>

    <MentionSender v-model="senderValue" variant="updown" :auto-size="{ minRows: 2, maxRows: 5 }" clearable allow-speech placeholder="💌 Here you can customize the prefix and action-list after variant">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div :class="{ isSelect }" style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;" @click="isSelect = !isSelect">
            <el-icon><ElementPlus /></el-icon>
            <span>Deep Thinking</span>
          </div>
        </div>
      </template>

      <template #action-list>
        <div style="display: flex; align-items: center; gap: 8px;">
          <el-button round color="#626aef">
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>
      </template>

      <!-- Custom footer slot -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px;">
          updown variant custom footer
        </div>
      </template>
    </MentionSender>

    <MentionSender v-model="senderValue" variant="updown" :auto-size="{ minRows: 2, maxRows: 5 }" clearable allow-speech placeholder="💌 Hide updown variant built-in layout by setting showUpdown to false" :show-updown="false">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div :class="{ isSelect }" style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;" @click="isSelect = !isSelect">
            <el-icon><ElementPlus /></el-icon>
            <span>Deep Thinking</span>
          </div>
        </div>
      </template>

      <template #action-list>
        <div style="display: flex; align-items: center; gap: 8px;">
          <el-button round color="#626aef">
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>
      </template>

      <!-- Custom footer slot -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px; text-align: center;">
          showUpdown property hides updown variant built-in layout style + #footer bottom slot combination, completely letting you control the bottom content
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="scss">
.isSelect {
  color: #626aef;
  border: 1px solid #626aef !important;
  border-radius: 15px;
  padding: 3px 12px;
  font-weight: 700;
}
</style>
