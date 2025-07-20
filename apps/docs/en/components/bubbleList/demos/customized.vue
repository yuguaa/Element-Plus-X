<docs>
---
title: Custom List Display
---

🍋 Through `#avatar`, `#header`, `#content`, `#loading`, `#footer` slots, you can more flexibly control the bubble list rendering
</docs>

<script setup lang="ts">
import type {
  BubbleListItemProps,
  BubbleListProps
} from 'vue-element-plus-x/types/BubbleList';
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue';

type listType = BubbleListItemProps & {
  key: number;
  role: 'user' | 'ai';
};

// Example call
const bubbleItems = ref<BubbleListProps<listType>['list']>(
  generateFakeItems(5)
);
const avatar = ref('https://avatars.githubusercontent.com/u/76239030?v=4');
const avartAi = ref(
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
);
const switchValue = ref(false);
const loading = ref(false);

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user';
    const placement = role === 'ai' ? 'start' : 'end';
    const key = i + 1;
    messages.push({
      key,
      role,
      placement,
      noStyle: true // if you don't want to use the default bubble style
    });
  }
  return messages;
}

// Set loading for a specific item
function setLoading(loading: boolean) {
  bubbleItems.value[bubbleItems.value.length - 1].loading = loading;
  bubbleItems.value[bubbleItems.value.length - 2].loading = loading;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <span>Dynamically set content <el-switch v-model="switchValue" /></span>
      <span
        >Custom loading
        <el-switch
          v-model="loading"
          @change="(value: any) => setLoading(value as boolean)"
      /></span>
    </div>
    <BubbleList :list="bubbleItems" max-height="350px">
      <!-- Custom avatar -->
      <template #avatar="{ item }">
        <div class="avatar-wrapper">
          <img :src="item.role === 'ai' ? avartAi : avatar" alt="avatar" />
        </div>
      </template>

      <!-- Custom header -->
      <template #header="{ item }">
        <div class="header-wrapper">
          <div class="header-name">
            {{ item.role === 'ai' ? 'Element Plus X 🍧' : '🧁 User' }}
          </div>
        </div>
      </template>

      <!-- Custom bubble content -->
      <template #content="{ item }">
        <div class="content-wrapper">
          <div class="content-text">
            {{
              item.role === 'ai'
                ? `${switchValue ? `#ai-${item.key}：` : ''} 💖 Thank you for using Element Plus X! Your support is our strongest motivation for open source ~`
                : `${switchValue ? `#user-${item.key}：` : ''}Haha, let me try`
            }}
          </div>
        </div>
      </template>

      <!-- Custom footer -->
      <template #footer="{ item }">
        <div class="footer-wrapper">
          <div class="footer-container">
            <el-button type="info" :icon="Refresh" size="small" circle />
            <el-button type="success" :icon="Search" size="small" circle />
            <el-button type="warning" :icon="Star" size="small" circle />
            <el-button
              color="#626aef"
              :icon="DocumentCopy"
              size="small"
              circle
            />
          </div>
          <div class="footer-time">
            {{ item.role === 'ai' ? '2:32 PM' : '2:33 PM' }}
          </div>
        </div>
      </template>

      <!-- Custom loading -->
      <template #loading="{ item }">
        <div class="loading-container">
          <span>#{{ item.role }}-{{ item.key }}：</span>
          <span>I</span>
          <span>am</span>
          <span>a</span>
          <span>custom</span>
          <span>loading</span>
          <span>content</span>
          <span>~</span>
        </div>
      </template>
    </BubbleList>
  </div>
</template>

<style module lang="less">
.avatar-wrapper {
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.header-wrapper {
  .header-name {
    font-size: 14px;
    color: #979797;
  }
}

.content-wrapper {
  .content-text {
    font-size: 14px;
    color: #333;
    padding: 12px;
    background: linear-gradient(to right, #fdfcfb 0%, #ffd1ab 100%);
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.footer-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  .footer-time {
    font-size: 12px;
    margin-top: 3px;
  }
}

.footer-container {
  :deep(.el-button + .el-button) {
    margin-left: 8px;
  }
}

.loading-container {
  font-size: 14px;
  color: #333;
  padding: 12px;
  background: linear-gradient(to right, #fdfcfb 0%, #ffd1ab 100%);
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-container span {
  display: inline-block;
  margin-left: 8px;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.loading-container span:nth-child(4n) {
  animation: bounce 1.2s ease infinite;
}
.loading-container span:nth-child(4n + 1) {
  animation: bounce 1.2s ease infinite;
  animation-delay: 0.3s;
}
.loading-container span:nth-child(4n + 2) {
  animation: bounce 1.2s ease infinite;
  animation-delay: 0.6s;
}
.loading-container span:nth-child(4n + 3) {
  animation: bounce 1.2s ease infinite;
  animation-delay: 0.9s;
}
</style>
