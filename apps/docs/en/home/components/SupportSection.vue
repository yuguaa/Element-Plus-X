<script setup lang="ts">
import { ref } from 'vue';

const sponsors = ref([
  { company: 'TechCorp', logo: '🏢' },
  { company: 'DevStudio', logo: '💻' },
  { company: 'CloudTech', logo: '☁️' },
  { company: 'DataFlow', logo: '📊' },
  { company: 'WebForge', logo: '🔧' },
  { company: 'CodeLab', logo: '🧪' },
  { company: 'PixelCraft', logo: '🎨' },
  { company: 'ByteWorks', logo: '⚡' },
  { company: 'NetSphere', logo: '🌐' },
  { company: 'AppVault', logo: '🔐' }
]);
</script>

<template>
  <!-- 赞助与支持区域 - 紧凑设计 -->
  <section class="support-section py-12 relative">
    <div class="support-container max-w-4xl mx-auto px-8 flex flex-col gap-8">
      <!-- 紧凑的标题区域 -->
      <div class="support-header text-center">
        <h2 class="support-title text-3xl font-extrabold m-0 mb-2">
          Thanks for Your Support
        </h2>
        <p class="support-subtitle text-base text-white/70 m-0">
          Their support keeps the open source project moving forward
        </p>
      </div>

      <!-- 玻璃拟态赞助商卡片 -->
      <div
        class="sponsors-glass-card backdrop-blur-5 border border-white/10 rounded-4 p-8 flex flex-col gap-6"
      >
        <!-- 赞助商列表 - 水平布局 -->
        <div
          class="sponsors-list grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"
        >
          <div
            v-for="sponsor in sponsors.slice(0, 6)"
            :key="sponsor.company"
            class="sponsor-compact flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-3 transition-all duration-300 cursor-pointer"
          >
            <div
              class="sponsor-avatar text-3xl w-12.5 h-12.5 flex-center rounded-full border border-white/20"
            >
              {{ sponsor.logo }}
            </div>
            <div
              class="sponsor-name text-sm font-semibold text-white/90 text-center"
            >
              {{ sponsor.company }}
            </div>
          </div>
        </div>

        <!-- 更多赞助商指示器 -->
        <div class="more-sponsors text-center p-4 border-t border-white/10">
          <span class="more-text text-sm text-white/60 italic"
            >+{{ sponsors.length - 6 }} more sponsors</span
          >
        </div>
      </div>

      <!-- 紧凑的CTA区域 -->
      <div
        class="sponsor-cta-compact border border-indigo-500/20 rounded-4 p-6 backdrop-blur-[10px]"
      >
        <div class="cta-content flex items-center justify-between gap-8">
          <div class="cta-left flex items-center gap-4">
            <div
              class="cta-icon text-3xl w-15 h-15 flex-center rounded-full border border-white/20"
            >
              🤝
            </div>
            <div class="cta-text flex-1">
              <h3 class="cta-title text-xl font-bold m-0 mb-1 text-white">
                Become a Sponsor
              </h3>
              <p class="cta-desc text-sm text-white/70 m-0">
                Support open source and get your brand exposure
              </p>
            </div>
          </div>
          <button
            class="sponsor-btn-compact flex items-center gap-2 px-6 py-3 border-none rounded-2.5 text-white font-semibold cursor-pointer transition-all duration-300"
          >
            <span class="btn-text">Sponsor Now</span>
            <span class="btn-arrow transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 背景渐变 */
.support-section {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(59, 130, 246, 0.08) 50%,
    rgba(99, 102, 241, 0.08) 100%
  );
}

/* 标题渐变 */
.support-title {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 玻璃卡片背景 */
.sponsors-glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

/* 赞助商卡片悬停效果 */
.sponsor-compact:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
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
    @apply grid-cols-[repeat(auto-fit,minmax(120px,1fr))];
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
