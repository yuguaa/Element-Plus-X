<docs>
---
title: SIP Basic Usage
---

This demonstrates support for the SIP protocol
</docs>

<script setup lang="ts">
import { useXStream } from 'vue-element-plus-x';

const { startStream, cancel, data, error, isLoading } = useXStream();

async function startSIPStream() {
  try {
    const response = await fetch(
      'https://node-test.element-plus-x.com/api/sip',
      {
        headers: { 'Content-Type': 'application/sip' }
      }
    );
    const readableStream = response.body!;

    // Custom transformStream to handle SIP data
    const sipTransformStream = new TransformStream<string, any>({
      transform(chunk, controller) {
        // SIP data parsing logic can be added here
        controller.enqueue(chunk);
      }
    });

    await startStream({ readableStream, transformStream: sipTransformStream });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// Computed property
const content = computed(() => {
  if (!data.value.length) return '';
  let text = '';
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index];
    try {
      console.log('chunk', chunk);
      text += chunk;
    } catch (error) {
      console.error('Error parsing data:', error);
    }
    // console.log('New chunk:', chunk)
  }
  console.log('Text:', text);
  return text;
});
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="isLoading" @click="startSIPStream">
        {{ isLoading ? 'Loading...' : 'Get SIP Protocol Data' }}
      </el-button>

      <el-button :disabled="!isLoading" @click="cancel()">
        Abort Request
      </el-button>
    </div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>

    <Bubble
      v-if="content"
      :content="content"
      is-markdown
      style="width: calc(100% - 12px)"
    />
  </div>
</template>

<style module lang="less">
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  .el-button {
    width: fit-content;
  }
  :deep(.markdown-body) {
    background-color: transparent;
    padding: 12px;
  }
}
</style>
