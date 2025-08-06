<docs>
---
title: 提交模式
---

通过 `submitType` 控制换行与提交模式。默认 `'enter'`。即 回车提交，`'shift + Enter'` 换行。

::: info
- `submitType='enter'` 设置 回车提交，`'shift + Enter'` 换行。
- `submitType='shiftEnter'` 设置 `'shift + Enter'` 提交，回车换行。
:::
</docs>

<script setup lang="ts">
import type {
  EditorProps,
  SubmitResult
} from 'vue-element-plus-x/types/EditorSender';

const activeName = ref<EditorProps['submitType']>('enter');
const senderLoading = ref(false);
function handleSubmit(value: SubmitResult) {
  ElMessage.info(`发送中`);
  senderLoading.value = true;
  setTimeout(() => {
    // 可以在控制台 查看打印结果
    console.log('submit-> value：', value);
    senderLoading.value = false;
    ElMessage.success(`发送成功`);
  }, 2000);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-radio-group v-model="activeName">
      <el-radio-button value="enter"> enter </el-radio-button>
      <el-radio-button value="shiftEnter"> shiftEnter </el-radio-button>
    </el-radio-group>

    <EditorSender
      :submit-type="activeName"
      :loading="senderLoading"
      @submit="handleSubmit"
    />
  </div>
</template>
