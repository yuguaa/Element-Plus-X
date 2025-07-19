<template>
  <!-- 顶部横幅广告 -->
  <section class="hero-banner">
    <div class="banner-content">
      <div class="banner-icon">🚀</div>
      <div class="banner-text">
        <span class="banner-main"
          >推出仿豆包/通义，企业级AI-PC端应用模版，助力企业快速搭建-全栈AI项目</span
        >
      </div>
      <a href="https://chat.element-plus-x.com/chat" class="banner-cta">
        <span class="cta-text">X Chat</span>
        <span class="cta-arrow">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
/* 顶部横幅 */
.hero-banner {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(139, 92, 246, 0.12) 50%,
    rgba(59, 130, 246, 0.15) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin: 1rem;
  padding: 1rem;
  overflow: hidden;
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

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.banner-icon {
  font-size: 1.5rem;
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

.banner-text {
  flex: 1;
  text-align: center;
}

.banner-main {
  font-size: 0.9rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.4;
}

.banner-cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(139, 92, 246, 0.2) 100%
  );
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.banner-cta:hover {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.3) 0%,
    rgba(139, 92, 246, 0.3) 100%
  );
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.cta-text {
  font-weight: 600;
}

.cta-arrow {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.banner-cta:hover .cta-arrow {
  transform: translateX(3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-banner {
    margin: 0.5rem;
    padding: 0.75rem;
  }

  .banner-content {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  .banner-main {
    font-size: 0.8rem;
  }

  .banner-cta {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    margin: 0.25rem;
    padding: 0.5rem;
  }

  .banner-content {
    gap: 0.5rem;
  }

  .banner-main {
    font-size: 0.75rem;
  }

  .banner-icon {
    font-size: 1.2rem;
  }
}
</style>
