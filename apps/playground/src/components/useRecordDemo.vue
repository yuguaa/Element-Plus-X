<script setup lang="ts">
import { Eleme, Loading, Mic, Microphone, RefreshRight, Service } from '@element-plus/icons-vue'
import { useRecord } from 'vue-element-plus-x'

const { start, value: text, loading, stop } = useRecord({
  onEnd: handleEnd,
})
const value = ref('')
const senderRef = ref()

function handleStart() {
  start()
}

function handleEnd(res: string) {
  console.log('end:', res)
}

function submit() {
  console.log('submit:', text)
}

watch(text, (val) => {
  console.log('text:', val)
  value.value = val
}, { deep: true })
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="loading" @click="handleStart">
        {{ loading ? '录音中' : '开始录音' }}
      </el-button>
      <el-button :disabled="!loading" @click="stop">
        结束录音
      </el-button>
    </div>

    <p>浏览器API 录音的转文字结果：{{ text }}</p>
    <p>当你需要，自定义 输入框组件 - 操作列表 时。想保留浏览器API 语音识别功能，你可以使用 useRecord 这个 hooks 控制自定义按钮样式</p>

    <Sender
      ref="senderRef"
      v-model:value="value"
      @submit="submit"
    >
      <template #action-list>
        <div class="btn-list">
          <el-button v-if="!loading" :loading="loading" type="primary" circle plain color="#EC0078" @click="handleStart">
            <el-icon>
              <Mic />
            </el-icon>
          </el-button>

          <el-button v-else type="primary" circle color="#EC0078" :z-index="99" @click="stop">
            <el-icon class="loading">
              <Eleme />
            </el-icon>
          </el-button>
        </div>
      </template>
    </Sender>

    <Sender
      ref="senderRef"
      v-model:value="value"
      @submit="submit"
    >
      <template #action-list>
        <div class="btn-list">
          <el-button v-if="!loading" :loading="loading" type="primary" circle color="#626aef" @click="handleStart">
            <el-icon><Microphone /></el-icon>
          </el-button>

          <el-button v-else type="primary" circle color="#626aef" plain :z-index="99" @click="stop">
            <el-icon class="loading">
              <Loading />
            </el-icon>
          </el-button>
        </div>
      </template>
    </Sender>

    <Sender
      ref="senderRef"
      v-model:value="value"
      @submit="submit"
    >
      <template #action-list>
        <div class="btn-list">
          <el-button v-if="!loading" :loading="loading" type="primary" color="#FE0006" test @click="handleStart">
            <el-icon><Service /></el-icon>
          </el-button>

          <el-button v-else type="primary" color="#FE0006" plain :z-index="99" @click="stop">
            <el-icon class="loading">
              <RefreshRight />
            </el-icon>
          </el-button>
        </div>
      </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 15px;
  height: calc(100vh - 220px);
  overflow: auto;

  .btn-list {
    display: flex;
    gap: 12px;
    :deep() {
      .el-button {
        width: fit-content;
      }
    }
  }
  :deep() {
    .el-sender-action-list {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

// 旋转
.loading {
  animation: rotate 1s linear infinite;
}

// 旋转样式
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
