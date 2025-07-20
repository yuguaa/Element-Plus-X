<docs>
---
title: Submit Mode
---

Control line break and submit mode through `submitType`. Default is `'enter'`. That is, Enter to submit, `'shift + Enter'` to line break.

::: info
- `submitType='enter'` Set Enter to submit, `'shift + Enter'` to line break.
- `submitType='shiftEnter'` Set `'shift + Enter'` to submit, Enter to line break.
:::
</docs>

<script setup lang="ts">
import type { SenderProps } from 'vue-element-plus-x/types/Sender';

const activeName = ref<SenderProps['submitType']>('enter');
const senderValue = ref('');
const senderLoading = ref(false);
function handleSubmit(value: string) {
  ElMessage.info(`Sending`);
  senderLoading.value = true;
  setTimeout(() => {
    // You can view the print result in the console
    console.log('submit-> value：', value);
    console.log('submit-> senderValue', senderValue.value);
    senderLoading.value = false;
    ElMessage.success(`Sent successfully`);
  }, 2000);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-radio-group v-model="activeName">
      <el-radio-button value="enter"> enter </el-radio-button>
      <el-radio-button value="shiftEnter"> shiftEnter </el-radio-button>
    </el-radio-group>
    <Sender
      v-model="senderValue"
      :submit-type="activeName"
      :loading="senderLoading"
      @submit="handleSubmit"
    />
  </div>
</template>
