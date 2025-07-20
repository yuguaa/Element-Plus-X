<docs>
---
title: 🐵 Support controlling Bubble component's play, pause/continue, and destroy. Support monitoring component state.
---

💩 Better control of interrupting output, continuing typing, and destroying operations
::: tip
😸 Built-in `Typewriter` component. All properties and methods of the `Typewriter` component are mounted on the `Bubble` component for convenient use in agile development.
:::

:::info
🐒 If you feel the built-in `Typewriter` component doesn't meet your needs, you can also use the `#content` slot for customized development of the `Bubble` component.
When using `#content`, the built-in `Typewriter` component will be disabled. In the slot, you can either combine it with `Typewriter` yourself or customize `stream requests`, `stream rendering`, and other personalized operations.
:::
</docs>

<script setup lang="ts">
import type { TypewriterInstance } from 'vue-element-plus-x/types/Typewriter';
import {
  Delete,
  RefreshLeft,
  VideoPause,
  VideoPlay
} from '@element-plus/icons-vue';

const markdownContent = ref(
  `# 🔥 Bubble Instance Methods-Events \n 😄 Make your typewriter highly customizable.\n - More convenient control of typewriter state \n - List item **bold text** and *italic text* \n \`\`\`javascript \n // 🙉 Check console for related logs\n console.log('Hello, world!'); \n \`\`\``
);

const isTypingValue = ref(false);
const progressValue = ref(0);
const bubbleRef = ref();
// Start typing monitoring method
function onStart(instance: TypewriterInstance) {
  console.log('Start typing: component ref instance', unref(instance));
  isTypingValue.value = true;
}
// During typing, progress monitoring method
function onWriting(instance: TypewriterInstance) {
  const progress: number = instance.progress.value;
  // Avoid printing onWriting event too many times 😂
  if (progress > 90 && progress < 100) {
    // Can directly get typing progress, can set cooler styles based on typing progress
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
      'Content when typing progress is 80%',
      instance.renderedContent.value
    );
  }
  isTypingValue.value = true;
  progressValue.value = ~~progress; // Use ~~ operator to round down 💩
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
  bubbleRef.value.interrupt();
  isTypingValue.value = false;
}
function onDestroy() {
  bubbleRef.value.destroy();
  isTypingValue.value = false;
  progressValue.value = 0;
}
</script>

<template>
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
        @click="bubbleRef?.continue()"
      >
        <el-icon :size="18">
          <VideoPlay />
        </el-icon>
        <span>Continue</span>
      </el-button>
      <el-button
        v-if="!isTypingValue && (progressValue === 0 || progressValue === 100)"
        type="primary"
        style="width: fit-content"
        @click="bubbleRef?.restart()"
      >
        <el-icon :size="18">
          <RefreshLeft />
        </el-icon>
        <span>Replay</span>
      </el-button>
      <el-button type="danger" style="width: fit-content" @click="onDestroy">
        <el-icon>
          <Delete />
        </el-icon>
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
    <Bubble
      ref="bubbleRef"
      :content="markdownContent"
      :typing="{ suffix: '💩', interval: 40 }"
      :is-markdown="true"
      @start="onStart"
      @writing="onWriting"
      @finish="onFinish"
    />
  </div>
</template>

<style module lang="less">
// Avoid markdown-body style being overridden
:deep(.markdown-body) {
  background: transparent;
}
</style>
