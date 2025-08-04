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
    <div class="mt-[-100px]">
      <SupportSection />
    </div>

    <!-- 特性区域 -->
    <div class="mt-[500px]">
      <FeaturesSection />
    </div>

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
