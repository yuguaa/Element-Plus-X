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
  }
  catch (err) {
    console.error('复制失败:', err);
  }
}

// 监听语言变化（可以通过事件总线或者其他方式）
if (typeof window !== 'undefined') {
  // 简单的语言检测
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.includes('zh')) {
    currentLang.value = 'zh';
  }
  else {
    currentLang.value = 'en';
  }
}

// 页面跳转
function handleClick() {
  location.href = '/components/bubbleList';
}
</script>

<template>
  <!-- 首屏英雄区 - 左右分栏布局 -->
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="gradient-orb orb-1" />
      <div class="gradient-orb orb-2" />
      <div class="grid-pattern" />
    </div>

    <!-- 主容器 - 左右分栏 -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
      <div
        class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-16"
      >
        <!-- 左侧内容区 -->
        <div class="space-y-8 lg:space-y-12">
          <!-- 顶部徽章 -->
          <div>
            <div
              class="hero-badge inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-[15px] border border-white/10 text-sm font-semibold shadow-lg"
            >
              <span class="text-xl">✨</span>
              <span class="text-white">{{ t.badge }}</span>
              <span
                class="badge-version px-3 py-1 rounded-full text-xs font-bold"
              >{{ t.version }}</span>
            </div>
          </div>

          <!-- 主标题 -->
          <div class="space-y-6">
            <h1
              class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight"
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
              class="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl"
            >
              {{ t.subtitle }}
            </p>
          </div>

          <!-- 特性标签 -->
          <div class="flex flex-wrap gap-4">
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

          <!-- 行动按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 max-w-md">
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

          <!-- 统计数据 -->
          <div class="flex gap-8 md:gap-12">
            <div>
              <div class="stat-number text-3xl md:text-4xl font-black mb-1">
                50+
              </div>
              <div
                class="text-xs md:text-sm text-white/70 font-medium uppercase tracking-wider"
              >
                {{ t.stats.components }}
              </div>
            </div>
            <div>
              <div class="stat-number text-3xl md:text-4xl font-black mb-1">
                10K+
              </div>
              <div
                class="text-xs md:text-sm text-white/70 font-medium uppercase tracking-wider"
              >
                {{ t.stats.downloads }}
              </div>
            </div>
            <div>
              <div class="stat-number text-3xl md:text-4xl font-black mb-1">
                99%
              </div>
              <div
                class="text-xs md:text-sm text-white/70 font-medium uppercase tracking-wider"
              >
                {{ t.stats.satisfaction }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧展示区 -->
        <div class="relative lg:h-[600px] xl:h-[700px] hidden lg:block">
          <!-- 浮动卡片容器 -->
          <div class="absolute inset-0 perspective-1000">
            <!-- 主要编辑器窗口 -->
            <div
              class="floating-card card-editor absolute top-8 left-4 w-80 h-64 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl shadow-2xl"
            >
              <div class="p-4 h-full">
                <!-- 窗口标题栏 -->
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex gap-1.5">
                    <div class="w-3 h-3 bg-red-500/80 rounded-full" />
                    <div class="w-3 h-3 bg-yellow-500/80 rounded-full" />
                    <div class="w-3 h-3 bg-green-500/80 rounded-full" />
                  </div>
                  <span class="text-white/70 text-sm font-medium ml-2">editor.vue</span>
                </div>
                <!-- 代码内容 -->
                <div class="space-y-2 text-sm font-mono">
                  <div class="text-purple-400">
                    &lt;template&gt;
                  </div>
                  <div class="text-white/80 ml-4">
                    &lt;div class="<span class="text-blue-400">container</span>"&gt;
                  </div>
                  <div class="text-white/80 ml-8">
                    &lt;h1&gt;&#123;&#123;
                    <span class="text-green-400">title</span>
                    &#125;&#125;&lt;/h1&gt;
                  </div>
                  <div class="text-white/80 ml-4">
                    &lt;/div&gt;
                  </div>
                  <div class="text-purple-400">
                    &lt;/template&gt;
                  </div>
                </div>
              </div>
            </div>

            <!-- 组件预览窗口 -->
            <div
              class="floating-card card-preview absolute top-16 right-8 w-72 h-48 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl shadow-2xl"
            >
              <div class="p-4 h-full">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-white/70 text-sm font-medium">Component Preview</span>
                  <div
                    class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  />
                </div>
                <!-- 预览内容 -->
                <div class="space-y-3">
                  <div
                    class="h-8 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-lg"
                  />
                  <div class="h-6 bg-white/10 rounded-md w-3/4" />
                  <div class="h-6 bg-white/10 rounded-md w-1/2" />
                  <div class="flex gap-2">
                    <div class="h-8 w-16 bg-indigo-500/40 rounded-lg" />
                    <div class="h-8 w-16 bg-purple-500/40 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 颜色面板 -->
            <div
              class="floating-card card-colors absolute bottom-20 right-12 w-64 h-56 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl shadow-2xl"
            >
              <div class="p-4 h-full">
                <div class="text-white/70 text-sm font-medium mb-4">
                  Color Palette
                </div>
                <div class="grid grid-cols-4 gap-3">
                  <div
                    class="aspect-square bg-indigo-500 rounded-lg shadow-lg"
                  />
                  <div
                    class="aspect-square bg-purple-500 rounded-lg shadow-lg"
                  />
                  <div class="aspect-square bg-blue-500 rounded-lg shadow-lg" />
                  <div class="aspect-square bg-pink-500 rounded-lg shadow-lg" />
                  <div
                    class="aspect-square bg-emerald-500 rounded-lg shadow-lg"
                  />
                  <div
                    class="aspect-square bg-orange-500 rounded-lg shadow-lg"
                  />
                  <div class="aspect-square bg-red-500 rounded-lg shadow-lg" />
                  <div
                    class="aspect-square bg-yellow-500 rounded-lg shadow-lg"
                  />
                </div>
                <div class="mt-4 text-xs text-white/50">
                  Semantic colors
                </div>
              </div>
            </div>

            <!-- 工具栏 -->
            <div
              class="floating-card card-toolbar absolute bottom-8 left-8 w-56 h-16 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl shadow-2xl"
            >
              <div class="flex items-center justify-center h-full px-4">
                <div class="flex items-center gap-4">
                  <div
                    class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-white/80 text-sm">⚡</span>
                  </div>
                  <div
                    class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-white/80 text-sm">🎨</span>
                  </div>
                  <div
                    class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-white/80 text-sm">🔧</span>
                  </div>
                  <div
                    class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-white/80 text-sm">📱</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 通知卡片 -->
            <div
              class="floating-card card-notification absolute top-32 left-16 w-64 h-20 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl shadow-2xl"
            >
              <div class="flex items-center p-4 h-full">
                <div
                  class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"
                />
                <div>
                  <div class="text-white/90 text-sm font-medium">
                    Build successful
                  </div>
                  <div class="text-white/60 text-xs">
                    Ready in 1.2s
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
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
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
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
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 25%, #6366f1 50%, #8b5cf6 75%, #ffffff 100%);
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
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #3b82f6 50%, #ec4899 75%, #6366f1 100%);
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

/* 浮动卡片动画 */
.floating-card {
  animation: cardFloat 6s ease-in-out infinite;
  transform-style: preserve-3d;
}

.card-editor {
  animation-delay: 0s;
}

.card-preview {
  animation-delay: -1s;
}

.card-colors {
  animation-delay: -2s;
}

.card-toolbar {
  animation-delay: -3s;
}

.card-notification {
  animation-delay: -4s;
}

@keyframes cardFloat {
  0%,
  100% {
    transform: translateY(0px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: translateY(-10px) rotateX(2deg) rotateY(1deg);
  }
  50% {
    transform: translateY(-5px) rotateX(-1deg) rotateY(-2deg);
  }
  75% {
    transform: translateY(-15px) rotateX(1deg) rotateY(1deg);
  }
}

/* 3D 透视效果 */
.perspective-1000 {
  perspective: 1000px;
}

/* 悬停效果 */
.floating-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
</style>
