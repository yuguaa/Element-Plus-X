<script setup lang="ts">
import { ref } from 'vue';

// 复制状态和安装命令
const copied = ref(false);
const installCommand = 'pnpm install vue-element-plus-x';

// 文本内容直接定义，无需嵌套ref对象
const titleLine1 = 'Element Plus X';
const titleLine2 = 'Vue3 生成式AI组件库';
const subtitle =
  '💖开箱即用的 企业级 AI 交互组件库，让开发者 构建 AIGC 智能界面像搭积木一样简单。';
const getStartedText = '立即开始';

// 复制命令方法
async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
}

// 页面跳转
function handleClick() {
  location.href = '/zh/components/bubbleList';
}
</script>

<template>
  <!-- 首屏英雄区 -->
  <section
    class="relative min-h-screen px-4 flex items-center justify-center z-10"
  >
    <div class="max-w-4xl w-full py-10">
      <!-- 安装命令区域 -->
      <div
        class="bg-black/30 border border-white/20 rounded-2xl p-2 backdrop-blur-[15px] shadow-2xl max-w-md"
      >
        <span
          class="text-indigo-400 font-mono font-semibold px-2 text-sm md:text-base"
          >$</span
        >
        <span
          class="flex-1 text-white/90 font-mono text-sm md:text-base text-left px-2"
          >{{ installCommand }}</span
        >
        <button
          class="bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 hover:border-indigo-500/50 rounded-xl p-3 text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
          @click="copyInstallCommand"
        >
          <svg
            v-if="!copied"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg
            v-else
            class="text-green-500"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M19.633 6.226a1 1 0 0 1 .141 1.407l-9 11a1 1 0 0 1-1.481.074l-5-5a1 1 0 1 1 1.414-1.414l4.219 4.219l8.3-10.145a1 1 0 0 1 1.407-.141"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- 标题区域 -->
      <div class="my-5">
        <h1>
          <div class="title-line text-3xl md:text-4xl font-bold">
            {{ titleLine1 }}
          </div>
          <div class="title-line2 text-2xl md:text-3xl font-normal">
            {{ titleLine2 }}
          </div>
        </h1>

        <p class="py-4 text-lg md:text-xl text-white/80 leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <!-- 按钮区域 -->
      <div class="pt-4">
        <button
          class="inline-flex items-center gap-1.5 px-20 py-3 bg-neutral-950 text-white text-[1.25rem] font-600 rounded-full cursor-pointer"
          @click="handleClick"
        >
          <span class="text-xl">✨</span>
          <span>{{ getStartedText }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title-line {
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e2e8f0 25%,
    #6366f1 50%,
    #8b5cf6 75%,
    #ffffff 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGradient 4s ease-in-out infinite;
}

@keyframes titleGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
