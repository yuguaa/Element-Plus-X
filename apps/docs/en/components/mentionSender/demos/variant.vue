<docs>
---
title: Variant
---

Set the input variant through the `variant` property. Default 'default' | Up-down structure 'updown'

This property changes the left-right structure input into an up-down structure input. The top is the input box, and the bottom is the built-in prefix and action list bar
</docs>

<script setup lang="ts">
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue';

const senderValue = ref('');
const isSelect = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <MentionSender v-model="senderValue" variant="updown" />
    <MentionSender v-model="senderValue" variant="updown" clearable />
    <MentionSender
      v-model="senderValue"
      variant="updown"
      clearable
      allow-speech
    />

    <MentionSender
      v-model="senderValue"
      variant="updown"
      :auto-size="{ minRows: 2, maxRows: 5 }"
      clearable
      allow-speech
      placeholder="💌 Here you can customize the prefix and action-list after variant"
    >
      <template #prefix>
        <div
          style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap"
        >
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div
            :class="{ isSelect }"
            style="
              display: flex;
              align-items: center;
              gap: 4px;
              padding: 2px 12px;
              border: 1px solid silver;
              border-radius: 15px;
              cursor: pointer;
              font-size: 12px;
            "
            @click="isSelect = !isSelect"
          >
            <el-icon><ElementPlus /></el-icon>
            <span>Deep Thinking</span>
          </div>

          Left is custom prefix, right is custom action list
        </div>
      </template>

      <template #action-list>
        <div style="display: flex; align-items: center; gap: 8px">
          <el-button round color="#626aef">
            <el-icon><Promotion /></el-icon>
          </el-button>
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
