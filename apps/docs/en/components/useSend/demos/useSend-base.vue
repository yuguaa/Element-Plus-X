<docs>
---
title: useSend Basic Usage (Standalone)
---

This example clearly shows that this hook doesn't interact with backend requests, it only controls simple `loading` state.

`send` method triggers `sendHandler` callback
`finish` method ends loading state
</docs>

<script setup lang="ts">
import { useSend } from 'vue-element-plus-x';

const { send, finish, loading } = useSend({
  sendHandler: startFn,
});

async function startFn() {
  // Here you can do an async operation, such as making a request
  console.log('Start simulating request');
}
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="loading" type="primary" @click="send">
        {{ loading ? 'Loading...' : 'Simulate Request' }}
      </el-button>

      <el-button :disabled="!loading" @click="finish">
        End Request
      </el-button>
    </div>
  </div>
</template>
