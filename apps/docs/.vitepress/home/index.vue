<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  Contributors,
  FeaturesSection,
  Footer,
  HeroSection,
  ReviewsSection,
  SupportSection
} from './components';

gsap.registerPlugin(ScrollTrigger);
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
