<script setup lang="ts">
import { computed, ref } from 'vue';

// 简单的语言检测（可以从 URL 或者其他地方获取）
const currentLang = ref<'zh' | 'en'>('zh');

// 国际化文本
const i18n = {
  zh: {
    badge: 'ELEMENT PLUS X',
    version: 'v2.0',
    title: {
      line1: '构建未来',
      line2: 'UI 体验'
    },
    subtitle:
      '基于 Vue 3 的下一代组件库，融合 Linear 设计语言与玻璃拟态美学，为现代 Web 应用提供极致的用户体验',
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

const t = computed(() => i18n[currentLang.value]);
const installCommand = computed(() => t.value.quickStart.command);

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand.value);
    // 可以添加复制成功的提示
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
    class="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="gradient-orb orb-1" />
      <div class="gradient-orb orb-2" />
      <div class="grid-pattern" />
    </div>

    <!-- 主容器 - 居中布局 -->
    <div class="relative z-10 w-full max-w-5xl mx-auto text-center">
      <!-- 顶部徽章 -->
      <div class="mb-12">
        <div
          class="hero-badge inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-[15px] border border-white/10 text-sm font-semibold shadow-lg"
        >
          <span class="text-xl">✨</span>
          <span class="text-white">{{ t.badge }}</span>
          <span
            class="badge-version px-3 py-1 rounded-full text-xs font-bold"
            >{{ t.version }}</span
          >
        </div>
      </div>

      <!-- 主标题 -->
      <div class="mb-8">
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

        <!-- 副标题 -->
        <p
          class="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          {{ t.subtitle }}
        </p>
      </div>

      <!-- 特性标签 -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
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
      </div>

      <!-- 统计数据 -->
      <div class="flex flex-wrap justify-center gap-12 md:gap-20 mb-12">
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
      </div>

      <!-- 行动按钮 -->
      <div
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
      </div>

      <!-- 快速开始 -->
      <div class="space-y-4">
        <p class="text-base text-white/70">
          {{ t.quickStart.description }}
        </p>

        <div
          class="inline-flex items-center bg-black/40 border border-white/20 rounded-2xl p-2 backdrop-blur-[15px] shadow-2xl max-w-md w-full"
        >
          <span
            class="text-indigo-400 font-mono font-semibold px-4 text-sm md:text-base"
            >$</span
          >
          <span
            class="flex-1 text-white/90 font-mono text-sm md:text-base text-left px-2"
            >{{ installCommand }}</span
          >
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
    </div>
  </section>
</template>

<style scoped lang="less">
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
