<script setup lang="ts">
import { useXStream } from 'vue-element-plus-x/src/hooks/useXStream'

const { startStream, cancel, data, error, isLoading } = useXStream()

async function startSSE() {
  try {
    const response = await fetch('https://node-test.element-plus-x.com/api/sse', {
      headers: { 'Content-Type': 'text/event-stream' },
    })
    const readableStream = response.body!
    await startStream({ readableStream })
  }
  catch (err) {
    console.error('Fetch error:', err)
  }
}

// 机器人的 content 计算属性
const content = computed(() => {
  if (!data.value.length)
    return ''
  let text = ''
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data
    try {
      const parsedChunk = JSON.parse(chunk).content
      text += parsedChunk
    }
    catch (error) {
      if (chunk === ' [DONE]') {
        // 处理数据结束的情况
        // console.log('数据接收完毕')
      }
      else {
        console.error('解析数据时出错:', error)
      }
    }
    // console.log('New chunk:', chunk)
  }
  console.log('Text:', text)
  return text
})
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="isLoading" @click="startSSE">
        {{ isLoading ? '加载中...' : '获取流数据' }}
      </el-button>

      <el-button :disabled="!isLoading" @click="cancel()">
        中断请求
      </el-button>
    </div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>

    <Bubble v-if="content" :content="content" is-markdown max-width="700px" />
  </div>
</template>

<style scoped lang="scss">
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
