<docs>
---
title: 🐵 Support Component Control Play, Interrupt/Continue, Destroy. Support Component State Monitoring
---

💩 Better control over interrupting output, continuing typing, and destroying operations
You can get the following methods and properties through the component's `ref` instance:
- `interrupt` Interrupt typing process `typerRef.interrupt()`
- `continue` Continue unfinished typing `typerRef.continue()`
- `restart` Restart typing `typerRef.restart()`
- `destroy` Destroy component (clean up resources) `typerRef.destroy()`
- `renderedContent` Get current rendered content. `typerRef.renderedContent.value`
- `isTyping` Get whether currently typing. `typerRef.isTyping.value`
- `progress` Get current progress percentage. `typerRef.progress.value`

::: tip
You can also set component monitoring events to get component state.
- `@start` Triggered when typing starts
- `@finish` Triggered when typing ends
- `@writing` Triggered during typing

Three methods, default parameter returns component instance.
:::
</docs>

<script setup lang="ts">
import type { TypewriterInstance } from 'vue-element-plus-x/types/typewriter';
import {
  Delete,
  RefreshLeft,
  VideoPause,
  VideoPlay
} from '@element-plus/icons-vue';

const markdownContent = ref(
  `# 🔥 Typewriter Instance Methods-Events \n 😄 Make your typewriter highly customizable.\n - More convenient control of typewriter state \n - List item **bold text** and *italic text* \n \`\`\`javascript \n // 🙉 Console can view related typing logs\n console.log('Hello, world!'); \n \`\`\``
);

const isTypingValue = ref(false);
const progressValue = ref(0);
const typerRef = ref();
// Start typing monitoring method
function onStart(instance: TypewriterInstance) {
  console.log('Start typing: component ref instance', unref(instance));
  isTypingValue.value = true;
}
// During typing, progress monitoring method
function onWriting(instance: TypewriterInstance) {
  const progress: number = instance.progress.value;
  // Avoid printing multiple onWriting events 😂
  if (progress > 90 && progress < 100) {
    // Can directly get typing progress, can set more cool styles based on typing progress
    // console.log('Writing', `${progress}%`)
    console.log(
      'Typing isTyping:',
      instance.isTyping.value,
      'progress:',
      progress
    );
  }

  if (~~progress === 80) {
    console.log(
      'Typing content when progress is 80%',
      instance.renderedContent.value
    );
  }
  isTypingValue.value = true;
  progressValue.value = ~~progress; // Use operator ~~ to round down 💩
}
// Monitor typing end event
function onFinish(instance: TypewriterInstance) {
  isTypingValue.value = false;
  console.log(
    'Typing finished isTyping',
    instance.isTyping.value,
    'progress:',
    instance.progress.value
  );
}
// Component instance method, control pause typing
function onInterrupt() {
  typerRef.value.interrupt();
  isTypingValue.value = false;
}
function onDestroy() {
  typerRef.value.destroy();
  isTypingValue.value = false;
  progressValue.value = 0;
}
</script>

<template>
  <ClientOnly>
    <div style="display: flex; flex-direction: column; gap: 12px">
      <div style="display: flex">
        <el-button
          v-if="isTypingValue"
          type="warning"
          style="width: fit-content"
          @click="onInterrupt"
        >
          <el-icon :size="18">
            <VideoPause />
          </el-icon>
          <span>Pause</span>
        </el-button>
        <el-button
          v-if="!isTypingValue && progressValue !== 0 && progressValue !== 100"
          type="success"
          style="width: fit-content"
          @click="typerRef?.continue()"
        >
          <el-icon :size="18">
            <VideoPlay />
          </el-icon>
          <span>Continue</span>
        </el-button>
        <el-button
          v-if="
            !isTypingValue && (progressValue === 0 || progressValue === 100)
          "
          type="primary"
          style="width: fit-content"
          @click="typerRef?.restart()"
        >
          <el-icon :size="18">
            <RefreshLeft />
          </el-icon>
          <span>Replay</span>
        </el-button>
        <el-button type="danger" style="width: fit-content" @click="onDestroy">
          <el-icon><Delete /></el-icon>
          <span>Destroy</span>
        </el-button>
      </div>

      <el-progress
        v-if="progressValue > 0 && progressValue !== 100"
        :duration="0"
        :percentage="progressValue"
      />
      <el-progress
        v-if="progressValue === 100"
        :percentage="100"
        status="success"
      />

      <!-- This shows that if it's markdown, typing.suffix will be ignored -->
      <Typewriter
        ref="typerRef"
        :content="markdownContent"
        :typing="{ suffix: '💩', interval: 40 }"
        :is-markdown="true"
        @start="onStart"
        @writing="onWriting"
        @finish="onFinish"
      />
    </div>
  </ClientOnly>
</template>
