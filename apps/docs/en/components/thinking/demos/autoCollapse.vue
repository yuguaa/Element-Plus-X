<docs>
---
title: AutoCollapse Attribute
---

Auto collapse attribute. When the component `status` state changes to `end`, it automatically collapses. This attribute defaults to `false`.
</docs>

<script setup lang="ts">
import type { ThinkingStatus } from 'vue-element-plus-x/types/Thinking';

const statusValue = ref<ThinkingStatus>('thinking');
</script>

<template>
  <el-radio-group v-model="statusValue" style="margin-bottom: 12px">
    <el-radio-button value="thinking"> thinking </el-radio-button>
    <el-radio-button value="end"> end </el-radio-button>
  </el-radio-group>

  <Thinking
    :status="statusValue"
    auto-collapse
    content="Welcome to Element-Plus-X"
    button-width="250px"
    max-width="100%"
  />
</template>
