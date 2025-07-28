<script setup lang="ts">
import type {
  BubbleListItemProps,
  BubbleListProps
} from 'vue-element-plus-x/types/BubbleList';

import { computed, ref } from 'vue';

// 简单的语言检测（可以从 URL 或者其他地方获取）
const currentLang = ref<'zh' | 'en'>('zh');
// 复制状态
const copied = ref(false);

// 国际化文本
const i18n = {
  zh: {
    badge: 'ELEMENT PLUS X',
    version: 'v2.0',
    title: {
      line1: 'Element Plus X',
      line2: '🚀AI体验新秩序'
    },
    subtitle:
      '❤️‍🔥开箱即用的企业级 AI 交互组件库，让构建智能界面像搭积木一样简单。 RICH 设计范式，打造卓越 AI 界面解决方案，引领智能新体验。❤️‍🔥',
    features: {
      fast: '极速开发',
      modern: '现代设计',
      safe: '类型安全'
    },
    stats: {
      components: '组件',
      downloads: '下载量',
      satisfaction: '满意度'
    },
    buttons: {
      getStarted: '立即开始',
      viewDocs: '查看文档'
    },
    quickStart: {
      description: '立即开始使用 Element Plus X，只需一行命令即可安装',
      command: 'npm install element-plus-x'
    }
  },
  en: {
    badge: 'ELEMENT PLUS X',
    version: 'v2.0',
    title: {
      line1: 'Build Future',
      line2: 'UI Experience'
    },
    subtitle:
      'Next-generation Vue 3 component library, combining Linear design language with glassmorphism aesthetics to provide ultimate user experience for modern Web applications',
    features: {
      fast: 'Fast Development',
      modern: 'Modern Design',
      safe: 'Type Safe'
    },
    stats: {
      components: 'Components',
      downloads: 'Downloads',
      satisfaction: 'Satisfaction'
    },
    buttons: {
      getStarted: 'Get Started',
      viewDocs: 'View Docs'
    },
    quickStart: {
      description:
        'Get started with Element Plus X immediately, just one command to install',
      command: 'npm install element-plus-x'
    }
  }
} as const;

type listType = BubbleListItemProps & {
  key: number;
  role: 'user' | 'ai';
};

// 示例调用
const list: BubbleListProps<listType>['list'] = generateFakeItems(5);

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user';
    const placement = role === 'ai' ? 'start' : 'end';
    const key = i + 1;
    const content =
      role === 'ai'
        ? '💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~'.repeat(
            5
          )
        : `哈哈哈，让我试试`;
    const loading = false;
    const shape = 'corner';
    const variant = role === 'ai' ? 'filled' : 'outlined';
    const isMarkdown = false;
    const typing = role === 'ai' ? i === count - 1 : false;
    const avatar =
      role === 'ai'
        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        : 'https://avatars.githubusercontent.com/u/76239030?v=4';

    messages.push({
      key, // 唯一标识
      role, // user | ai 自行更据模型定义
      placement, // start | end 气泡位置
      content, // 消息内容 流式接受的时候，只需要改这个值即可
      loading, // 当前气泡的加载状态
      shape, // 气泡的形状
      variant, // 气泡的样式
      isMarkdown, // 是否渲染为 markdown
      typing, // 是否开启打字器效果 该属性不会和流式接受冲突
      isFog: role === 'ai', // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
      avatar,
      avatarSize: '24px', // 头像占位大小
      avatarGap: '12px' // 头像与气泡之间的距离
    });
  }
  return messages;
}

const t = computed(() => i18n[currentLang.value]);
const installCommand = computed(() => t.value.quickStart.command);

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand.value);
    // 可以添加复制成功的提示
    copied.value = true;
    // 设置 2 秒后重置复制状态
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
}

// 监听语言变化（可以通过事件总线或者其他方式）
if (typeof window !== 'undefined') {
  // 简单的语言检测
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.includes('zh')) {
    currentLang.value = 'zh';
  } else {
    currentLang.value = 'en';
  }
}

// 页面跳转
function handleClick() {
  location.href = '/components/bubbleList';
}
</script>

<template>
  <!-- 首屏英雄区 - 根据设计图重新布局 -->
  <section
    class="relative z-1 min-h-screen mx-auto max-w-[100rem] flex xl:justify-between overflow-hidden px-4"
  >
    <!-- 背景装饰 -->
    <!-- <div class="absolute inset-0 pointer-events-none">
      <div class="gradient-orb orb-1" />
      <div class="gradient-orb orb-2" />
      <div class="grid-pattern" />
    </div> -->

    <!-- 主容器 - 居中布局 -->
    <div class="shrink xl:w-1/2">
      <div class="flex items-center min-h-[calc(100vh-4rem)] py-10 xl:ps-10">
        <div>
          <div
            class="inline-flex items-center bg-black/30 border border-white/20 rounded-2xl p-2 backdrop-blur-[15px] shadow-2xl max-w-md w-full"
          >
            <span
              class="text-indigo-400 font-mono font-semibold px-2 text-sm md:text-base"
            >
              $
            </span>
            <span
              class="flex-1 text-white/90 font-mono text-sm md:text-base text-left px-2"
            >
              {{ installCommand }}
            </span>
            <button
              class="install-command bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 hover:border-indigo-500/50 rounded-xl p-3 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 flex-shrink-0"
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
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                />
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
          <!-- 主标题 -->
          <div>
            <h1 class="xl:text-left! p-0! my-5!">
              <div class="title-line">
                {{ t.title.line1 }}
              </div>
              <div class="title-line2 font-normal">
                {{ t.title.line2 }}
              </div>
            </h1>

            <!-- 副标题 -->
            <p class="py-4 text-lg md:text-xl text-white/80 leading-relaxed">
              {{ t.subtitle }}
            </p>
          </div>
          <div
            class="inline-flex flex-col items-stretch justify-center gap-3 px-4 pt-4 w-full animate-[reveal-slow_0.5s] md:flex-row xl:px-0 xl:justify-start"
          >
            <button
              class="inline-flex shrink-0 flex-nowrap items-center justify-center gap-1.5 text-center align-middle outline-offset-2 select-none px-20 py-3 bg-neutral-950 text-white text-[1.25rem] font-600 rounded-full cursor-pointer"
              @click="handleClick"
            >
              <span class="text-xl">✨</span>
              <span>{{ t.buttons.getStarted }}</span>
            </button>
            <!-- <button class="inline-flex shrink-0 flex-nowrap items-center justify-center gap-1.5 text-center align-middle outline-offset-2 select-none px-10 py-3 bg-neutral-950 text-white text-[1.25rem] font-600 rounded-full cursor-pointer">
              <span class="text-xl">🚀</span>
              <span></span>
            </button> -->
            <button
              class="inline-flex shrink-0 flex-nowrap items-center justify-center gap-1.5 text-center align-middle outline-offset-2 select-none px-10 py-3 bg-neutral-900 text-white text-[1.25rem] font-600 rounded-full cursor-pointer"
            >
              <span class="text-xl">📖</span>
              <span>{{ t.buttons.viewDocs }}</span>
            </button>
          </div>
        </div>
      </div>
      <!-- 顶部徽章 -->
      <!-- <div class="mb-12">
        <div
          class="hero-badge inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-[15px] border border-white/10 text-sm font-semibold shadow-lg"
        >
          <span class="text-xl">✨</span>
          <span class="text-white">{{ t.badge }}</span>
          <span
            class="badge-version px-3 py-1 rounded-full text-xs font-bold"
          >{{ t.version }}</span>
        </div>
      </div> -->

      <!-- 主标题 -->
      <!-- <div class="mb-8">
        <h1
          class="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-6"
        >
          <div class="title-line">
            {{ t.title.line1 }}
          </div>
          <div class="title-line">
            {{ t.title.line2 }}
          </div>
        </h1>

        <p
          class="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          {{ t.subtitle }}
        </p>
      </div> -->

      <!-- 特性标签 -->
      <!-- <div class="flex flex-wrap justify-center gap-4 mb-12">
        <div
          class="feature-tag flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-[10px] text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
        >
          <span class="text-base">⚡</span>
          <span>{{ t.features.fast }}</span>
        </div>
        <div
          class="feature-tag flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-[10px] text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
        >
          <span class="text-base">🎨</span>
          <span>{{ t.features.modern }}</span>
        </div>
        <div
          class="feature-tag flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-[10px] text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
        >
          <span class="text-base">🔒</span>
          <span>{{ t.features.safe }}</span>
        </div>
      </div> -->

      <!-- 统计数据 -->
      <!-- <div class="flex flex-wrap justify-center gap-12 md:gap-20 mb-12">
        <div class="text-center">
          <div class="stat-number text-5xl md:text-6xl font-black mb-2">
            50+
          </div>
          <div
            class="text-sm md:text-base text-white/70 font-medium uppercase tracking-wider"
          >
            {{ t.stats.components }}
          </div>
        </div>
        <div class="text-center">
          <div class="stat-number text-5xl md:text-6xl font-black mb-2">
            10K+
          </div>
          <div
            class="text-sm md:text-base text-white/70 font-medium uppercase tracking-wider"
          >
            {{ t.stats.downloads }}
          </div>
        </div>
        <div class="text-center">
          <div class="stat-number text-5xl md:text-6xl font-black mb-2">
            99%
          </div>
          <div
            class="text-sm md:text-base text-white/70 font-medium uppercase tracking-wider"
          >
            {{ t.stats.satisfaction }}
          </div>
        </div>
      </div> -->

      <!-- 行动按钮 -->
      <!-- <div
        class="flex flex-col sm:flex-row justify-center gap-4 mb-12 max-w-md mx-auto"
      >
        <button
          class="btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 backdrop-blur-[10px] text-white border-none cursor-pointer hover:-translate-y-1 flex-1"
          @click="handleClick"
        >
          <span class="text-xl">🚀</span>
          <span>{{ t.buttons.getStarted }}</span>
        </button>
        <button
          class="btn-secondary flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 backdrop-blur-[10px] text-white border border-white/20 cursor-pointer hover:-translate-y-1 flex-1"
        >
          <span class="text-xl">📖</span>
          <span>{{ t.buttons.viewDocs }}</span>
        </button>
      </div> -->

      <!-- 快速开始 -->
      <!-- <div class="space-y-4">
        <p class="text-base text-white/70">
          {{ t.quickStart.description }}
        </p>

        <div
          class="inline-flex items-center bg-black/40 border border-white/20 rounded-2xl p-2 backdrop-blur-[15px] shadow-2xl max-w-md w-full"
        >
          <span
            class="text-indigo-400 font-mono font-semibold px-4 text-sm md:text-base"
          >$</span>
          <span
            class="flex-1 text-white/90 font-mono text-sm md:text-base text-left px-2"
          >{{ installCommand }}</span>
          <button
            class="install-command bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 hover:border-indigo-500/50 rounded-xl p-3 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 flex-shrink-0"
            @click="copyInstallCommand"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div> -->
    </div>
    <div
      class="hidden md:flex invisible sticky bottom-4 w-[calc(100%-2rem)] shrink duration-700 xl:visible xl:-end-32 xl:top-16 xl:bottom-auto xl:w-auto xl:transform-none! xl:overflow-x-hidden xl:overflow-y-clip xl:bg-transparent xl:pt-16 xl:pb-32"
    >
      <div
        class="bg-black/30 border-rd-lg xl:backdrop-blur-0 mx-auto origin-top overflow-visible p-4 backdrop-blur will-change-auto [--rtl-reverse:1] max-[1279px]:[transform:translate3d(0,0,0)]! xl:-end-20 xl:-me-10 xl:h-[34rem] xl:w-[50rem] xl:rounded-e-none xl:pe-4 xl:shadow-[-0.05rem_0.1rem_0rem_#00000014] l-reverse:-1]"
        style="
          transform: rotateX(20deg) rotateZ(calc(-20deg * var(--rtl-reverse)))
            skewY(calc(8deg * var(--rtl-reverse)));
        "
      >
        <BubbleList :list="list" max-height="350px" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 背景装饰动画 */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.4) 0%,
    transparent 70%
  );
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.3) 0%,
    transparent 70%
  );
  bottom: 20%;
  right: 10%;
  animation-delay: -4s;
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* 徽章样式 */
.hero-badge {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(139, 92, 246, 0.15) 100%
  );
  animation: badgeGlow 3s ease-in-out infinite;
}

@keyframes badgeGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
  }
}

.badge-version {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 标题渐变动画 */
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

.title-line2 {
  -webkit-text-fill-color: initial;
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

/* 按钮样式 */
.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 统计数字渐变 */
.stat-number {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Logo渐变动画 */
.linear-logo-x {
  background: linear-gradient(
    135deg,
    #6366f1 0%,
    #8b5cf6 25%,
    #3b82f6 50%,
    #ec4899 75%,
    #6366f1 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.6));
  animation: logoGradientFlow 6s ease-in-out infinite;
}

:deep(.el-bubble-content-wrapper .el-bubble-content-outlined) {
  --el-border-color: #606266;
}

:deep(.el-bubble-content-wrapper .el-bubble-content-filled) {
  --el-fill-color: rgba(50, 50, 50, 0.05);
  background-color: rgba(50, 50, 50, 0.15);
}

:deep(.el-bubble-list-default-back-button) {
  background-color: rgba(50, 50, 50, 0.85);
}

@keyframes logoGradientFlow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
