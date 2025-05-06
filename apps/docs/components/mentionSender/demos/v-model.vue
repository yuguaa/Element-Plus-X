<docs>
---
title: 受控组件
---

可以通过 `v-model` 绑定组件的 `value` 属性。

::: warning
- 在提交时，需要有内容，才会进行提交。
- 内容为空时，提交按钮会被禁用，且使用组件实例提交会失效。
:::

::: info
- 通过 `v-model` 属性，可以自动绑定输入框的值。不用赋值数据到 `v-model` 中。
- 通过 `@submit` 事件，可以触发输入框的提交事件，回传一个 `value` 参数，你可以在此处理提交的数据。
- 通过 `@cancel` 事件，可以触发 `loading` 按钮的点击事件。在这里你可以中止提交的操作。

你也可以通过组件 ref 实例对象进行调用

- `senderRef.value.submit()` 触发提交
- `senderRef.value.cancel()` 触发取消
- `senderRef.value.clear()` 重置输入框的值
:::
</docs>

<script setup lang="ts">
const senderRef = ref()
const timeValue = ref<NodeJS.Timeout | null>(null)
const senderValue = ref('')
const senderLoading = ref(false)
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
    <div style="display: flex;">
      <el-button type="primary" style="width: fit-content;" @click="senderRef.clear()">
        使用组件实例清空
      </el-button>
      <el-button type="primary" style="width: fit-content;" :disabled="!senderValue" @click="senderRef.submit()">
        使用组件实例提交
      </el-button>
      <el-button type="primary" style="width: fit-content;" @click="senderRef.cancel()">
        使用组件实例取消
      </el-button>
    </div>
    <MentionSender ref="senderRef" v-model="senderValue" :loading="senderLoading" clearable @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>
