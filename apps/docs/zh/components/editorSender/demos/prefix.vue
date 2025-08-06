<docs>
---
title: 前缀插槽
---

通过 `#prefix` 插槽用于自定义输入框的前缀内容。
</docs>

<script setup lang="ts">
import { Link } from '@element-plus/icons-vue';

const senderRef = ref();
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: flex-end;
    "
  >
    <EditorSender ref="senderRef">
      <!-- 自定义前缀 -->
      <template #prefix>
        <div class="prefix-self-wrap">
          <el-button dark>
            <el-icon><Link /></el-icon>
            <span>自定义前缀</span>
          </el-button>
        </div>
      </template>
    </EditorSender>
  </div>
</template>

<style scoped lang="less">
.header-self-wrap {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 200px;
  .header-self-title {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
  }
  .header-self-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #626aef;
    font-weight: 600;
  }
}

.prefix-self-wrap {
  display: flex;
}
</style>
