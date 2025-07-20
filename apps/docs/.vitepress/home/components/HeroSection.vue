<template>
  <!-- 首屏英雄区 -->
  <section
    class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden py-8"
  >
    <!-- 背景装饰 -->
    <div class="hero-background absolute inset-0 pointer-events-none">
      <div class="gradient-orb orb-1" />
      <div class="gradient-orb orb-2" />
      <div class="grid-pattern" />
    </div>

    <!-- 主内容区域 -->
    <div
      class="hero-container max-w-6xl mx-auto px-8 grid grid-cols-2 gap-16 items-center relative z-2"
    >
      <!-- 左侧内容 -->
      <div class="hero-content flex flex-col gap-8">
        <!-- 徽章 -->
        <div
          class="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-[10px] w-fit text-sm font-semibold"
        >
          <span class="badge-icon text-base">✨</span>
          <span class="badge-text">ELEMENT PLUS X</span>
          <span class="badge-version font-bold">v2.0</span>
        </div>

        <!-- 主标题 -->
        <h1
          class="hero-title text-6xl font-black leading-tight m-0 flex flex-col gap-2"
        >
          <span class="title-line">构建未来</span>
          <span class="title-line">UI 体验</span>
        </h1>

        <!-- 副标题 -->
        <p class="hero-subtitle text-xl leading-relaxed text-white/80 m-0">
          基于 Vue 3 的下一代组件库，融合 Linear 设计语言与玻璃拟态美学，为现代
          Web 应用提供极致的用户体验
        </p>

        <!-- 特性标签 -->
        <div class="hero-features flex gap-4 flex-wrap">
          <div
            class="feature-tag flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-[10px] text-sm font-medium transition-all duration-300"
          >
            <span class="feature-icon">⚡</span>
            <span class="feature-text">极速开发</span>
          </div>
          <div
            class="feature-tag flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-[10px] text-sm font-medium transition-all duration-300"
          >
            <span class="feature-icon">🎨</span>
            <span class="feature-text">现代设计</span>
          </div>
          <div
            class="feature-tag flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-[10px] text-sm font-medium transition-all duration-300"
          >
            <span class="feature-icon">🔒</span>
            <span class="feature-text">类型安全</span>
          </div>
        </div>

        <!-- 行动按钮 -->
        <div class="hero-actions flex gap-4 flex-wrap">
          <button
            class="btn-primary flex items-center gap-2 px-8 py-4 border-none rounded-3 text-base font-semibold cursor-pointer transition-all duration-300 backdrop-blur-[10px] text-white"
          >
            <span class="btn-icon">🚀</span>
            <span class="btn-text">立即开始</span>
          </button>
          <button
            class="btn-secondary flex items-center gap-2 px-8 py-4 border border-white/20 rounded-3 text-base font-semibold cursor-pointer transition-all duration-300 backdrop-blur-[10px] text-white"
          >
            <span class="btn-icon">📖</span>
            <span class="btn-text">查看文档</span>
          </button>
        </div>

        <!-- 统计数据 -->
        <div class="hero-stats flex gap-8">
          <div class="stat-item text-center">
            <div class="stat-number text-3xl font-black">50+</div>
            <div class="stat-label text-sm text-white/70 mt-1">组件</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number text-3xl font-black">10K+</div>
            <div class="stat-label text-sm text-white/70 mt-1">下载量</div>
          </div>
          <div class="stat-item text-center">
            <div class="stat-number text-3xl font-black">99%</div>
            <div class="stat-label text-sm text-white/70 mt-1">满意度</div>
          </div>
        </div>
      </div>

      <!-- 右侧视觉 -->
      <div class="hero-visual flex items-center justify-center relative">
        <div class="opulous-logo flex items-center gap-4">
          <div class="opulous-logo-icon relative w-10 h-10 flex-center">
            <div class="linear-logo-x">X</div>
          </div>
        </div>
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
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
  border: 1px solid rgba(99, 102, 241, 0.2);
  animation: badgeGlow 3s ease-in-out infinite;
}

@keyframes badgeGlow {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
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

/* 特性标签悬停效果 */
.feature-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

/* 按钮样式 */
.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
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
  position: relative;
  display: inline-block;
  font-size: 2rem;
  font-weight: 800;
  background:
    linear-gradient(
      135deg,
      #6366f1 0%,
      #8b5cf6 25%,
      #3b82f6 50%,
      #ec4899 75%,
      #6366f1 100%
    ),
    radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
  background-size:
    200% 200%,
    100% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.5));
  animation: logoGradientFlow 6s ease-in-out infinite;
}

@keyframes logoGradientFlow {
  0%,
  100% {
    background-position:
      0% 50%,
      center;
  }
  50% {
    background-position:
      100% 50%,
      center;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-container {
    @apply grid-cols-1 gap-8 text-center;
  }

  .hero-title {
    @apply text-4xl;
  }

  .hero-subtitle {
    @apply text-lg;
  }

  .hero-actions {
    @apply justify-center;
  }

  .hero-stats {
    @apply justify-center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    @apply text-3xl;
  }

  .hero-subtitle {
    @apply text-base;
  }

  .btn-primary,
  .btn-secondary {
    @apply px-6 py-3 text-sm;
  }

  .hero-stats {
    @apply gap-4;
  }

  .stat-number {
    @apply text-2xl;
  }
}
</style>
