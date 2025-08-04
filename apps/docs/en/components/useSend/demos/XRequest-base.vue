<docs>
---
title: XRequest Basic Usage (Standalone)
---

This way you can simply use `XRequest` to control the initiation and aborting of requests and their states.
A simple `new XRequest()` instantiates the object, then `.send()` starts the request, `.abort()` stops the request.

You can check the console to see that the streaming request **has been terminated**.
</docs>

<script setup lang="ts">
import { XRequest } from 'vue-element-plus-x';

const str = ref('');

const sse = new XRequest({
  baseURL: 'https://node-test.element-plus-x.com',
  onMessage: (msg: { data: string }) => {
    console.log('onMessage:', msg);
    str.value += `\n    ${msg.data}`;
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

      <el-button @click="sse.abort()">
        Abort Request
      </el-button>
    </div>

    <div>{{ str }}</div>
  </div>
</template>
