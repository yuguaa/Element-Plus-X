<docs>
---
title: Action List Slot
---

::: warning
Before `version 1.0.81`, when using custom slots, the built-in action buttons would be sacrificed. In `version 1.0.81`, we launched streaming request hooks that allow users to better control streaming requests, thus better defining the `#action-list` slot themselves. For details, please check our project template's main request library, comparable to Axios [hook-fetch](https://www.npmjs.com/package/hook-fetch).

This friendly reminder was updated on: `2025-07-05`
:::

Use the `#action-list` slot to customize the action list content of the input box.

::: info
When you use the `#action-list` slot, the built-in action buttons of the input box will be hidden. You can combine it with `component instance methods` to implement richer operations.
:::
</docs>

<script setup lang="ts">
import {
  Delete,
  Loading,
  Operation,
  Position,
  Promotion,
  Right,
  Setting
} from '@element-plus/icons-vue';

const senderRef = ref();
const senderValue = ref('');
const loading = ref(false);

function handleSubmit() {
  console.log('submit', senderValue.value);
  senderRef.value.submit();
  loading.value = true;
}

function handleCancel() {
  console.log('cancel');
  loading.value = false;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Sender>
      <!-- Custom action list -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button type="danger" circle>
            <el-icon><Delete /></el-icon>
          </el-button>

          <el-button type="primary" circle style="rotate: -45deg">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>
      </template>
    </Sender>

    <Sender>
      <!-- Custom action list -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button type="primary" plain circle color="#626aef">
            <el-icon><Operation /></el-icon>
          </el-button>

          <el-button type="primary" circle color="#626aef">
            <el-icon><Right /></el-icon>
          </el-button>
        </div>
      </template>
    </Sender>

    <Sender>
      <!-- Custom action list -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button plain circle color="#eebe77">
            <el-icon><Setting /></el-icon>
          </el-button>

          <el-button type="primary" plain circle>
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>
      </template>
    </Sender>

    <Sender ref="senderRef" v-model="senderValue" :loading="loading">
      <!-- Custom action list -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button
            v-if="loading"
            type="primary"
            plain
            circle
            @click="handleCancel"
          >
            <el-icon class="is-loaidng">
              <Loading />
            </el-icon>
          </el-button>

          <el-button v-else plain circle @click="handleSubmit">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>
      </template>
    </Sender>
  </div>
</template>

<style module lang="less">
.action-list-self-wrap {
  display: flex;
  align-items: center;
  & > span {
    width: 120px;
    font-weight: 600;
    color: var(--el-color-primary);
  }
}

.is-loaidng {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
