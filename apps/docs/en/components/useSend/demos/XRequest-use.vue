<docs>
---
title: XRequest All Properties (Standalone)
---

Pass the corresponding configuration items in `new XRequest()`

`transformer` can process and transform the response data, and many configuration callback methods are also provided for developers to use.

You can also check the console to see the printout of the callback methods.
</docs>

<script setup lang="ts">
import { XRequest } from 'vue-element-plus-x';

const str = ref('');

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
  }
});
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button
        @click="
          () => {
            str = '';
            sse.send('/api/sse');
          }
        "
      >
        Start Request
      </el-button>

      <el-button @click="sse.abort()"> Abort Request </el-button>
    </div>

    <div>{{ str }}</div>
  </div>
</template>
