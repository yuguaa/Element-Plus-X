<docs>
---
title: useSend 【单独】 使用场景
---

`sendHandler` 和 `abortHandler` 是两个函数，分别对应 `开始` 和 `中断` 的回调。

`abort` 方法 触发 `abortHandler` 回调

`abort` 方法 同时也会 结束 loading 状态
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
} from '@element-plus/icons-vue'
import { useSend } from 'vue-element-plus-x'

const { send, abort, loading } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('自定义语音按钮，结束录音！') },
})

const { send: send1, abort: abort1, loading: loading1 } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('自定义发送按钮，结束发送！') },
})

const { send: send2, abort: abort2, loading: loading2 } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('自定义播放按钮，结束播放！') },
})

const { send: send3, abort: abort3, loading: loading3 } = useSend({
  sendHandler: startFn,
  abortHandler: () => { ElMessage.info('自定义录制按钮，结束录制！') },
})

const type = ref('voice')

function startFn() {
  if (type.value === 'voice') {
    // 在这里做一个 异步操作，可以是发请求
    ElMessage.success('自定义语音按钮，开始录音！')
  }
  else if (type.value === 'sender') {
    ElMessage.success('自定义发送按钮，开始发送文本！')
  }
  else if (type.value === 'read') {
    ElMessage.success('自定义播放，开始播放啦！')
  }
  else if (type.value === 'record') {
    ElMessage.success('自定义录制，开始录制啦！')
  }
}
</script>

<template>
  <div class="btn-list">
    <!-- 语音按钮 -->
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

    <!-- 发送按钮 -->
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

    <!-- 播放按钮 -->
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

    <!-- 录制按钮 -->
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
