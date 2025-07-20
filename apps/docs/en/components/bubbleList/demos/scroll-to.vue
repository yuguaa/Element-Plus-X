<docs>
---
title: Auto Scroll + Scroll to Specific Index
---

🍑 You can easily use the `bubbleListRef` component instance methods to control scrolling to a specific index.

::: info 🍒 Component Instance Methods
- `scrollToTop()`: Scroll to top
- `scrollToBottom()`: Scroll to bottom
- `scrollToBubble(index: number)`: Scroll to specified index
:::
</docs>

<script setup lang="ts">
import type {
  BubbleListItemProps,
  BubbleListProps
} from 'vue-element-plus-x/types/BubbleList';
import type { TypewriterProps } from 'vue-element-plus-x/types/Typewriter';

type listType = BubbleListItemProps & {
  key: number;
  role: 'user' | 'ai';
};

// Example call
const bubbleItems = ref<BubbleListProps<listType>['list']>(
  generateFakeItems(2)
);

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user';
    const placement = role === 'ai' ? 'start' : 'end';
    const key = i + 1;
    const content =
      role === 'ai'
        ? '💖 Thank you for using Element Plus X! Your support is our strongest motivation for open source ~'
        : `Haha, let me try`;
    const loading = false;
    const shape = 'corner';
    const variant = role === 'ai' ? 'filled' : 'outlined';
    const isMarkdown = false;
    const typing = false;
    const avatar =
      role === 'ai'
        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        : 'https://avatars.githubusercontent.com/u/76239030?v=4';

    messages.push({
      key,
      role,
      placement,
      content,
      loading,
      shape,
      variant,
      isMarkdown,
      typing,
      avatar,
      avatarSize: '32px'
    });
  }
  return messages;
}

const bubbleListRef = ref();
const num = ref(0);

function addMessage() {
  const i = bubbleItems.value.length;
  const isUser = !!(i % 2);
  const content = isUser
    ? 'Haha, let me try'
    : '💖 Thank you for using Element Plus X! Your support is our strongest motivation for open source ~'.repeat(
        5
      );
  const shape = 'corner';
  const variant = !isUser ? 'filled' : 'outlined';
  const placement = isUser ? 'end' : 'start';
  const typing: TypewriterProps['typing'] = isUser
    ? false
    : { step: 5, suffix: '🍆', interval: 35 };
  const avatar = isUser
    ? 'https://avatars.githubusercontent.com/u/76239030?v=4'
    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
  const obj = {
    key: i,
    role: isUser ? 'user' : 'ai',
    content,
    placement,
    typing,
    avatar,
    shape,
    variant,
    avatarSize: '32px',
    isFog: !isUser
  };
  bubbleItems.value.push(obj as listType);
  // Call scroll to bottom each time after adding to trigger auto-scroll
  scrollBottom();
}

function clearMessage() {
  bubbleItems.value = [];
}

function scrollToTop() {
  bubbleListRef.value.scrollToTop();
}

function scrollBottom() {
  bubbleListRef.value.scrollToBottom();
}

function scrollToBubble() {
  bubbleListRef.value.scrollToBubble(num.value);
}

onMounted(() => {
  setTimeout(() => {
    bubbleItems.value.map(item => {
      item.loading = false;
      return item;
    });
  }, 3000);
});
</script>

<template>
  <div class="component-container">
    <div class="top-wrap">
      <div class="btn-list">
        <el-button type="primary" plain @click="addMessage">
          Add Conversation
        </el-button>
        <el-button type="danger" plain @click="clearMessage">
          Clear Conversation List
        </el-button>
        <el-button type="primary" plain @click="scrollToTop">
          Scroll to Top
        </el-button>
        <el-button type="primary" plain @click="scrollBottom">
          Scroll to Bottom
        </el-button>
      </div>

      <div class="btn-list">
        <el-input-number
          v-model="num"
          :min="0"
          :max="10"
          controls-position="right"
        />
        <el-button type="primary" plain @click="scrollToBubble">
          Scroll to Bubble #{{ num }}
        </el-button>
      </div>
    </div>

    <div class="component-1">
      <BubbleList ref="bubbleListRef" :list="bubbleItems" max-height="350px" />
    </div>
  </div>
</template>

<style module lang="less">
.component-container {
  padding: 12px;

  .btn-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .top-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
}
</style>
