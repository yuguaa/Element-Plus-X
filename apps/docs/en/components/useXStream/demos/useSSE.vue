<docs>
---
title: SSE Basic Usage
---

This hook function is equivalent to the `XStream` method in `ant-design-x`, and we integrate the `Vue` development paradigm.

On this basis, we added `abort` handling for streaming requests, and moved the original hook function's configuration method into the `startStream` parameter, making it easier for developers to understand the purpose of this hook
</docs>

<script setup lang="ts">
import { useXStream } from 'vue-element-plus-x';

const { startStream, cancel, data, error, isLoading } = useXStream();

// Default support for SSE protocol
async function startSSE() {
  try {
    const response = await fetch(
      'https://node-test.element-plus-x.com/api/sse',
      {
        headers: { 'Content-Type': 'text/event-stream' }
      }
    );
    const readableStream = response.body!;
    await startStream({ readableStream });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// Bot content computed property
const content = computed(() => {
  if (!data.value.length) return '';
  let text = '';
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data;
    try {
      const parsedChunk = JSON.parse(chunk).content;
      text += parsedChunk;
    } catch (error) {
      // This end identifier is given by the backend, so we judge it this way
      // In actual projects, it should be based on project requirements
      if (chunk === ' [DONE]') {
        // Handle data completion
        // console.log('Data reception completed')
      } else {
        console.error('Error parsing data:', error);
      }
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
      <el-button :disabled="isLoading" @click="startSSE">
        {{ isLoading ? 'Loading...' : 'Get SSE Stream Data' }}
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
