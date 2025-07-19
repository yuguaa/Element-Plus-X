<template>
  <!-- 首屏英雄区 -->
  <section class="hero-section">
    <!-- 背景装饰 -->
    <div class="hero-background">
      <div class="gradient-orb orb-1" />
      <div class="gradient-orb orb-2" />
      <div class="grid-pattern" />
    </div>

    <!-- 主内容区域 -->
    <div class="hero-container">
      <!-- 左侧内容 -->
      <div class="hero-content">
        <!-- 徽章 -->
        <div class="hero-badge">
          <span class="badge-icon">✨</span>
          <span class="badge-text">ELEMENT PLUS X</span>
          <span class="badge-version">v2.0</span>
        </div>

        <!-- 主标题 -->
        <h1 class="hero-title">
          <span class="title-line">构建未来</span>
          <span class="title-line">UI 体验</span>
        </h1>

        <!-- 副标题 -->
        <p class="hero-subtitle">
          基于 Vue 3 的下一代组件库，融合 Linear 设计语言与玻璃拟态美学，为现代
          Web 应用提供极致的用户体验
        </p>

        <!-- 特性标签 -->
        <div class="hero-features">
          <div class="feature-tag">
            <span class="feature-icon">⚡</span>
            <span class="feature-text">极速开发</span>
          </div>
          <div class="feature-tag">
            <span class="feature-icon">🎨</span>
            <span class="feature-text">现代设计</span>
          </div>
          <div class="feature-tag">
            <span class="feature-icon">🔒</span>
            <span class="feature-text">类型安全</span>
          </div>
        </div>

        <!-- 行动按钮 -->
        <div class="hero-actions">
          <button class="btn-primary">
            <span class="btn-icon">🚀</span>
            <span class="btn-text">立即开始</span>
          </button>
          <button class="btn-secondary">
            <span class="btn-icon">📖</span>
            <span class="btn-text">查看文档</span>
          </button>
        </div>

        <!-- 统计数据 -->
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">组件</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">下载量</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99%</div>
            <div class="stat-label">满意度</div>
          </div>
        </div>
      </div>

      <!-- 右侧视觉 -->
      <div class="hero-visual">
        <div class="opulous-logo">
          <div class="opulous-logo-icon">
            <div class="linear-logo-x">X</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 英雄区域样式 */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2rem 0;
}

.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

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

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  width: fit-content;
  font-size: 0.85rem;
  font-weight: 600;
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

.badge-icon {
  font-size: 1rem;
}

.badge-version {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

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

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.hero-features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.feature-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.opulous-logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.opulous-logo-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.linear-logo-x {
  position: relative;
  display: inline-block;
  font-size: 2rem;
  font-weight: 800;
  font-family:
    'Inter',
    'SF Pro Display',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
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
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .hero-stats {
    gap: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}
</style>
