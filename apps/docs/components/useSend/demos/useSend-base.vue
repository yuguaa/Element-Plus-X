<docs>
---
title: useSend 【单独】 基础用法
---

这个案例可以很好看出，这个 hooks 不与后端请求做交互，只是控制简单的 `loading` 状态。

`send` 方法 触发 `sendHandler` 回调
`finish` 方法 结束 loading 状态
</docs>

<script setup lang="ts">
import { useSend } from 'vue-element-plus-x'

const { send, finish, loading } = useSend({
  sendHandler: startFn,
})

async function startFn() {
  // 在这里做一个 异步操作，可以是发请求
  console.log('开始模拟请求')
}
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="loading" type="primary" @click="send">
        {{ loading ? '加载中...' : '模拟请求' }}
      </el-button>

      <el-button :disabled="!loading" @click="finish">
        结束请求
      </el-button>
    </div>
  </div>
</template>
