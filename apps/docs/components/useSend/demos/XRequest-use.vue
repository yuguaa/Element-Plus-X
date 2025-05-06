<docs>
---
title: XRequest【单独】 全部属性
---

在 `new XRequest()` 中传入对应的配置项

`transformer` 可以对内应的响应数据进行转换处理，还提供了很多配置的 `回调方法`，供开发者使用。

大家也可在 `控制台` 查看 回调方法的打印
</docs>

<script setup lang="ts">
import { XRequest } from 'vue-element-plus-x'

const str = ref('')

const sse = new XRequest({
  baseURL: 'https://node-test.element-plus-x.com',
  type: 'fetch',
  transformer: (e) => {
    console.log('transformer:', e)
    const a = e.trim().split('\n')
    const r = a.pop()
    return r
  },
  onMessage: (msg) => {
    console.log('onMessage:', msg)
    str.value += `\n${msg}`
  },
  onError: (es, e) => {
    console.log('onError:', es, e)
  },
  onOpen: () => {
    console.log('onOpen')
  },
  onAbort: (messages) => {
    console.log('onAbort', messages)
  },
  onFinish: (data) => {
    console.log('onFinish:', data)
  },
})
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button @click="() => { str = ''; sse.send('/api/sse') }">
        发起请求
      </el-button>

      <el-button @click="sse.abort()">
        取消请求
      </el-button>
    </div>

    <div>{{ str }}</div>
  </div>
</template>
