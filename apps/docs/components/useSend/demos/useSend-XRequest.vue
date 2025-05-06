<docs>
---
title: useSend & XRequest【组合使用】
---
</docs>

<script setup lang="ts">
import { Promotion, Refresh } from '@element-plus/icons-vue'
import { useSend, XRequest } from 'vue-element-plus-x'

const str = ref<string>('')
let finish = () => {}

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
    // 这里调用的时候，会报 eslint 错误，说我们在使用前未定义
    // 'finish' was used before it was defined.
    // 我们只有在 上面定义一个 finish 空方法，在下面进行赋值
    // 其实这里就是执行，useSend 的 finish 方法
    finish()
  },
})

function startFn() {
  str.value = ''
  sse.send('/api/sse')
}

// useSend 的 abort 和 finish 是一样的方法。
// 为了体现 这边 xrequest 请求，支持手动中断，和 结束回调。
// 所以 也在 useSend 中，也暴露了一个名字叫 finish 的方法。
const { send, loading, abort, finish: _finish } = useSend({
  sendHandler: startFn,
  abortHandler: sse.abort,
})

// 给顶层变量赋值
finish = _finish
</script>

<template>
  <div class="btn-list">
    <el-button
      v-if="!loading"
      color="#c2306a"
      round
      plain
      size="large"
      @click="send"
    >
      <el-icon><Promotion /></el-icon>
    </el-button>

    <el-button
      v-if="loading"
      color="#c2306a"
      round
      plain
      size="large"
      @click="abort"
    >
      <el-icon class="is-loading">
        <Refresh />
      </el-icon>
    </el-button>

    <div>{{ str }}</div>
  </div>
</template>
