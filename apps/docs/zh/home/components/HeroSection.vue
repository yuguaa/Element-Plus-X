<script setup lang="ts">
import { ref } from 'vue';

// 复制状态和安装命令
const copied = ref(false);
const installCommand = 'pnpm install vue-element-plus-x';

// 文本内容
const titleLine1 = 'Element Plus X';
const titleLine2 = 'Vue3 生成式AI组件库';
const subtitle =
  '💖开箱即用的 企业级 AI 交互组件库，让开发者 构建 AIGC 智能界面像搭积木一样简单。';
const getStartedText = '快速开始';
const previewText = '组件预览';
const githubText = 'GitHub';

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

// 在线预览
function handlePreview() {
  // 在线预览链接
  window.open('https://v.element-plus-x.com', '_blank');
}

// GitHub链接
function handleGithub() {
  // GitHub仓库链接
  window.open('https://github.com/element-plus-x/Element-Plus-X', '_blank');
}
</script>

<template>
  <!-- 首屏英雄区 -->
  <section
    class="relative items-center z-10 max-w-[1200px] mx-auto mt-30 mb-30 flex justify-between"
  >
    <div class="left-container">
      <!-- 标题区域 - 突出主标题 -->
      <div class="mt-8 mb-4">
        <h1 class="text-align-left! p-0!">
          <div
            class="title-line text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tight"
          >
            {{ titleLine1 }}
          </div>
          <div
            class="title-line2 text-2xl md:text-2xl lg:text-4xl font-medium mt-2 mb-0"
          >
            {{ titleLine2 }}
          </div>
        </h1>

        <p
          class="text-media md:py-5 text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- 按钮区域 - 增加两个按钮 -->
      <div class="pt-4 md:pt-0 flex flex-wrap gap-4 btn-container">
        <button
          class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[1.15rem] font-semibold rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
          @click="handleClick"
        >
          <span class="text-xl">✨</span>
          <span>{{ getStartedText }}</span>
        </button>

        <button
          class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[1.15rem] font-semibold rounded-full cursor-pointer transition-all duration-300 border border-white/20"
          @click="handlePreview"
        >
          <span class="text-xl">🐳</span>
          <span>{{ previewText }}</span>
        </button>

        <button
          class="inline-flex items-center gap-2 px-8 py-4 bg-black/50 hover:bg-black/70 text-white text-[1.15rem] font-semibold rounded-full cursor-pointer transition-all duration-300 border border-white/10"
          @click="handleGithub"
        >
          <img
            src="https://github.githubassets.com/assets/apple-touch-icon-144x144-b882e354c005.png"
            class="w-6 h-6 rounded-full"
            alt=""
          />
          <span>{{ githubText }}</span>
        </button>
      </div>

      <!-- 安装命令区域 - 移至底部 -->
      <div
        class="flex items-center mt-0 md:mt-10 bg-black/30 border border-white/20 rounded-2xl p-3 backdrop-blur-[15px] shadow-2xl max-w-md install-container"
      >
        <span
          class="text-indigo-400 font-mono font-semibold px-2 text-sm md:text-base select-none"
          >$</span
        >
        <span
          class="flex-1 text-white/90 font-mono md:text-base text-left px-2"
          >{{ installCommand }}</span
        >
        <button
          class="bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 hover:border-indigo-500/50 rounded-xl p-3 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 mr-auto"
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
    </div>

    <div class="right-container">
      <div class="glow-container">
        <img
          src="https://element-plus-x.com/logo.png"
          class="w-[256px] h-[256px] relative z-10"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.title-line {
  background: linear-gradient(
    135deg,
    #98ff53 0%,
    #ff1381 25%,
    #8b5cf6 50%,
    #ff1381 75%,
    #f5ff69 100%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGradient 4s ease-in-out infinite;
  display: inline-block;
}

.title-line2 {
  background-size: 100% 100%;
  background: linear-gradient(135deg, #7eff28 0%, #ff1381 35%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes titleGradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* 发光流动效果 */
.right-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.glow-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glow-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.5) 0%,
    rgba(139, 92, 246, 0) 70%
  );
  z-index: 0;
  animation: glowPulse 3s ease-in-out infinite;
}

.glow-container::after {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.6) 0%,
    rgba(99, 102, 241, 0) 70%
  );
  z-index: -1;
  animation: glowFlow 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes glowFlow {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 0.5;
  }
}

/* 增加响应式调整 */
@media (max-width: 1200px) {
  .left-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;

    h1 {
      text-align: center !important;
      margin-bottom: 30px;
    }

    p {
      margin-bottom: 1.875rem;
    }
  }
  .right-container {
    display: none;
  }
  /* 居中展示 */
  .text-media {
    padding: 0 24px;
    text-align: center;
  }
  .btn-container {
    justify-content: center;
  }
  .install-container {
    justify-content: center;
    width: calc(100% - 48px);
    margin: 20px 24px 0;
    font-size: 0.75rem;
  }
}

@media (max-width: 840px) {
  .title-line {
    font-size: 4rem;
  }

  .title-line2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .title-line {
    font-size: 3rem;
  }

  .title-line2 {
    font-size: 1.5rem;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>
