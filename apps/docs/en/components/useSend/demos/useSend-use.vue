<docs>
---
title: useSend Usage Scenarios (Standalone)
---

`sendHandler` and `abortHandler` are two functions, corresponding to the callbacks for `start` and `abort`.

The `abort` method triggers the `abortHandler` callback.

The `abort` method will also end the loading state.
</docs>

<script setup lang="ts">
import {
  Aim,
  Loading,
  Microphone,
  Promotion,
  Refresh,
  VideoCamera,
  VideoPause,
  VideoPlay,
} from '@element-plus/icons-vue';
import { useSend } from 'vue-element-plus-x';

const { send, abort, loading } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('Custom voice button, end recording!'); },
});

const { send: send1, abort: abort1, loading: loading1 } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('Custom send button, end sending!'); },
});

const { send: send2, abort: abort2, loading: loading2 } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('Custom play button, end playing!'); },
});

const { send: send3, abort: abort3, loading: loading3 } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('Custom record button, end recording!'); },
});

const type = ref('voice');

function startFn() {
  if (type.value === 'voice') {
    // Here you can do an async operation, such as making a request
    ElMessage.success('Custom voice button, start recording!');
  }
  else if (type.value === 'sender') {
    ElMessage.success('Custom send button, start sending text!');
  }
  else if (type.value === 'read') {
    ElMessage.success('Custom play button, start playing!');
  }
  else if (type.value === 'record') {
    ElMessage.success('Custom record button, start recording!');
  }
}
</script>

<template>
  <div class="btn-list">
    <!-- Voice button -->
    <el-button
      v-if="!loading"
      color="#9145c8"
      circle
      size="large"
      @click="() => { type = 'voice'; send(); }"
    >
      <el-icon><Microphone /></el-icon>
    </el-button>

    <el-button
      v-if="loading"
      color="#9145c8"
      circle
      size="large"
      @click="() => { type = 'voice'; abort(); }"
    >
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
    </el-button>

    <!-- Send button -->
    <el-button
      v-if="!loading1"
      color="#c2306a"
      round
      plain
      size="large"
      @click="() => { type = 'sender'; send1(); }"
    >
      <el-icon><Promotion /></el-icon>
    </el-button>

    <el-button
      v-if="loading1"
      color="#c2306a"
      round
      plain
      size="large"
      @click="() => { type = 'sender'; abort1(); }"
    >
      <el-icon class="is-loading">
        <Refresh />
      </el-icon>
    </el-button>

    <!-- Play button -->
    <el-button
      v-if="!loading2"
      size="large"
      type="success"
      color="#ff7f7f"
      @click="() => { type = 'read'; send2(); }"
    >
      <el-icon style="font-size: 20px; color: #fff">
        <VideoPlay />
      </el-icon>
    </el-button>

    <el-button
      v-if="loading2"
      size="large"
      type="success"
      color="#ff7f7f"
      @click="() => { type = 'read'; abort2(); }"
    >
      <el-icon style="font-size: 20px; color: #fff" class="is-loading">
        <VideoPause />
      </el-icon>
    </el-button>

    <!-- Record button -->
    <el-button
      v-if="!loading3"
      size="large"
      circle
      color="#fff884"
      @click="() => { type = 'record'; send3(); }"
    >
      <el-icon style="color: #104674;">
        <VideoCamera />
      </el-icon>
    </el-button>

    <el-button
      v-if="loading3"
      size="large"
      circle
      color="#fff884"
      @click="() => { type = 'record'; abort3(); }"
    >
      <el-icon style="color: #104674;" class="is-loading">
        <Aim />
      </el-icon>
    </el-button>
  </div>
</template>
