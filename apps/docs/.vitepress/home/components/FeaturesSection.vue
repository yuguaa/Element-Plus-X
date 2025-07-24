<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';

const features = ref([
  {
    icon: '⚡',
    title: '极速开发',
    desc: '开箱即用的组件库，让您专注于业务逻辑而非重复造轮子'
  },
  {
    icon: '🎨',
    title: '现代设计',
    desc: '融合 Linear 设计语言，提供优雅的视觉体验'
  },
  {
    icon: '🔒',
    title: '类型安全',
    desc: '完整的 TypeScript 支持，提供更好的开发体验'
  },
  {
    icon: '📱',
    title: '响应式',
    desc: '完美适配各种设备，从桌面到移动端'
  },
  {
    icon: '🌙',
    title: '主题定制',
    desc: '灵活的主题系统，轻松定制符合品牌的设计'
  },
  {
    icon: '🚀',
    title: '高性能',
    desc: '优化的渲染性能，确保应用流畅运行'
  }
]);

onMounted(() => {
  // 3D鼠标跟踪效果
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach((card, index) => {
    // 设置CSS变量用于动画延迟
    (card as HTMLElement).style.setProperty('--index', index.toString());

    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = card.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 计算鼠标相对于卡片中心的位置（-1 到 1）
      const rotateY = ((x - centerX) / centerX) * 15; // 左右倾斜
      const rotateX = ((y - centerY) / centerY) * -15; // 上下倾斜（负值让效果更自然）

      // 应用3D变换，包含悬浮效果
      gsap.to(card, {
        duration: 0.3,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        scale: 1.05,
        y: -20,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        y: 0,
        ease: 'power2.out'
      });
    });
  });
});
</script>

<template>
  <!-- 特性区域 -->
  <main class="py-24 max-w-6xl mx-auto relative">
    <h2 class="features-title text-5xl mx-a font-black text-center mb-16">
      特性
    </h2>
    <div
      class="features-grid grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-12"
    >
      <div
        v-for="(feature, i) in features"
        :key="i"
        class="feature-card relative rounded-5 p-10 px-8 backdrop-blur-[25px] border border-white/10 overflow-hidden cursor-pointer"
      >
        <div class="feature-icon text-6xl mb-6 inline-block">
          {{ feature.icon }}
        </div>
        <h3 class="feature-title text-2xl font-bold mb-4 tracking-wider">
          {{ feature.title }}
        </h3>
        <p
          class="feature-desc text-base leading-relaxed text-white/80 font-normal opacity-90"
        >
          {{ feature.desc }}
        </p>
        <div class="feature-glow" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
/* 标题渐变动画 */
.features-title {
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

/* 特性网格透视效果 */
.features-grid {
  perspective: 1200px;
  perspective-origin: center center;
}

/* 特性卡片样式 */
.feature-card {
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    linear-gradient(
      45deg,
      rgba(99, 102, 241, 0.05) 0%,
      rgba(139, 92, 246, 0.05) 100%
    );
  transform-style: preserve-3d;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 5px 15px rgba(99, 102, 241, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: cardFloat 6s ease-in-out infinite;
  animation-delay: calc(var(--index, 0) * 0.3s);
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
}

/* 卡片浮动动画 */
@keyframes cardFloat {
  0%,
  100% {
    transform: translateY(0) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: translateY(-10px) rotateX(2deg) rotateY(1deg);
  }
}

/* 卡片悬停效果 */
.feature-card:hover {
  border-color: rgba(99, 102, 241, 0.6);
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.12) 100%
    ),
    linear-gradient(
      45deg,
      rgba(99, 102, 241, 0.15) 0%,
      rgba(139, 92, 246, 0.15) 100%
    );
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.4),
    0 20px 40px rgba(99, 102, 241, 0.3),
    0 0 60px rgba(139, 92, 246, 0.25),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-20px) scale(1.05);
  animation-play-state: paused;
}

/* 图标样式和动画 */
.feature-icon {
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6))
    drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateZ(30px);
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(99, 102, 241, 0.4);
  animation: iconGlow 4s ease-in-out infinite;
}

@keyframes iconGlow {
  0%,
  100% {
    filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6))
      drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))
      drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
  }
}

.feature-card:hover .feature-icon {
  transform: translateZ(30px) scale(1.2);
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.8))
    drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
  text-shadow:
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 40px rgba(99, 102, 241, 0.6);
}

/* 特性标题样式 */
.feature-title {
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
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateZ(20px);
  animation: titleGradient 6s ease-in-out infinite;
  text-shadow:
    0 0 10px rgba(99, 102, 241, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.2);
}

.feature-card:hover .feature-title {
  transform: translateZ(20px);
  text-shadow:
    0 0 20px rgba(99, 102, 241, 0.5),
    0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 特性描述样式 */
.feature-desc {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateZ(15px);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.feature-card:hover .feature-desc {
  color: rgba(255, 255, 255, 0.95);
  transform: translateZ(15px);
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(99, 102, 241, 0.2);
  opacity: 1;
}

/* 发光效果 */
.feature-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background:
    radial-gradient(
      circle at 30% 30%,
      rgba(99, 102, 241, 0.2) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 70%,
      rgba(139, 92, 246, 0.2) 0%,
      transparent 50%
    ),
    linear-gradient(
      90deg,
      transparent,
      rgba(0, 212, 255, 0.3),
      rgba(156, 39, 176, 0.3),
      transparent
    );
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  border-radius: 25px;
  filter: blur(10px);
  transform: translateZ(-10px);
  animation: glowPulse 8s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0;
    transform: translateZ(-10px) scale(0.9);
  }
  50% {
    opacity: 0.4;
    transform: translateZ(-10px) scale(1.1);
  }
}

.feature-card:hover .feature-glow {
  opacity: 1;
  transform: translateZ(-5px) scale(1.2);
  filter: blur(15px);
  box-shadow:
    0 0 30px rgba(0, 212, 255, 0.4),
    0 0 50px rgba(156, 39, 176, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .features-area {
    @apply py-16 px-4;
  }

  .features-title {
    @apply text-3xl mb-12;
  }

  .features-grid {
    @apply grid-cols-1 gap-6;
  }

  .feature-card {
    @apply p-8 px-6;
  }

  .feature-icon {
    @apply text-4xl;
  }

  .feature-title {
    @apply text-xl;
  }

  .feature-desc {
    @apply text-sm;
  }
}

@media (max-width: 480px) {
  .features-area {
    @apply py-12 px-4;
  }

  .features-title {
    @apply text-2xl mb-8;
  }

  .feature-card {
    @apply p-6 px-4;
  }

  .feature-icon {
    @apply text-3xl mb-4;
  }

  .feature-title {
    @apply text-lg;
  }

  .feature-desc {
    @apply text-xs;
  }
}
</style>
