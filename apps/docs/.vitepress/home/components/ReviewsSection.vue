<script setup lang="ts">
import { ref } from 'vue';

const reviews = ref([
  {
    id: 1,
    name: '张三',
    role: '前端工程师',
    company: '阿里巴巴',
    avatar: '👨‍💻',
    content:
      'Element Plus X 真的很棒！组件设计精美，API 设计合理，大大提升了我们的开发效率。',
    date: '2024-01-15',
    likes: 42
  },
  {
    id: 2,
    name: '李四',
    role: 'UI/UX 设计师',
    company: '腾讯',
    avatar: '👩‍🎨',
    content:
      '作为设计师，我非常喜欢这个组件库的视觉设计。玻璃拟态效果和渐变色彩搭配得恰到好处。',
    date: '2024-01-12',
    likes: 38
  },
  {
    id: 3,
    name: '王五',
    role: '全栈开发者',
    company: '字节跳动',
    avatar: '👨‍🔬',
    content: 'TypeScript 支持非常完善，开发体验很好。文档也很详细，上手很快。',
    date: '2024-01-10',
    likes: 35
  },
  {
    id: 4,
    name: '赵六',
    role: '产品经理',
    company: '美团',
    avatar: '👩‍💼',
    content:
      '我们团队使用 Element Plus X 重构了整个后台管理系统，用户反馈非常好！',
    date: '2024-01-08',
    likes: 29
  },
  {
    id: 5,
    name: '孙七',
    role: '技术总监',
    company: '滴滴',
    avatar: '👨‍💼',
    content: '性能表现出色，组件库的架构设计很合理，适合大型项目使用。',
    date: '2024-01-05',
    likes: 51
  },
  {
    id: 6,
    name: '周八',
    role: '前端架构师',
    company: '京东',
    avatar: '👩‍💻',
    content: '主题定制功能很强大，我们轻松地定制出了符合品牌风格的界面。',
    date: '2024-01-03',
    likes: 33
  }
]);
</script>

<template>
  <!-- 社区评价区域 -->
  <section class="reviews-section py-24 relative">
    <div class="reviews-container max-w-6xl mx-auto px-8">
      <div class="reviews-header text-center mb-16">
        <h2 class="reviews-title text-5xl font-black mx-a mb-4">
          社区评价
        </h2>
        <p class="reviews-subtitle text-lg text-white/70 m-0">
          来自全球开发者的真实反馈
        </p>
      </div>

      <!-- 瀑布流布局 -->
      <div
        id="reviewsMasonry"
        class="reviews-masonry grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 items-start"
      >
        <div
          v-for="review in reviews"
          :key="review.id"
          class="review-card backdrop-blur-5 border border-white/10 rounded-4 p-6 transition-all duration-300 cursor-pointer"
        >
          <div class="review-header mb-4">
            <div class="reviewer-info flex items-center gap-4">
              <div
                class="reviewer-avatar w-12.5 h-12.5 rounded-full flex-center text-2xl border-2 border-white/10"
              >
                {{ review.avatar }}
              </div>
              <div class="reviewer-details flex-1">
                <h4
                  class="reviewer-name text-lg font-semibold text-white m-0 mb-1"
                >
                  {{ review.name }}
                </h4>
                <p class="reviewer-role text-sm text-white/60 m-0">
                  {{ review.role }} @ {{ review.company }}
                </p>
              </div>
            </div>
          </div>

          <div class="review-content mb-4">
            <p class="review-text text-base leading-relaxed text-white/80 m-0">
              {{ review.content }}
            </p>
          </div>

          <div
            class="review-footer flex items-center justify-between pt-4 border-t border-white/10"
          >
            <span class="review-date text-sm text-white/50">{{
              review.date
            }}</span>
            <div class="review-actions flex gap-2">
              <button
                class="like-btn flex items-center gap-1 bg-white/10 border border-white/20 rounded-5 px-3 py-1 text-white/70 text-sm cursor-pointer transition-all duration-300"
              >
                <span class="like-icon text-sm">👍</span>
                <span class="like-count font-medium">{{ review.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
/* 社区评价区域 */
.reviews-section {
  padding: 6rem 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.05) 0%,
    rgba(99, 102, 241, 0.05) 50%,
    rgba(139, 92, 246, 0.05) 100%
  );
  position: relative;
}

/* 标题渐变动画 */
.reviews-title {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 25%, #6366f1 50%, #8b5cf6 75%, #ffffff 100%);
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

/* 卡片样式 */
.review-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  animation: cardFadeIn 0.6s ease-out;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.review-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-5px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 10px 20px rgba(99, 102, 241, 0.1);
}

/* 头像渐变背景 */
.reviewer-avatar {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
}

/* 点赞按钮悬停效果 */
.like-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  color: white;
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .reviews-section {
    @apply py-16;
  }

  .reviews-container {
    @apply px-4;
  }

  .reviews-title {
    @apply text-3xl;
  }

  .reviews-masonry {
    @apply grid-cols-1 gap-6;
  }

  .review-card {
    @apply p-5;
  }

  .reviewer-avatar {
    @apply w-10 h-10 text-xl;
  }

  .reviewer-name {
    @apply text-base;
  }

  .reviewer-role {
    @apply text-xs;
  }

  .review-text {
    @apply text-sm;
  }
}

@media (max-width: 480px) {
  .reviews-section {
    @apply py-12;
  }

  .reviews-title {
    @apply text-2xl;
  }

  .reviews-subtitle {
    @apply text-base;
  }

  .review-card {
    @apply p-4;
  }

  .reviewer-info {
    @apply gap-3;
  }

  .reviewer-avatar {
    @apply w-8.75 h-8.75 text-base;
  }

  .reviewer-name {
    @apply text-sm;
  }

  .reviewer-role {
    @apply text-xs;
  }

  .review-text {
    @apply text-sm;
  }

  .review-date {
    @apply text-xs;
  }

  .like-btn {
    @apply px-2 py-0.5 text-xs;
  }
}
</style>
