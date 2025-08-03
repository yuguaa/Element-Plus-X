<script setup lang="ts">
// import { nextTick, onMounted } from 'vue';
import {
  Contributors,
  FeaturesSection,
  Footer,
  HeroSection,
  ProductDisplayArea,
  ReviewsSection,
  SupportSection
} from './components';
</script>

<template>
  <div class="page-container">
    <!-- 首屏英雄区 -->
    <HeroSection />

    <!-- 赞助与支持区域 -->
    <SupportSection class="mt-[-100px]" />

    <!-- 特性区域 -->
    <FeaturesSection class="mt-[500px]" />

    <!-- 产品展示区域 -->
    <ProductDisplayArea />

    <!-- 社区评价区域 -->
    <ReviewsSection />

    <!-- 贡献者 -->
    <Contributors />

    <!-- 底部区域 -->
    <Footer />
  </div>
</template>

<style scoped></style>
