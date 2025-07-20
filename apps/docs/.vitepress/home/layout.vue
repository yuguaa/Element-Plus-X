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
  // Linear风格流动渐变背景动画
  gsap.to('.linear-gradient-bg', {
    backgroundPosition: '200% 50%',
    duration: 20,
    repeat: -1,
    ease: 'none'
  });

  // 几何形状动画
  gsap.utils.toArray('.geometric-shape').forEach((shape: any, i: number) => {
    gsap.to(shape, {
      y: 'random(-20, 20)',
      x: 'random(-15, 15)',
      rotation: 'random(0, 360)',
      duration: 'random(8, 15)',
      repeat: -1,
      yoyo: true,
      delay: i * 0.3,
      ease: 'sine.inOut'
    });
  });

  // Linear风格Logo悬浮动画
  gsap.to('.linear-logo-x', {
    y: -5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Linear导航菜单项悬停动画
  gsap.utils.toArray('.opulous-menu a').forEach((el: any) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        y: -2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Linear Footer链接悬停效果
  gsap.utils.toArray('.footer-link').forEach((link: any) => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        x: 0,
        duration: 0.3,
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

  const footer = document.querySelector('.linear-footer');
  if (footer) {
    footerObserver.observe(footer);
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] via-[#16213e] via-[#2d1b69] to-[#4a148c] text-white font-sans overflow-x-hidden relative"
  >
    <!-- Linear风格背景装饰 -->
    <div class="linear-background fixed inset-0 z-0 pointer-events-none">
      <div class="linear-gradient-bg" />
      <div class="geometric-patterns absolute inset-0">
        <div
          v-for="i in 6"
          :key="i"
          class="geometric-shape"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }"
        />
      </div>
    </div>

    <!-- 导航栏 -->
    <header
      class="opulous-header fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-[5vw] z-100 backdrop-blur-[30px]"
    >
      <div class="flex items-center gap-4">
        <div class="opulous-logo-icon relative w-10 h-10 flex-center">
          <div class="linear-logo-x c-amber flex-center">Z</div>
        </div>
      </div>

      <nav class="opulous-menu flex gap-12 z-101" :class="{ open: menuOpen }">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="text-white/90 no-underline text-base font-semibold relative transition-all duration-300 tracking-wider uppercase py-2 hover:text-[#6366f1]"
          >{{ item.name }}</a
        >
      </nav>

      <div
        class="menu-toggle hidden flex-col gap-1.5 cursor-pointer p-2.5 z-102"
        @click="toggleMenu"
      >
        <span
          class="block w-6.5 h-0.5 bg-[#6366f1] rounded-sm transition-all duration-300"
        />
        <span
          class="block w-6.5 h-0.5 bg-[#6366f1] rounded-sm transition-all duration-300"
        />
        <span
          class="block w-6.5 h-0.5 bg-[#6366f1] rounded-sm transition-all duration-300"
        />
      </div>
    </header>

    <!-- 主内容 -->
    <main class="relative z-10 pt-20 min-h-[calc(100vh-80px)] bg-transparent">
      <Theme.Layout />
    </main>

    <!-- Footer -->
    <footer
      class="linear-footer relative mt-16 overflow-hidden backdrop-blur-[25px]"
    >
      <!-- Linear简洁背景 -->
      <div class="footer-linear-bg absolute inset-0 pointer-events-none z-1">
        <div class="footer-gradient-lines absolute inset-0">
          <div v-for="i in 3" :key="i" class="gradient-line" />
        </div>
      </div>

      <div
        class="footer-container relative z-10 max-w-6xl mx-auto px-8 py-16 pb-8"
      >
        <!-- 主要内容区域 -->
        <div
          class="footer-main grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-12"
        >
          <!-- 项目介绍 -->
          <div class="footer-section relative">
            <div class="section-header mb-6">
              <h3
                class="section-title linear-text text-xl font-bold tracking-wide m-0 mb-4"
              >
                ELEMENT PLUS X
              </h3>
            </div>
            <p class="section-desc text-sm text-white/70 leading-relaxed mb-8">
              下一代 Vue 3 组件库，融合现代设计与极致性能。
              为开发者提供强大、灵活、美观的 UI 解决方案。
            </p>
            <div class="project-stats flex gap-8">
              <div class="stat-item text-center">
                <span
                  class="stat-number linear-number block text-3xl font-extrabold mb-2"
                  >50+</span
                >
                <span
                  class="stat-label text-xs text-white/50 font-semibold tracking-wide uppercase"
                  >组件</span
                >
              </div>
              <div class="stat-item text-center">
                <span
                  class="stat-number linear-number block text-3xl font-extrabold mb-2"
                  >10K+</span
                >
                <span
                  class="stat-label text-xs text-white/50 font-semibold tracking-wide uppercase"
                  >下载</span
                >
              </div>
              <div class="stat-item text-center">
                <span
                  class="stat-number linear-number block text-3xl font-extrabold mb-2"
                  >99%</span
                >
                <span
                  class="stat-label text-xs text-white/50 font-semibold tracking-wide uppercase"
                  >满意度</span
                >
              </div>
            </div>
          </div>

          <!-- 生态链接 -->
          <div class="footer-section relative">
            <div class="section-header mb-6">
              <h3
                class="section-title linear-text text-xl font-bold tracking-wide m-0 mb-4"
              >
                ECOSYSTEM
              </h3>
            </div>
            <div class="link-grid flex flex-col gap-4">
              <a href="https://vuejs.org" class="footer-link" target="_blank">
                <span class="link-icon text-xl flex-shrink-0">⚡</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Vue.js</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >渐进式框架</span
                >
              </a>
              <a href="https://vitejs.dev" class="footer-link" target="_blank">
                <span class="link-icon text-xl flex-shrink-0">🚀</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Vite</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >构建工具</span
                >
              </a>
              <a
                href="https://www.typescriptlang.org"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">📘</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >TypeScript</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >类型安全</span
                >
              </a>
              <a
                href="https://pinia.vuejs.org"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">🍍</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Pinia</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >状态管理</span
                >
              </a>
            </div>
          </div>

          <!-- 社区链接 -->
          <div class="footer-section relative">
            <div class="section-header mb-6">
              <h3
                class="section-title linear-text text-xl font-bold tracking-wide m-0 mb-4"
              >
                COMMUNITY
              </h3>
            </div>
            <div class="link-grid flex flex-col gap-4">
              <a
                href="https://github.com/element-plus/element-plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">🐙</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >GitHub</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >源码仓库</span
                >
              </a>
              <a
                href="https://discord.gg/element-plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">💬</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Discord</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >实时交流</span
                >
              </a>
              <a
                href="https://twitter.com/element_plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">🐦</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Twitter</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >最新动态</span
                >
              </a>
              <a
                href="https://stackoverflow.com/questions/tagged/element-plus"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">📚</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Stack Overflow</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >问题解答</span
                >
              </a>
            </div>
          </div>

          <!-- 友情链接 -->
          <div class="footer-section relative">
            <div class="section-header mb-6">
              <h3
                class="section-title linear-text text-xl font-bold tracking-wide m-0 mb-4"
              >
                PARTNERS
              </h3>
            </div>
            <div class="link-grid flex flex-col gap-4">
              <a href="https://antdv.com" class="footer-link" target="_blank">
                <span class="link-icon text-xl flex-shrink-0">🐜</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Ant Design Vue</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >企业级UI</span
                >
              </a>
              <a href="https://naiveui.com" class="footer-link" target="_blank">
                <span class="link-icon text-xl flex-shrink-0">🌟</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Naive UI</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >现代组件库</span
                >
              </a>
              <a href="https://quasar.dev" class="footer-link" target="_blank">
                <span class="link-icon text-xl flex-shrink-0">💎</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >Quasar</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >全栈框架</span
                >
              </a>
              <a
                href="https://primevue.org"
                class="footer-link"
                target="_blank"
              >
                <span class="link-icon text-xl flex-shrink-0">🎨</span>
                <span
                  class="link-text font-semibold text-sm flex-1 text-white/90"
                  >PrimeVue</span
                >
                <span class="link-desc text-xs text-white/60 flex-shrink-0"
                  >丰富组件</span
                >
              </a>
            </div>
          </div>
        </div>

        <!-- 底部版权信息 -->
        <div class="footer-bottom mt-8">
          <div class="footer-divider" />
          <div class="footer-copyright flex justify-between items-center py-6">
            <div class="copyright-left flex flex-col gap-2">
              <span class="copyright-text linear-text text-sm font-semibold"
                >© 2024 ELEMENT PLUS X</span
              >
              <span
                class="copyright-desc text-xs text-white/40 font-semibold tracking-wide"
                >ALL RIGHTS RESERVED</span
              >
            </div>
            <div class="copyright-right flex items-center">
              <span class="version-badge flex flex-col items-end gap-1">
                <span
                  class="version-label text-xs text-white/40 font-semibold tracking-wide"
                  >VERSION</span
                >
                <span class="version-number linear-text text-xl font-extrabold"
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
/* 保留必要的动画和复杂渐变 */
@keyframes layoutGradientShift {
  0%,
  100% {
    background-position:
      0% 0%,
      0% 0%,
      100% 100%,
      50% 50%;
  }
  25% {
    background-position:
      25% 25%,
      20% 20%,
      80% 80%,
      30% 70%;
  }
  50% {
    background-position:
      50% 50%,
      40% 40%,
      60% 60%,
      70% 30%;
  }
  75% {
    background-position:
      75% 75%,
      60% 60%,
      40% 40%,
      20% 80%;
  }
}

.linear-gradient-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      135deg,
      #0f0f23 0%,
      #1a1a2e 15%,
      #16213e 30%,
      #2d1b69 45%,
      #4a148c 60%,
      #6a1b9a 75%,
      #8b5cf6 90%,
      #6366f1 100%
    ),
    linear-gradient(
      45deg,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 50%,
      rgba(139, 92, 246, 0.1) 100%
    ),
    radial-gradient(
      circle at 30% 70%,
      rgba(59, 130, 246, 0.08) 0%,
      transparent 50%
    );
  background-size:
    300% 300%,
    200% 200%,
    150% 150%;
  opacity: 0.9;
  animation: backgroundFlow 30s ease-in-out infinite;
}

@keyframes backgroundFlow {
  0%,
  100% {
    background-position:
      0% 0%,
      0% 0%,
      0% 0%;
  }
  33% {
    background-position:
      100% 100%,
      50% 50%,
      30% 70%;
  }
  66% {
    background-position:
      50% 50%,
      100% 100%,
      70% 30%;
  }
}

.geometric-shape {
  position: absolute;
  width: 4px;
  height: 4px;
  background:
    linear-gradient(
      45deg,
      #6366f1 0%,
      #8b5cf6 25%,
      #3b82f6 50%,
      #ec4899 75%,
      #10b981 100%
    ),
    radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  background-size:
    200% 200%,
    100% 100%;
  border-radius: 2px;
  opacity: 0.6;
  animation:
    geometric-float 12s infinite ease-in-out,
    shapeGradientShift 8s infinite ease-in-out;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}

@keyframes shapeGradientShift {
  0%,
  100% {
    background-position:
      0% 0%,
      center;
  }
  50% {
    background-position:
      100% 100%,
      center;
  }
}

@keyframes geometric-float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 0.3;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 0.5;
  }
}

/* 导航栏背景和边框 */
.opulous-header {
  background:
    linear-gradient(
      135deg,
      rgba(15, 15, 35, 0.95) 0%,
      rgba(26, 26, 46, 0.9) 50%,
      rgba(22, 33, 62, 0.95) 100%
    ),
    radial-gradient(
      ellipse at left,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at right,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    );
  border-bottom: 1px solid;
  border-image: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.3),
      rgba(139, 92, 246, 0.3),
      rgba(59, 130, 246, 0.3)
    )
    1;
  box-shadow:
    0 4px 30px rgba(15, 15, 35, 0.8),
    0 0 20px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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

/* 导航链接悬停效果 */
.opulous-menu a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.opulous-menu a:hover::after {
  width: 100%;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .opulous-header {
    @apply px-4vw h-17.5;
  }

  .opulous-main {
    @apply pt-17.5 min-h-[calc(100vh-70px)];
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
    @apply flex;
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
    @apply px-3vw;
  }

  .opulous-logo-icon {
    @apply w-8.75 h-8.75;
  }

  .opulous-menu {
    @apply w-85vw px-6 py-8;
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

/* Footer背景和渐变线条 */
.linear-footer {
  background:
    linear-gradient(
      135deg,
      rgba(15, 15, 35, 0.98) 0%,
      rgba(26, 26, 46, 0.95) 50%,
      rgba(22, 33, 62, 0.98) 100%
    ),
    radial-gradient(
      ellipse at top,
      rgba(99, 102, 241, 0.08) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at bottom,
      rgba(139, 92, 246, 0.08) 0%,
      transparent 60%
    );
  border-top: 1px solid;
  border-image: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.3),
      rgba(139, 92, 246, 0.3),
      rgba(59, 130, 246, 0.3)
    )
    1;
  box-shadow:
    0 -4px 30px rgba(15, 15, 35, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.gradient-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(99, 102, 241, 0.6),
      rgba(139, 92, 246, 0.6),
      rgba(59, 130, 246, 0.6),
      rgba(236, 72, 153, 0.6),
      rgba(16, 185, 129, 0.6),
      transparent
    ),
    radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
  animation: gradient-move 10s infinite linear;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
}

.gradient-line:nth-child(1) {
  top: 20%;
  animation-delay: 0s;
}
.gradient-line:nth-child(2) {
  top: 50%;
  animation-delay: -3s;
}
.gradient-line:nth-child(3) {
  top: 80%;
  animation-delay: -6s;
}

@keyframes gradient-move {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* 标题渐变动画 */
.section-title {
  background: linear-gradient(
    135deg,
    #6366f1 0%,
    #8b5cf6 30%,
    #3b82f6 60%,
    #6366f1 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: sectionTitleGradient 7s ease-in-out infinite;
  filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.3));
}

@keyframes sectionTitleGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Linear文本样式 */
.linear-text {
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
  filter: drop-shadow(0 0 18px rgba(99, 102, 241, 0.4));
  animation: linearTextGradient 9s ease-in-out infinite;
}

@keyframes linearTextGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.linear-number {
  background: linear-gradient(
    135deg,
    #6366f1 0%,
    #8b5cf6 20%,
    #3b82f6 40%,
    #ec4899 60%,
    #10b981 80%,
    #6366f1 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.4));
  animation: linearNumberGradient 5s ease-in-out infinite;
}

@keyframes linearNumberGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Footer链接样式 */
.footer-link {
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    linear-gradient(
      45deg,
      rgba(99, 102, 241, 0.04) 0%,
      rgba(139, 92, 246, 0.04) 100%
    ),
    radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.02) 0%,
      transparent 70%
    );
  border: 1px solid;
  border-image: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.25),
      rgba(139, 92, 246, 0.25),
      rgba(59, 130, 246, 0.25)
    )
    1;
  box-shadow:
    0 2px 10px rgba(99, 102, 241, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Footer链接悬停效果 */
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
    rgba(99, 102, 241, 0.15),
    rgba(139, 92, 246, 0.15),
    rgba(59, 130, 246, 0.15),
    transparent
  );
  transition: left 0.6s ease;
}

.footer-link:hover::before {
  left: 100%;
}

.footer-link:hover {
  border-image: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.5),
      rgba(139, 92, 246, 0.5),
      rgba(59, 130, 246, 0.5)
    )
    1;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.04) 100%
    ),
    linear-gradient(
      45deg,
      rgba(99, 102, 241, 0.08) 0%,
      rgba(139, 92, 246, 0.08) 100%
    ),
    radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 70%
    );
  transform: translateX(8px) scale(1.02);
  box-shadow:
    0 4px 25px rgba(99, 102, 241, 0.2),
    0 0 20px rgba(139, 92, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Footer分割线 */
.footer-divider {
  height: 2px;
  background:
    linear-gradient(
      90deg,
      transparent,
      #6366f1,
      #8b5cf6,
      #3b82f6,
      #ec4899,
      #10b981,
      #6366f1,
      transparent
    ),
    radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
  background-size:
    200% 100%,
    100% 100%;
  margin-bottom: 2rem;
  opacity: 0.6;
  border-radius: 1px;
  animation: dividerGradientFlow 8s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
}

@keyframes dividerGradientFlow {
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

/* 版权文本渐变 */
.copyright-text {
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
  animation: copyrightGradient 8s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));
}

@keyframes copyrightGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 版本号渐变 */
.version-number {
  background: linear-gradient(
    135deg,
    #6366f1 0%,
    #8b5cf6 20%,
    #3b82f6 40%,
    #ec4899 60%,
    #10b981 80%,
    #6366f1 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.4));
  animation: versionGradient 6s ease-in-out infinite;
}

@keyframes versionGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Footer 响应式设计 */
@media (max-width: 1024px) {
  .footer-main {
    @apply grid-cols-2 gap-8;
  }

  .footer-section:first-child {
    @apply col-span-full;
  }

  .project-stats {
    @apply justify-center gap-6;
  }
}

@media (max-width: 768px) {
  .footer-container {
    @apply px-4 py-12 pb-6;
  }

  .footer-main {
    @apply grid-cols-1 gap-10 mb-8;
  }

  .project-stats {
    @apply flex-col gap-4 items-center;
  }

  .stat-item {
    @apply flex items-center gap-4;
  }

  .stat-number {
    @apply text-2xl mb-0;
  }

  .footer-copyright {
    @apply flex-col gap-4 text-center;
  }

  .version-badge {
    @apply items-center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    @apply px-4 py-8 pb-4;
  }

  .section-title {
    @apply text-base;
  }

  .section-desc {
    @apply text-sm;
  }

  .footer-link {
    @apply p-2.5 gap-2.5;
  }

  .link-text {
    @apply text-sm;
  }

  .link-desc {
    @apply text-xs;
  }

  .stat-number {
    @apply text-xl;
  }

  .copyright-text {
    @apply text-xs;
  }

  .version-number {
    @apply text-base;
  }
}
</style>
