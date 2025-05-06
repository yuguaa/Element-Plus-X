<docs>
---
title: 🐵 支持控制组件 播放、中断/继续、 销毁。支持监听组件状态。
---

💩 更好的控制中断输出、继续打字和销毁等操作
你可以通过组件的 `ref` 实例获取以下方法和属性：
- `interrupt` 中断打字过程 `typerRef.interrupt()`
- `continue` 继续未完成的打字 `typerRef.continue()`
- `restart` 重新开始打字 `typerRef.restart()`
- `destroy` 销毁组件（清理资源） `typerRef.destroy()`
- `renderedContent` 获取当前渲染的内容。 `typerRef.renderedContent.value`
- `isTyping` 获取当前是否正在打字。 `typerRef.isTyping.value`
- `progress` 获取当前进度百分比。 `typerRef.progress.value`

::: tip
你还可以设置组件的监听事件，获取组件的状态。
- `@start` 打字开始时触发
- `@finish` 打字结束时触发
- `@writing` 打字时触发

三个方法，默认参数返回组件实例。
:::
</docs>

<script setup lang="ts">
import type { TypewriterInstance } from 'vue-element-plus-x/types/typewriter'
import { Delete, RefreshLeft, VideoPause, VideoPlay } from '@element-plus/icons-vue'

const markdownContent = ref(`# 🔥 Typewriter 实例方法-事件 \n 😄 使你的打字器可高度定制化。\n - 更方便的控制打字器的状态 \n - 列表项 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n // 🙉 控制台可以查看相关打日志\n console.log('Hello, world!'); \n \`\`\``)

const isTypingValue = ref(false)
const progressValue = ref(0)
const typerRef = ref()
// 开始打字的监听方法
function onStart(instance: TypewriterInstance) {
  console.log('开始打字：组件 ref 实例', unref(instance))
  isTypingValue.value = true
}
// 打字中，进度监听方法
function onWriting(instance: TypewriterInstance) {
  const progress: number = instance.progress.value
  // 避免打印打多次 onWriting 事件 😂
  if (progress > 90 && progress < 100) {
    // 可以直接获取打字进度，可以根据打字进度，设置更炫酷的样式
    // console.log('Writing', `${progress}%`)
    console.log('打字中 isTyping:', instance.isTyping.value, 'progress:', progress)
  }

  if (~~progress === 80) {
    console.log('打字中 progress 为 80% 时候的内容', instance.renderedContent.value)
  }
  isTypingValue.value = true
  progressValue.value = ~~progress // 通过运算符~~取整 💩
}
// 监听打字结束事件
function onFinish(instance: TypewriterInstance) {
  isTypingValue.value = false
  console.log('打字结束 isTyping', instance.isTyping.value, 'progress:', instance.progress.value)
}
// 组件实例方法，控制 暂停打字
function onInterrupt() {
  typerRef.value.interrupt()
  isTypingValue.value = false
}
function onDestroy() {
  typerRef.value.destroy()
  isTypingValue.value = false
  progressValue.value = 0
}
</script>

<template>
  <ClientOnly>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex;">
        <el-button v-if="isTypingValue" type="warning" style="width: fit-content;" @click="onInterrupt">
          <el-icon :size="18">
            <VideoPause />
          </el-icon>
          <span>暂停</span>
        </el-button>
        <el-button v-if="!isTypingValue && (progressValue !== 0 && progressValue !== 100)" type="success" style="width: fit-content;" @click="typerRef?.continue()">
          <el-icon :size="18">
            <VideoPlay />
          </el-icon>
          <span>继续</span>
        </el-button>
        <el-button v-if="!isTypingValue && (progressValue === 0 || progressValue === 100)" type="primary" style="width: fit-content;" @click="typerRef?.restart()">
          <el-icon :size="18">
            <RefreshLeft />
          </el-icon>
          <span>重播</span>
        </el-button>
        <el-button type="danger" style="width: fit-content;" @click="onDestroy">
          <el-icon><Delete /></el-icon>
          <span>销毁</span>
        </el-button>
      </div>

      <el-progress v-if="progressValue > 0 && progressValue !== 100" :duration="0" :percentage="progressValue" />
      <el-progress v-if=" progressValue === 100" :percentage="100" status="success" />

      <!-- 这里展示了如果是 markdown 的话，typing.suffix 会被忽略 -->
      <Typewriter
        ref="typerRef" :content="markdownContent" :typing="{ suffix: '💩', interval: 40 }" :is-markdown="true"
        @start="onStart" @writing="onWriting" @finish="onFinish"
      />
    </div>
  </ClientOnly>
</template>
