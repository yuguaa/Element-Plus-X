<docs>
---
title: Basic Usage of SSE
---

This hook function is aligned with `ant-design-x`'s `XStream` method, and we have integrated the `Vue` development paradigm.

On this basis, we have added `interrupt` handling for streaming requests, and placed the original hook function's configuration method in the `startStream` parameter, making it easier for developers to understand the purpose of this hook.
</docs>

<script setup lang="ts">
import { useXStream } from 'vue-element-plus-x';

const { startStream, cancel, data, error, isLoading } = useXStream();

// SSE protocol is supported by default
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
  }
  catch (err) {
    console.error('Fetch error:', err);
  }
}

// Robot content computed property
const content = computed(() => {
  if (!data.value.length)
    return '';
  let text = '';
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data;
    try {
      const parsedChunk = JSON.parse(chunk).content;
      text += parsedChunk;
    }
    catch (error) {
      // This end flag is given by the backend, so judge like this here
      // In actual projects, follow project requirements
      if (chunk === ' [DONE]') {
        // Handle data end
        // console.log('Data reception complete')
      }
      else {
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
        Cancel Request
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

<style scoped lang="less">
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
