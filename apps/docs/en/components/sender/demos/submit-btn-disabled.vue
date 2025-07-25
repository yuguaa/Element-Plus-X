<docs>
---
title: Built-in Send Button Disabled
---

You can customize whether to disable the send button through `submit-btn-disabled`. When disabled, the component instance's `submit` method will fail.

::: warning
The built-in send button is bound to `v-model`, so when the `v-model` bound value is empty, the send button will be in disabled state.

However, there is such a scenario. The user uploaded a file but didn't input content, at this time, the send button is still in disabled state.
So, for decoupling the disable logic, the component provides the `submit-btn-disabled` attribute for autonomous control of the send button's disabled state.

When customizing `#action-list`, this attribute also takes effect for submit events.
:::
</docs>

<script setup lang="ts">
const senderRef = ref();
const timeValue = ref<NodeJS.Timeout | null>(null);
const senderValue = ref('');
const senderLoading = ref(false);

const submitBtnDisabled = ref(true);
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
  if (timeValue.value) clearTimeout(timeValue.value);
  timeValue.value = null;
  ElMessage.info(`Cancel sending`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>This is the built-in disable logic:</span>
    <Sender
      ref="senderRef"
      v-model="senderValue"
      :loading="senderLoading"
      clearable
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <span>Custom disable logic:</span>
    <Sender
      ref="senderRef"
      v-model="senderValue"
      :submit-btn-disabled="submitBtnDisabled"
      :loading="senderLoading"
      clearable
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
