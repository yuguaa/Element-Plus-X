<docs>
---
title: 变体
---

通过 `variant` 属性设置输入框的变体。默认 'default' | 上下结构 'updown'

这个属性，将左右结构的 输入框，变成 上下结构的 输入框。上面为 输入框，下面为 内置的 前缀和操作列表栏
</docs>

<script setup lang="ts">
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue'

const senderValue = ref('')
const isSelect = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Sender v-model="senderValue" variant="updown" />
    <Sender v-model="senderValue" variant="updown" clearable />
    <Sender v-model="senderValue" variant="updown" clearable allow-speech />

    <Sender v-model="senderValue" variant="updown" :auto-size="{ minRows: 2, maxRows: 5 }" clearable allow-speech placeholder="💌 在这里你可以自定义变体后的 prefix 和 action-list">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div :class="{ isSelect }" style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;" @click="isSelect = !isSelect">
            <el-icon><ElementPlus /></el-icon>
            <span>深度思考</span>
          </div>

          左边是自定义 prefix 前缀 右边是自定义 操作列表
        </div>
      </template>

      <template #action-list>
        <div style="display: flex; align-items: center; gap: 8px;">
          <el-button round color="#626aef">
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>
      </template>
    </Sender>
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
