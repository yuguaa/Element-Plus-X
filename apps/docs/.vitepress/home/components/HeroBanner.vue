<template>
  <!-- 顶部横幅广告 -->
  <section
    class="hero-banner relative rounded-3 m-4 p-4 overflow-hidden backdrop-blur-5"
  >
    <div
      class="banner-content flex items-center justify-between gap-4 relative z-2"
    >
      <div class="banner-icon text-2xl">
        🚀
      </div>
      <div class="banner-text flex-1 text-center">
        <span class="banner-main text-sm font-semibold leading-relaxed">推出仿豆包/通义，企业级AI-PC端应用模版，助力企业快速搭建-全栈AI项目</span>
      </div>
      <a
        href="https://chat.element-plus-x.com/chat"
        class="banner-cta flex items-center gap-2 px-4 py-2 rounded-2 text-white no-underline font-semibold text-sm transition-all duration-300 backdrop-blur-[10px]"
      >
        <span class="cta-text font-semibold">X Chat</span>
        <span class="cta-arrow text-base transition-transform duration-300">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped lang="less">
/* 横幅背景和动画 */
.hero-banner {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(139, 92, 246, 0.12) 50%,
    rgba(59, 130, 246, 0.15) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: bannerGlow 8s ease-in-out infinite;
}

@keyframes bannerGlow {
  0%,
  100% {
    box-shadow:
      0 0 20px rgba(99, 102, 241, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow:
      0 0 30px rgba(139, 92, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
}

.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(99, 102, 241, 0.6),
    rgba(139, 92, 246, 0.6),
    rgba(59, 130, 246, 0.6),
    transparent
  );
  animation: bannerShimmer 3s linear infinite;
}

@keyframes bannerShimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 图标弹跳动画 */
.banner-icon {
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* 文本渐变 */
.banner-main {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* CTA按钮样式 */
.banner-cta {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.banner-cta:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.banner-cta:hover .cta-arrow {
  transform: translateX(3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-banner {
    @apply m-2 p-3;
  }

  .banner-content {
    @apply flex-col gap-3 text-center;
  }

  .banner-main {
    @apply text-xs;
  }

  .banner-cta {
    @apply px-3 py-1.5 text-xs;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    @apply m-1 p-2;
  }

  .banner-content {
    @apply gap-2;
  }

  .banner-main {
    @apply text-xs;
  }

  .banner-icon {
    @apply text-xl;
  }
}
</style>
