<docs>
---
title: Controlled Component
---

You can bind the component's `value` property through `v-model`.

::: warning
- When submitting, content is required for submission to proceed.
- When content is empty, the submit button will be disabled, and using component instance submission will fail.
:::

::: info
- Through the `v-model` attribute, you can automatically bind the input value. No need to assign data to `v-model`.
- Through the `@submit` event, you can trigger the input submission event, which returns a `value` parameter where you can handle the submitted data.
- Through the `@cancel` event, you can trigger the `loading` button click event. Here you can abort the submission operation.

You can also call through the component ref instance object

- `senderRef.value.submit()` Trigger submission
- `senderRef.value.cancel()` Trigger cancel
- `senderRef.value.clear()` Reset input value
:::
</docs>

<script setup lang="ts">
const senderRef = ref();
const timeValue = ref<NodeJS.Timeout | null>(null);
const senderValue = ref('');
const senderLoading = ref(false);
function handleSubmit(value: string) {
  ElMessage.info(`Sending`);
  senderLoading.value = true;
  timeValue.value = setTimeout(() => {
    // You can view the print result in the console
    console.log('submit-> value：', value);
    console.log('submit-> senderValue', senderValue.value);
    senderLoading.value = false;
    ElMessage.success(`Sent successfully`);
  }, 3500);
}

function handleCancel() {
  senderLoading.value = false;
  if (timeValue.value)
    clearTimeout(timeValue.value);
  timeValue.value = null;
  ElMessage.info(`Cancel sending`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex;">
      <el-button type="primary" style="width: fit-content;" @click="senderRef.clear()">
        Clear using component instance
      </el-button>
      <el-button type="primary" style="width: fit-content;" :disabled="!senderValue" @click="senderRef.submit()">
        Submit using component instance
      </el-button>
      <el-button type="primary" style="width: fit-content;" @click="senderRef.cancel()">
        Cancel using component instance
      </el-button>
    </div>
    <MentionSender ref="senderRef" v-model="senderValue" :loading="senderLoading" clearable @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>
