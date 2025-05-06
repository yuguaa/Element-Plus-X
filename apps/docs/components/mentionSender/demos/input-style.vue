<docs>
---
title: 自定义输入框样式
---
通过 `input-style` 方便对输入框的样式透传
</docs>

<script setup lang="ts">
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue'

const senderValue = ref('这是自定义输入框样式')
const isSelect = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender v-model="senderValue" variant="updown" :input-style="{ backgroundColor: 'rgb(243 244 246)', color: '#626aef', fontSize: '24px', fontWeight: 700 }" style="background: rgb(243 244 246); border-radius: 8px;" />

    <MentionSender v-model="senderValue" variant="updown" :input-style="{ backgroundColor: 'transparent', color: '#F0F2F5', fontSize: '24px', fontWeight: 700 }" style="background-image: linear-gradient(to left, #434343 0%, black 100%); border-radius: 8px;" />

    <MentionSender v-model="senderValue" :input-style="{ backgroundColor: 'transparent', color: '#FF5454', fontSize: '20px', fontWeight: 700 }" style="background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%); border-radius: 8px;" />

    <MentionSender v-model="senderValue" variant="updown" :input-style="{ backgroundColor: 'transparent', color: '#303133', fontSize: '16px', fontWeight: 700 }" style="background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%); border-radius: 8px;">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div :class="{ isSelect }" style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid black; border-radius: 15px; cursor: pointer; font-size: 12px; color: black;" @click="isSelect = !isSelect">
            <el-icon><ElementPlus /></el-icon>
            <span>深度思考</span>
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
    </MentionSender>
  </div>
</template>

<style scoped lang="scss">
.isSelect {
  color: #626aef !important;
  border: 1px solid #626aef !important;
  border-radius: 15px;
  padding: 3px 12px;
  font-weight: 700;
}
</style>
