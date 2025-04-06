<script setup lang="ts">
import { useSend, XRequest } from 'vue-element-plus-x'

const str = ref<string>('')
let finish = () => {
}

const sse = new XRequest({
  baseURL: 'https://sse.dev',
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
    finish()
  },
})

function startFn() {
  str.value = ''
  sse.send('/test')
}

// useSend 的 abort 和 finish 是一样的方法。
// 为了体现 这边 xrequest 请求，支持手动中断，和结束回调。
// 所以 也在 useSend 中，也暴露了一个名字叫 finish 的方法。
const { send, loading, abort, finish: _finish } = useSend({
  sendHandler: startFn,
  abortHandler: sse.abort,
})

finish = _finish

setTimeout(() => {
  abort()
}, 20_000)
</script>

<template>
  <el-button v-if="!loading" @click="send">
    开始请求流式接口
  </el-button>
  <el-button v-else @click="abort">
    终止请求
  </el-button>
  <div>{{ str }}</div>
</template>
