<docs>
---
title: XRequest 【单独】 基础用法
---

这样你就简单的使用 `XRequest` 控制了 请求的发起 和 中断请求中的状态。
简单的 `new XRequest()`，实例化对象，然后 `.send()` 开始请求， `.abort()` 停止请求。

我们可以在 `控制台` 查看到，流式请求 **请求被终止**。
</docs>

<script setup lang="ts">
import { XRequest } from 'vue-element-plus-x'

const str = ref('')

const sse = new XRequest({
  baseURL: 'https://node-test.element-plus-x.com',
  onMessage: (msg: { data: string }) => {
    console.log('onMessage:', msg)
    str.value += `
    ${msg.data}`
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
