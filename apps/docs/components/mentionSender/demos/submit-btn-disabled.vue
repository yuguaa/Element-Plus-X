<docs>
---
title: 内置发送按钮禁用
---

可以通过 `submit-btn-disabled` 自定义 是否让发送按钮禁用。当禁用时，组件实例的 `submit` 方法将失效。

::: warning
组件内置的 发送按钮，是更据 `v-model` 绑定的，所以，当 `v-model` 绑定的值为空时，发送按钮将处于禁用状态。

但是，有这么一个场景。用户通过上传了文件，但是没有输入内容，此时，发送按钮依然处于禁用状态。
所以，为了 禁用逻辑的解耦，组件提供了 `submit-btn-disabled` 属性，用于自主控制发送按钮的禁用状态。

自定义 `#action-list` 时，此属性对 submit 事件同样生效。
:::
</docs>

<script setup lang="ts">
const senderRef = ref()
const timeValue = ref<NodeJS.Timeout | null>(null)
const senderValue = ref('')
const senderLoading = ref(false)

const submitBtnDisabled = ref(true)
function handleSubmit(value: string) {
  ElMessage.info(`发送中`)
  senderLoading.value = true
  timeValue.value = setTimeout(() => {
    // 可以在控制台 查看打印结果
    console.log('submit-> value：', value)
    console.log('submit-> senderValue', senderValue.value)
    senderLoading.value = false
    ElMessage.success(`发送成功`)
  }, 3500)
}

function handleCancel() {
  senderLoading.value = false
  if (timeValue.value)
    clearTimeout(timeValue.value)
  timeValue.value = null
  ElMessage.info(`取消发送`)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <span>这是内置的禁用逻辑：</span>
    <Sender ref="senderRef" v-model="senderValue" :loading="senderLoading" clearable @submit="handleSubmit" @cancel="handleCancel" />

    <span>自定义禁用逻辑：</span>
    <Sender ref="senderRef" v-model="senderValue" :submit-btn-disabled="submitBtnDisabled" :loading="senderLoading" clearable @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>
