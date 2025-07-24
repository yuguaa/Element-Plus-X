<script setup lang="ts">
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import { nextTick, onMounted } from 'vue';
import {
  Contributors,
  FeaturesSection,
  Footer,
  HeroSection,
  ReviewsSection,
  SupportSection
} from './components';

// gsap.registerPlugin(ScrollTrigger);

// onMounted(async () => {
//   await nextTick();

//   // 创建主时间线
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: '.page-container',
//       start: 'top center',
//       end: 'bottom center',
//       toggleActions: 'play none none reverse'
//     }
//   });

//   // 添加入场动画
//   tl.from('.hero-banner', {
//     y: -50,
//     opacity: 0,
//     duration: 0.8,
//     ease: 'power2.out'
//   })
//     .from(
//       '.hero-section',
//       {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power2.out'
//       },
//       '-=0.4'
//     )
//     .from(
//       '.quickstart-section',
//       {
//         y: 30,
//         opacity: 0,
//         duration: 0.8,
//         ease: 'power2.out'
//       },
//       '-=0.2'
//     );
// });
</script>

<template>
  <div class="page-container">
    <!-- 顶部横幅广告 -->
    <!-- <HeroBanner /> -->

    <!-- 首屏英雄区 -->
    <HeroSection />

    <!-- 赞助与支持区域 -->
    <SupportSection />

    <!-- 特性区域 -->
    <FeaturesSection />

    <!-- 社区评价区域 -->
    <ReviewsSection />

    <!-- 贡献者 -->
    <Contributors />

    <!-- 底部区域 -->
    <Footer />
  </div>
</template>

<style scoped></style>
