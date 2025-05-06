<docs>
---
title: 底部插槽
---

通过 `#footer` 插槽设置输入框 底部内容

:::info
  如果你想要设置 `#footer` 插槽，不想要 updown 变体的内置布局，可以再添加 `showUpdown` 属性，隐藏 updown 变体的内置布局
:::
</docs>

<script setup lang="ts">
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue'

const senderValue = ref('')
const isSelect = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <MentionSender v-model="senderValue" :auto-size="{ minRows: 1, maxRows: 5 }" clearable allow-speech placeholder="💌 欢迎使用 Element-Plus-X">
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

      <!-- 自定义 底部插槽 -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px;">
          默认变体 自定义底部
        </div>
      </template>
    </MentionSender>

    <MentionSender v-model="senderValue" variant="updown" :auto-size="{ minRows: 2, maxRows: 5 }" clearable allow-speech placeholder="💌 在这里你可以自定义变体后的 prefix 和 action-list">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div :class="{ isSelect }" style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;" @click="isSelect = !isSelect">
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

      <!-- 自定义 底部插槽 -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px;">
          updown 变体 自定义底部
        </div>
      </template>
    </MentionSender>

    <MentionSender v-model="senderValue" variant="updown" :auto-size="{ minRows: 2, maxRows: 5 }" clearable allow-speech placeholder="💌 通过设置 showUpdown 为 false 隐藏 updown 变体的内置布局" :show-updown="false">
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button round plain color="#626aef">
            <el-icon><Paperclip /></el-icon>
          </el-button>

          <div :class="{ isSelect }" style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;" @click="isSelect = !isSelect">
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

      <!-- 自定义 底部插槽 -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px; text-align: center;">
          showUpdown 属性 隐藏 updown 变体内置布局样式 + #footer 底部插槽结合，完全让你来控制底部内容
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
