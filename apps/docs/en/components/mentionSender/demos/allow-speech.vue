<docs>
---
title: Speech Recognition
---

Built-in `speech recognition` functionality, just enable it through the `allowSpeech` property. It calls the browser's native speech recognition API, and when used in `Google Chrome`, it needs to be in a `🪄magic environment` to work properly.

::: info
If you don't want to use the built-in `speech recognition` functionality, you can listen to the recording state through the `@recording-change` event and implement the speech recognition functionality yourself.

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
    ElMessage.success('Started recording');
  } else {
    ElMessage.success('Stopped recording');
  }
}

function onsubmit() {
  ElMessage.success('Sent successfully');
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>Built-in speech recognition:</span>
    <MentionSender v-model="senderValue" allow-speech @submit="onsubmit" />

    <span>Custom speech recognition:</span>
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
    <MentionSender
      ref="senderRef"
      v-model="senderValue"
      allow-speech
      @recording-change="onRecordingChange"
    />
  </div>
</template>
