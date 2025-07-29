<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { sponsors } from './reviews.json';

const toBeSponsor = ref<string>('https://chat.element-plus-x.com/chat');
</script>

<template>
  <!-- 赞助与支持区域 - 紧凑设计 -->
  <section class="support-section py-24 relative">
    <div class="support-container max-w-4xl mx-auto px-8 flex flex-col gap-8">
      <!-- 紧凑的标题区域 -->
      <div class="support-header text-center">
        <h2 class="support-title text-3xl font-extrabold m-0 mb-2">
          <!-- Platinum Sponsors -->
          白金赞助商
        </h2>
      </div>

      <!-- 玻璃拟态赞助商卡片 -->
      <div
        class="sponsors-glass-card backdrop-blur-5 border border-white/10 rounded-4 p-8 flex flex-col gap-6"
      >
        <!-- 赞助商列表 - 水平布局 -->
        <div
          class="sponsors-list grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"
        >
          <a
            v-for="sponsor in sponsors"
            :key="sponsor.company"
            :href="sponsor.companyUrl || 'javascript:void(0);'"
            :target="sponsor.companyUrl ? '_blank' : '_self'"
            class="background-point background-scale sponsor-compact flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-3 transition-all duration-300 cursor-pointer"
          >
            <el-badge :value="12" :max="999" hidden>
              <el-avatar
                class="sponsor-avatar text-3xl w-12.5 h-12.5 flex-center rounded-full border border-white/20"
                :size="46"
                :src="sponsor.logo"
              />
            </el-badge>
            <div
              class="sponsor-name text-sm font-semibold text-white/90 text-center"
            >
              {{ sponsor.company }}
            </div>
            <!-- </div> -->
          </a>
          <a
            :href="toBeSponsor"
            target="_blank"
            class="background-scale banner-cta no-underline sponsor-compact flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-3 transition-all duration-300 cursor-pointer"
          >
            <div
              class="sponsor-avatar text-3xl w-12.5 h-12.5 flex-center rounded-full border border-white/20"
            >
              <el-icon class="text-4xl text-red-500">
                <Plus />
              </el-icon>
            </div>
            <div
              class="sponsor-name text-sm font-semibold text-white/90 text-center"
            >
              成为赞助商
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 背景渐变 */
.support-section {
  z-index: 10;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(59, 130, 246, 0.08) 50%,
    rgba(99, 102, 241, 0.08) 100%
  );
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

/* 标题渐变 */
.support-title {
  /* background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%); */
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

/* 玻璃卡片背景 */
.sponsors-glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.background-point {
  user-select: none;
  position: relative;
  overflow: hidden;
}

.background-point::before {
  --size: 120px;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(
    circle closest-side,
    rgba(100, 100, 100, 0.7),
    transparent
  );
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
}

.background-point:hover::before {
  --size: 360px;
}

.background-scale:hover {
  transform: scale(1.02);
}

/* 头像渐变背景 */
.sponsor-avatar {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
}

/* CTA区域背景 */
.sponsor-cta-compact {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
}

/* CTA图标背景 */
.cta-icon {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
}

/* 按钮样式 */
.sponsor-btn-compact {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.sponsor-btn-compact:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.sponsor-btn-compact:hover .btn-arrow {
  transform: translateX(3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .support-section {
    @apply py-8;
  }

  .support-container {
    @apply px-4;
  }

  .support-title {
    @apply text-2xl;
  }

  .sponsors-glass-card {
    @apply p-6;
  }

  .sponsors-list {
    @apply grid-cols-[repeat(auto-fit, minmax(120px, 1fr))];
  }

  .cta-content {
    @apply flex-col text-center gap-6;
  }

  .cta-left {
    @apply flex-col text-center;
  }
}

@media (max-width: 480px) {
  .sponsors-list {
    @apply grid-cols-2;
  }

  .sponsor-compact {
    @apply p-3;
  }

  .sponsor-avatar {
    @apply w-10 h-10 text-2xl;
  }

  .sponsor-name {
    @apply text-xs;
  }

  .cta-icon {
    @apply w-12.5 h-12.5 text-2xl;
  }

  .cta-title {
    @apply text-lg;
  }

  .cta-desc {
    @apply text-xs;
  }
}
</style>
