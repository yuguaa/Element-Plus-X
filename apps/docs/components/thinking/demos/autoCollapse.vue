<docs>
---
title: autoCollapse 属性
---

自动收起属性，当组件 `status` 状态变成 `end` 时，自动收起。该属性默认为 `false`。
</docs>

<script setup lang="ts">
import type { ThinkingStatus } from 'vue-element-plus-x/types/Thinking'

const statusValue = ref<ThinkingStatus>('thinking')
</script>

<template>
  <el-radio-group v-model="statusValue" style="margin-bottom: 12px;">
    <el-radio-button value="thinking">
      thinking
    </el-radio-button>
    <el-radio-button value="end">
      end
    </el-radio-button>
  </el-radio-group>

  <Thinking
    :status="statusValue"
    auto-collapse
    content="欢迎使用 Element-Plus-X"
    button-width="250px"
    max-width="100%"
  />
</template>
