<docs>
---
title: Voice Recognition
---

Built-in `voice recognition` functionality, enable it through the `allowSpeech` property. It calls the browser's native voice recognition API, and when used in `Google Chrome`, it needs to be in a `🪄magic environment` to work properly.

::: info
If you don't want to use the built-in `voice recognition` functionality, you can listen to the recording state through the `@recording-change` event and implement voice recognition functionality yourself.

You can also call through the component ref instance object

- `senderRef.value.startRecognition()` Trigger start recording
- `senderRef.value.stopRecognition()` Trigger stop recording
:::
</docs>

<script setup lang="ts">
const senderRef = ref();
const senderValue = ref('');
function onRecordingChange(recording: boolean) {
  if (recording) {
    ElMessage.success('Start recording');
  }
  else {
    ElMessage.success('Stop recording');
  }
}

function onsubmit() {
  ElMessage.success('Sent successfully');
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>Built-in voice recognition:</span>
    <Sender v-model="senderValue" allow-speech @submit="onsubmit" />

    <span>Custom voice recognition:</span>
    <div style="display: flex">
      <el-button
        type="primary"
        style="width: fit-content"
        @click="senderRef.startRecognition()"
      >
        Start recording using component instance
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content"
        @click="senderRef.stopRecognition()"
      >
        Stop recording using component instance
      </el-button>
    </div>
    <Sender
      ref="senderRef"
      v-model="senderValue"
      allow-speech
      @recording-change="onRecordingChange"
    />
  </div>
</template>
