<docs>
---
title: Submit Mode
---

Control line breaks and submit mode with `submitType`. Default is `'enter'`, i.e., press Enter to submit, `'shift + Enter'` for a new line.

::: info
- `submitType='enter'` sets Enter to submit, `'shift + Enter'` for a new line.
- `submitType='shiftEnter'` sets `'shift + Enter'` to submit, Enter for a new line.
- `submitType='cmdOrCtrlEnter'` sets `'cmd + Enter'` or `'ctrl + Enter'` to submit, Enter for a new line.
- `submitType='altEnter'` sets `'alt + Enter'` to submit, Enter for a new line.
:::
</docs>

<script setup lang="ts">
import type { SenderProps } from 'vue-element-plus-x/types/Sender';

const activeName = ref<SenderProps['submitType']>('enter');
const senderValue = ref('');
const senderLoading = ref(false);
function handleSubmit(value: string) {
  ElMessage.info(`Sending...`);
  senderLoading.value = true;
  setTimeout(() => {
    // You can check the console for the output
    console.log('submit-> value:', value);
    console.log('submit-> senderValue', senderValue.value);
    senderLoading.value = false;
    ElMessage.success(`Sent successfully`);
  }, 2000);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-radio-group v-model="activeName">
      <el-radio-button value="enter">
        enter
      </el-radio-button>
      <el-radio-button value="shiftEnter">
        shiftEnter
      </el-radio-button>
      <el-radio-button value="cmdOrCtrlEnter">
        cmdOrCtrlEnter
      </el-radio-button>
      <el-radio-button value="altEnter">
        altEnter
      </el-radio-button>
    </el-radio-group>
    <Sender
      v-model="senderValue"
      :submit-type="activeName"
      :loading="senderLoading"
      @submit="handleSubmit"
    />
  </div>
</template>
