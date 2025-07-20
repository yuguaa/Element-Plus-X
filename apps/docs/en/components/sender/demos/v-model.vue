<docs>
---
title: Controlled Component
---

You can bind the component's `value` property through `v-model`.

::: warning
- When submitting, there must be content for the submission to proceed.
- When the content is empty, the submit button will be disabled, and using the component instance to submit will fail.
:::

::: info
- Through the `v-model` property, you can automatically bind the input box value. No need to assign data to `v-model`.
- Through the `@submit` event, you can trigger the input box's submit event, which returns a `value` parameter, and you can handle the submitted data here.
- Through the `@cancel` event, you can trigger the `loading` button's click event. Here you can abort the submission operation.

You can also call through the component ref instance object

- `senderRef.value.submit()` Trigger submission
- `senderRef.value.cancel()` Trigger cancel
- `senderRef.value.clear()` Reset the input box value
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
    <div style="display: flex">
      <el-button
        type="primary"
        style="width: fit-content"
        @click="senderRef.clear()"
      >
        Clear using component instance
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content"
        :disabled="!senderValue"
        @click="senderRef.submit()"
      >
        Submit using component instance
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content"
        @click="senderRef.cancel()"
      >
        Cancel using component instance
      </el-button>
    </div>
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
