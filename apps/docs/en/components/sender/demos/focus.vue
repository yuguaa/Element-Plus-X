<docs>
---
title: Focus and Blur
---

Control focus through ref option.

::: info
Control through component instance

- `senderRef.value.focus('all')` Focus on the entire text (default)
- `senderRef.value.focus('start')` Focus at the beginning of the text
- `senderRef.value.focus('end')` Focus at the end of the text
- `senderRef.value.blur()` Lose focus
:::
</docs>

<script setup lang="ts">
const senderRef = ref();
const senderValue = ref('🐳 Welcome to use Element Plus X');
function blur() {
  senderRef.value.blur();
}

function focus(type = 'all') {
  senderRef.value.focus(type);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button dark type="success" plain @click="focus('start')">
        Beginning of text
      </el-button>
      <el-button dark type="success" plain @click="focus('end')">
        End of text
      </el-button>
      <el-button dark type="success" plain @click="focus('all')">
        Entire text
      </el-button>
      <el-button dark type="success" plain @click="blur">
        Lose focus
      </el-button>
    </div>
    <Sender ref="senderRef" v-model="senderValue" />
  </div>
</template>

<style module lang="less">
.header-self-wrap {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 200px;
  .header-self-title {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
  }
  .header-self-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #626aef;
    font-weight: 600;
  }
}
</style>
