<docs>
---
title: 语音识别
---

内置 `语音识别` 功能，通过 `allowSpeech` 属性开启即可。调用浏览器原生的语音识别 API，在 `谷歌浏览器` 中使用，需要在 `🪄魔法环境` 中才能正常使用。

::: info
如果你不想使用内置的 `语音识别` 功能，可以通过 `@recording-change` 事件来监听录音状态，自行实现语音识别功能。

你也可以通过组件 ref 实例对象进行调用

- `senderRef.value.startRecognition()` 触发开始录音
- `senderRef.value.stopRecognition()` 触发结束录音
:::
</docs>

<script setup lang="ts">
const senderRef = ref()
const senderValue = ref('')
function onRecordingChange(recording: boolean) {
  if (recording) {
    ElMessage.success('开始录音')
  }
  else {
    ElMessage.success('结束录音')
  }
}

function onsubmit() {
  ElMessage.success('发送成功')
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <span>内置语音识别：</span>
    <MentionSender v-model="senderValue" allow-speech @submit="onsubmit" />

    <span>自定义语音识别：</span>
    <div style="display: flex;">
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="senderRef.startRecognition()"
      >
        使用组件实例 开始录音
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="senderRef.stopRecognition()"
      >
        使用组件实例 结束录音
      </el-button>
    </div>
    <MentionSender ref="senderRef" v-model="senderValue" allow-speech @recording-change="onRecordingChange" />
  </div>
</template>
