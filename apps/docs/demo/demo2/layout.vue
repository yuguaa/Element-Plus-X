<script setup lang="ts">
import gsap from 'gsap';
import Theme from 'vitepress/theme';
import { onMounted, ref } from 'vue';

const menuOpen = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

const navItems = ref([
  { name: 'Predict', href: '#predict' },
  { name: 'Stake', href: '#stake' },
  { name: 'OVAULT', href: '#ovault' },
  { name: 'NFTs', href: '#nfts' }
]);

onMounted(() => {
  // 流动渐变背景动画
  gsap.to('.music-gradient', {
    backgroundPosition: '200% 50%',
    duration: 15,
    repeat: -1,
    ease: 'none'
  });

  // 音乐粒子流动效果
  gsap.utils.toArray('.music-particle').forEach((particle: any, i: number) => {
    gsap.to(particle, {
      x: 'random(-100, 100)',
      y: 'random(-50, 50)',
      opacity: 'random(0.3, 0.8)',
      duration: 'random(5, 10)',
      repeat: -1,
      yoyo: true,
      delay: i * 0.4,
      ease: 'sine.inOut'
    });
  });

  // 抖音风格Logo故障效果
  setInterval(() => {
    if (Math.random() > 0.8) {
      gsap.to('.tiktok-logo-x', {
        textShadow: `
          3px 3px 0px #ff0050,
          -3px -3px 0px #00ffff
        `,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  }, 400);

  // Logo随机位移故障
  setInterval(() => {
    if (Math.random() > 0.9) {
      gsap.to('.tiktok-logo-x', {
        x: Math.random() > 0.5 ? 2 : -2,
        duration: 0.05,
        yoyo: true,
        repeat: 2,
        ease: 'power2.inOut'
      });
    }
  }, 600);

  // 音频波形动画
  gsap.to('.audio-wave', {
    x: '100vw',
    duration: 8,
    repeat: -1,
    ease: 'none',
    stagger: 1.5
  });

  // 导航菜单项悬停动画 - 抖音风格
  gsap.utils.toArray('.opulous-menu a').forEach((el: any) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });

      // 添加故障效果
      gsap.to(el, {
        textShadow: `
          1px 1px 0px #ff0050,
          -1px -1px 0px #00ffff
        `,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(el, {
        textShadow: 'none',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // Footer 动画效果
  // Footer链接悬停故障效果
  gsap.utils.toArray('.footer-link').forEach((link: any) => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link.querySelector('.link-text'), {
        textShadow: `
          1px 1px 0px #ff0050,
          -1px -1px 0px #00ffff
        `,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link.querySelector('.link-text'), {
        textShadow: `
          0.5px 0.5px 0px #ff0050,
          -0.5px -0.5px 0px #00ffff
        `,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // Footer入场动画
  const footerObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 标题动画
          gsap.utils
            .toArray('.section-title')
            .forEach((title: any, i: number) => {
              gsap.fromTo(
                title,
                {
                  y: 30,
                  opacity: 0
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: 'power2.out'
                }
              );
            });

          // 链接动画
          gsap.utils.toArray('.footer-link').forEach((link: any, i: number) => {
            gsap.fromTo(
              link,
              {
                x: -20,
                opacity: 0
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.5 + i * 0.05,
                ease: 'power2.out'
              }
            );
          });

          // 统计数据动画
          gsap.utils.toArray('.stat-item').forEach((stat: any, i: number) => {
            gsap.fromTo(
              stat,
              {
                scale: 0.8,
                opacity: 0
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: 'back.out(1.7)'
              }
            );
          });

          // 版权信息动画
          gsap.fromTo(
            '.footer-copyright',
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 1,
              ease: 'power2.out'
            }
          );

          footerObserver.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  const footer = document.querySelector('.glitch-footer');
  if (footer) {
    footerObserver.observe(footer);
  }

  // 随机故障效果增强
  setInterval(() => {
    if (Math.random() > 0.95) {
      const glitchElements = gsap.utils.toArray('.glitch-text, .glitch-number');
      const randomElement =
        glitchElements[Math.floor(Math.random() * glitchElements.length)];
      if (randomElement) {
        gsap.to(randomElement, {
          textShadow: `
            2px 2px 0px #ff0050,
            -2px -2px 0px #00ffff
          `,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      }
    }
  }, 1000);
});
</script>

<template>
  <div class="opulous-layout">
    <!-- 导航栏 -->
    <header class="opulous-header">
      <div class="opulous-logo">
        <div class="opulous-logo-icon">
          <div class="tiktok-logo-x" data-text="X">X</div>
        </div>
      </div>

      <nav class="opulous-menu" :class="{ open: menuOpen }">
        <a v-for="item in navItems" :key="item.name" :href="item.href">{{
          item.name
        }}</a>
      </nav>

      <div class="menu-toggle" @click="toggleMenu">
        <span /><span /><span />
      </div>
    </header>

    <!-- 主内容 -->
    <main class="opulous-main">
      <Theme.Layout />
    </main>

    <!-- Footer -->
    <footer class="glitch-footer">
      <!-- 故障艺术背景 -->
      <div class="footer-glitch-bg">
        <div class="footer-scan-lines">
          <div v-for="i in 8" :key="i" class="scan-line" />
        </div>
      </div>

      <div class="footer-container">
        <!-- 主要内容区域 -->
        <div class="footer-main">
          <!-- 项目介绍 -->
          <div class="footer-section">
            <div class="section-header">
              <h3 class="section-title glitch-text" data-text="ELEMENT PLUS X">
                ELEMENT PLUS X
              </h3>
            </div>
            <p class="section-desc">
              下一代 Vue 3 组件库，融合现代设计与极致性能。
              为开发者提供强大、灵活、美观的 UI 解决方案。
            </p>
            <div class="project-stats">
              <div class="stat-item">
                <span class="stat-number glitch-number" data-text="50+"
                  >50+</span
                >
                <span class="stat-label">组件</span>
              </div>
              <div class="stat-item">
                <span class="stat-number glitch-number" data-text="10K+"
                  >10K+</span
                >
                <span class="stat-label">下载</span>
              </div>
              <div class="stat-item">
                <span class="stat-number glitch-number" data-text="99%"
                  >99%</span
                >
                <span class="stat-label">满意度</span>
              </div>
            </div>
          </div>

          <!-- 生态链接 -->
          <div class="footer-section">
            <div class="section-header">
              <h3 class="section-title glitch-text" data-text="ECOSYSTEM">
                ECOSYSTEM
              </h3>
            </div>
            <div class="link-grid">
              <a href="https://vuejs.org" class="footer-link" target="_blank">
                <span class="link-icon">⚡</span>
                <span class="link-text">Vue.js</span>
                <span class="link-desc">渐进式框架</span>
              </a>
              <a href="https://vitejs.dev" class="footer-link" target="_blank">
                <span class="link-icon">🚀</span>
                <span class="link-text">Vite</span>
                <span class="link-desc">构建工具</span>
              </a>
              <a
                href="https://www.typescriptlang.org"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">📘</span>
                <span class="link-text">TypeScript</span>
                <span class="link-desc">类型安全</span>
              </a>
              <a
                href="https://pinia.vuejs.org"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">🍍</span>
                <span class="link-text">Pinia</span>
                <span class="link-desc">状态管理</span>
              </a>
            </div>
          </div>

          <!-- 社区链接 -->
          <div class="footer-section">
            <div class="section-header">
              <h3 class="section-title glitch-text" data-text="COMMUNITY">
                COMMUNITY
              </h3>
            </div>
            <div class="link-grid">
              <a
                href="https://github.com/element-plus/element-plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">🐙</span>
                <span class="link-text">GitHub</span>
                <span class="link-desc">源码仓库</span>
              </a>
              <a
                href="https://discord.gg/element-plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">💬</span>
                <span class="link-text">Discord</span>
                <span class="link-desc">实时交流</span>
              </a>
              <a
                href="https://twitter.com/element_plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">🐦</span>
                <span class="link-text">Twitter</span>
                <span class="link-desc">最新动态</span>
              </a>
              <a
                href="https://stackoverflow.com/questions/tagged/element-plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">📚</span>
                <span class="link-text">Stack Overflow</span>
                <span class="link-desc">问题解答</span>
              </a>
            </div>
          </div>

          <!-- 友情链接 -->
          <div class="footer-section">
            <div class="section-header">
              <h3 class="section-title glitch-text" data-text="PARTNERS">
                PARTNERS
              </h3>
            </div>
            <div class="link-grid">
              <a href="https://antdv.com" class="footer-link" target="_blank">
                <span class="link-icon">🐜</span>
                <span class="link-text">Ant Design Vue</span>
                <span class="link-desc">企业级UI</span>
              </a>
              <a href="https://naiveui.com" class="footer-link" target="_blank">
                <span class="link-icon">🌟</span>
                <span class="link-text">Naive UI</span>
                <span class="link-desc">现代组件库</span>
              </a>
              <a href="https://quasar.dev" class="footer-link" target="_blank">
                <span class="link-icon">💎</span>
                <span class="link-text">Quasar</span>
                <span class="link-desc">全栈框架</span>
              </a>
              <a
                href="https://primevue.org"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon">🎨</span>
                <span class="link-text">PrimeVue</span>
                <span class="link-desc">丰富组件</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 底部版权信息 -->
        <div class="footer-bottom">
          <div class="footer-divider" />
          <div class="footer-copyright">
            <div class="copyright-left">
              <span
                class="copyright-text glitch-text"
                data-text="© 2024 ELEMENT PLUS X"
                >© 2024 ELEMENT PLUS X</span
              >
              <span class="copyright-desc">ALL RIGHTS RESERVED</span>
            </div>
            <div class="copyright-right">
              <span class="version-badge">
                <span class="version-label">VERSION</span>
                <span class="version-number glitch-text" data-text="2.0.0"
                  >2.0.0</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.opulous-layout {
  min-height: 100vh;
  background: #000000;
  color: #fff;
  font-family:
    'Inter',
    'SF Pro Display',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  overflow-x: hidden;
  position: relative;
}

.opulous-layout::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(255, 0, 80, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(0, 255, 255, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 80%,
      rgba(255, 0, 80, 0.04) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 1;
}

/* 动态背景 */
.music-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.music-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #0a0a1a 0%,
    #1a1a2e 25%,
    #2d1b69 50%,
    #4a148c 75%,
    #6a1b9a 100%
  );
  background-size: 200% 200%;
  opacity: 0.9;
}

.particle-field {
  position: absolute;
  inset: 0;
}

.music-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, #00d4ff, #9c27b0, #ff6b35);
  border-radius: 50%;
  box-shadow: 0 0 12px currentColor;
  top: random(100%);
  left: random(100%);
}

.audio-streams {
  position: absolute;
  inset: 0;
}

.audio-wave {
  position: absolute;
  width: 1px;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    transparent,
    #00d4ff,
    #9c27b0,
    #ff6b35,
    transparent
  );
  left: -2px;
  top: 0;
  opacity: 0.5;
}

/* 导航栏 */
.opulous-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(255, 0, 80, 0.2);
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
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

.tiktok-logo-x {
  position: relative;
  display: inline-block;
  font-size: 2rem;
  font-weight: 900;
  font-family: 'Arial Black', Arial, sans-serif;
  color: #ffffff;
  text-shadow:
    2px 2px 0px #ff0050,
    -2px -2px 0px #00ffff;
  animation: tiktok-logo-glitch 3s infinite;
}

.tiktok-logo-x::before,
.tiktok-logo-x::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tiktok-logo-x::before {
  color: #ff0050;
  animation: tiktok-logo-glitch-1 2s infinite;
  z-index: -1;
}

.tiktok-logo-x::after {
  color: #00ffff;
  animation: tiktok-logo-glitch-2 2s infinite;
  z-index: -2;
}

@keyframes tiktok-logo-glitch {
  0%,
  100% {
    transform: translate(0);
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
  2% {
    transform: translate(1px, 0);
    text-shadow:
      3px 3px 0px #ff0050,
      -3px -3px 0px #00ffff;
  }
  4% {
    transform: translate(-1px, 0);
    text-shadow:
      -2px 2px 0px #ff0050,
      2px -2px 0px #00ffff;
  }
  6% {
    transform: translate(0);
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes tiktok-logo-glitch-1 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  1% {
    transform: translate(-1px, 1px);
    opacity: 1;
  }
  2% {
    transform: translate(-1px, 1px);
    opacity: 0;
  }
}

@keyframes tiktok-logo-glitch-2 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  2% {
    transform: translate(1px, -1px);
    opacity: 1;
  }
  3% {
    transform: translate(1px, -1px);
    opacity: 0;
  }
}

.opulous-logo-text {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.opulous-menu {
  display: flex;
  gap: 3rem;
  z-index: 101;
}

.opulous-menu a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 0.5rem 0;
}

.opulous-menu a:hover {
  color: #00ffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
}

.opulous-menu a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff0050, #00ffff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.opulous-menu a:hover::after {
  width: 100%;
  box-shadow: 0 0 10px rgba(255, 0, 80, 0.5);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 10px;
  z-index: 102;
}

.menu-toggle span {
  display: block;
  width: 26px;
  height: 2px;
  background: #ff0050;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(255, 0, 80, 0.3);
}

/* 主内容区 */
.opulous-main {
  position: relative;
  z-index: 10;
  padding-top: 80px;
  min-height: calc(100vh - 80px);
  background: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .opulous-header {
    padding: 0 4vw;
    height: 70px;
  }

  .opulous-main {
    padding-top: 70px;
    min-height: calc(100vh - 70px);
  }

  .opulous-logo-text {
    font-size: 1.3rem;
  }

  .opulous-menu {
    position: fixed;
    top: 70px;
    right: -100vw;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(25px);
    width: 75vw;
    max-width: 350px;
    height: calc(100vh - 70px);
    padding: 3rem 2rem;
    gap: 2.5rem;
    transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-left: 1px solid rgba(255, 0, 80, 0.3);
    z-index: 200;
  }

  .opulous-menu.open {
    right: 0;
  }

  .menu-toggle {
    display: flex;
  }

  .menu-toggle span:nth-child(1) {
    transform-origin: center;
  }

  .menu-toggle span:nth-child(3) {
    transform-origin: center;
  }

  .menuOpen .menu-toggle span:nth-child(1) {
    transform: rotate(45deg) translateY(8px);
  }

  .menuOpen .menu-toggle span:nth-child(2) {
    opacity: 0;
  }

  .menuOpen .menu-toggle span:nth-child(3) {
    transform: rotate(-45deg) translateY(-8px);
  }
}

@media (max-width: 480px) {
  .opulous-header {
    padding: 0 3vw;
  }

  .opulous-logo-text {
    font-size: 1.1rem;
  }

  .opulous-logo-icon {
    width: 35px;
    height: 35px;
  }

  .opulous-menu {
    width: 85vw;
    padding: 2rem 1.5rem;
  }
}

/* VitePress 样式覆盖 */
:deep(.VPFooter) {
  background-color: transparent !important;
  border-top: 1px solid rgba(255, 0, 80, 0.2) !important;
}

:deep(.VPDoc) {
  background: transparent !important;
}

:deep(.VPContent) {
  background: transparent !important;
}

:deep(.VPNav) {
  background: transparent !important;
}

/* Footer 样式 */
.glitch-footer {
  position: relative;
  background: rgba(0, 0, 0, 0.95);
  border-top: 1px solid rgba(255, 0, 80, 0.2);
  margin-top: 4rem;
  overflow: hidden;
}

.footer-glitch-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.footer-scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff0050, transparent);
  opacity: 0.05;
  animation: scan-move 4s infinite linear;
}

.scan-line:nth-child(odd) {
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  animation-delay: -2s;
}

.scan-line:nth-child(1) {
  top: 10%;
}
.scan-line:nth-child(2) {
  top: 25%;
}
.scan-line:nth-child(3) {
  top: 40%;
}
.scan-line:nth-child(4) {
  top: 55%;
}
.scan-line:nth-child(5) {
  top: 70%;
}
.scan-line:nth-child(6) {
  top: 85%;
}
.scan-line:nth-child(7) {
  top: 15%;
}
.scan-line:nth-child(8) {
  top: 60%;
}

@keyframes scan-move {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.footer-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  position: relative;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-title {
  position: relative;
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  letter-spacing: 1px;
  margin: 0 0 1rem 0;
  animation: section-title-glitch 6s infinite;
}

.section-title::before,
.section-title::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.section-title::before {
  color: #ff0050;
  animation: section-glitch-1 4s infinite;
  z-index: -1;
}

.section-title::after {
  color: #00ffff;
  animation: section-glitch-2 4s infinite;
  z-index: -2;
}

@keyframes section-title-glitch {
  0%,
  98%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  99% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes section-glitch-1 {
  0%,
  98%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99% {
    transform: translate(-1px, 1px);
    opacity: 0.6;
  }
}

@keyframes section-glitch-2 {
  0%,
  98%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99.5% {
    transform: translate(1px, -1px);
    opacity: 0.6;
  }
}

.section-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.project-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  position: relative;
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  margin-bottom: 0.5rem;
  animation: stat-glitch 8s infinite;
}

.stat-number::before,
.stat-number::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.stat-number::before {
  color: #ff0050;
  animation: stat-glitch-1 6s infinite;
  z-index: -1;
}

.stat-number::after {
  color: #00ffff;
  animation: stat-glitch-2 6s infinite;
  z-index: -2;
}

@keyframes stat-glitch {
  0%,
  97%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  98% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes stat-glitch-1 {
  0%,
  97%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  98% {
    transform: translate(-1px, 1px);
    opacity: 0.7;
  }
}

@keyframes stat-glitch-2 {
  0%,
  97%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  98.5% {
    transform: translate(1px, -1px);
    opacity: 0.7;
  }
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* 链接网格 */
.link-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 0, 80, 0.1);
  border-radius: 4px;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.footer-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 0, 80, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.footer-link:hover::before {
  left: 100%;
}

.footer-link:hover {
  border-color: rgba(255, 0, 80, 0.3);
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
  box-shadow: 0 0 15px rgba(255, 0, 80, 0.2);
}

.link-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.link-text {
  font-weight: 600;
  font-size: 0.9rem;
  flex: 1;
  text-shadow:
    0.5px 0.5px 0px #ff0050,
    -0.5px -0.5px 0px #00ffff;
}

.link-desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

/* 底部版权区域 */
.footer-bottom {
  margin-top: 2rem;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    #ff0050,
    #00ffff,
    transparent
  );
  margin-bottom: 2rem;
  opacity: 0.3;
}

.footer-copyright {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.copyright-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.copyright-text {
  position: relative;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  animation: copyright-glitch 10s infinite;
}

.copyright-text::before,
.copyright-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.copyright-text::before {
  color: #ff0050;
  animation: copyright-glitch-1 8s infinite;
  z-index: -1;
}

.copyright-text::after {
  color: #00ffff;
  animation: copyright-glitch-2 8s infinite;
  z-index: -2;
}

@keyframes copyright-glitch {
  0%,
  99%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  99.5% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes copyright-glitch-1 {
  0%,
  99%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99.5% {
    transform: translate(-1px, 1px);
    opacity: 0.5;
  }
}

@keyframes copyright-glitch-2 {
  0%,
  99%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99.7% {
    transform: translate(1px, -1px);
    opacity: 0.5;
  }
}

.copyright-desc {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
  letter-spacing: 1px;
}

.copyright-right {
  display: flex;
  align-items: center;
}

.version-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.version-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
  letter-spacing: 1px;
}

.version-number {
  position: relative;
  font-size: 1.2rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    1px 1px 0px #ff0050,
    -1px -1px 0px #00ffff;
  animation: version-glitch 12s infinite;
}

.version-number::before,
.version-number::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.version-number::before {
  color: #ff0050;
  animation: version-glitch-1 10s infinite;
  z-index: -1;
}

.version-number::after {
  color: #00ffff;
  animation: version-glitch-2 10s infinite;
  z-index: -2;
}

@keyframes version-glitch {
  0%,
  99.5%,
  100% {
    text-shadow:
      1px 1px 0px #ff0050,
      -1px -1px 0px #00ffff;
  }
  99.8% {
    text-shadow:
      2px 2px 0px #ff0050,
      -2px -2px 0px #00ffff;
  }
}

@keyframes version-glitch-1 {
  0%,
  99.5%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99.8% {
    transform: translate(-1px, 1px);
    opacity: 0.6;
  }
}

@keyframes version-glitch-2 {
  0%,
  99.5%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  99.9% {
    transform: translate(1px, -1px);
    opacity: 0.6;
  }
}

/* Footer 响应式设计 */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
  }

  .project-stats {
    justify-content: center;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 3rem 1rem 1.5rem;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-bottom: 2rem;
  }

  .project-stats {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  .footer-copyright {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .version-badge {
    align-items: center;
  }

  .scan-line:nth-child(n + 5) {
    display: none;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .section-desc {
    font-size: 0.9rem;
  }

  .footer-link {
    padding: 0.6rem;
    gap: 0.6rem;
  }

  .link-text {
    font-size: 0.85rem;
  }

  .link-desc {
    font-size: 0.75rem;
  }

  .stat-number {
    font-size: 1.3rem;
  }

  .copyright-text {
    font-size: 0.8rem;
  }

  .version-number {
    font-size: 1rem;
  }
}
</style>
