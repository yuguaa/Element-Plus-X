<docs>
---
title: useSend & XRequest Combined Usage
---
</docs>

<script setup lang="ts">
import { Promotion, Refresh } from '@element-plus/icons-vue';
import { useSend, XRequest } from 'vue-element-plus-x';

const str = ref<string>('');
let finish = () => {};

const sse = new XRequest({
  baseURL: 'https://node-test.element-plus-x.com',
  type: 'fetch',
  transformer: e => {
    console.log('transformer:', e);
    const a = e.trim().split('\n');
    const r = a.pop();
    return r;
  },
  onMessage: msg => {
    console.log('onMessage:', msg);
    str.value += `\n${msg}`;
  },
  onError: (es, e) => {
    console.log('onError:', es, e);
  },
  onOpen: () => {
    console.log('onOpen');
  },
  onAbort: messages => {
    console.log('onAbort', messages);
  },
  onFinish: data => {
    console.log('onFinish:', data);
    // When called here, eslint will report an error saying 'finish' was used before it was defined.
    // We only defined an empty finish method above and assign it below.
    // Actually, this just executes the finish method from useSend.
    finish();
  }
});

function startFn() {
  str.value = '';
  sse.send('/api/sse');
}

// The abort and finish methods of useSend are the same.
// To demonstrate that xrequest requests support manual abort and finish callbacks,
// a method named finish is also exposed in useSend.
const {
  send,
  loading,
  abort,
  finish: _finish
} = useSend({
  sendHandler: startFn,
  abortHandler: sse.abort
});

// Assign to top-level variable
finish = _finish;
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
