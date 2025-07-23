<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { nextTick, onMounted } from 'vue';
import {
  FeaturesSection,
  HeroBanner,
  HeroSection,
  ReviewsSection,
  SupportSection
} from './components';

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  await nextTick();

  // 创建主时间线
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.page-container',
      start: 'top center',
      end: 'bottom center',
      toggleActions: 'play none none reverse'
    }
  });

  // 添加入场动画
  tl.from('.hero-banner', {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })
    .from(
      '.hero-section',
      {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      },
      '-=0.4'
    )
    .from(
      '.quickstart-section',
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      },
      '-=0.2'
    );
});
</script>

<template>
  <div
    class="page-container min-h-screen text-white font-sans overflow-x-hidden relative"
  >
    <!-- 顶部横幅广告 -->
    <HeroBanner />

    <!-- 首屏英雄区 -->
    <HeroSection />

    <!-- 赞助与支持区域 -->
    <SupportSection />

    <!-- 特性区域 -->
    <FeaturesSection />

    <!-- 社区评价区域 -->
    <ReviewsSection />
  </div>
</template>

<style scoped>
.page-container {
  background:
    linear-gradient(
      135deg,
      #0f0f23 0%,
      #1a1a2e 25%,
      #16213e 50%,
      #2d1b69 75%,
      #4a148c 100%
    ),
    radial-gradient(
      ellipse at top left,
      rgba(99, 102, 241, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at bottom right,
      rgba(139, 92, 246, 0.15) 0%,
      transparent 50%
    );
  background-size:
    100% 100%,
    80% 80%,
    80% 80%;
  background-attachment: fixed;
  animation: gradientShift 20s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position:
      0% 50%,
      0% 0%,
      100% 100%;
  }

  25% {
    background-position:
      25% 75%,
      25% 25%,
      75% 75%;
  }

  50% {
    background-position:
      50% 100%,
      50% 50%,
      50% 50%;
  }

  75% {
    background-position:
      75% 75%,
      75% 75%,
      25% 25%;
  }
}
</style>
