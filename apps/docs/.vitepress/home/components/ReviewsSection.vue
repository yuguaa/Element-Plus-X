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
  <section class="reviews-section">
    <div class="reviews-container">
      <div class="reviews-header">
        <h2 class="reviews-title">社区评价</h2>
        <p class="reviews-subtitle">来自全球开发者的真实反馈</p>
      </div>

      <!-- 瀑布流布局 -->
      <div id="reviewsMasonry" class="reviews-masonry">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-avatar">
                {{ review.avatar }}
              </div>
              <div class="reviewer-details">
                <h4 class="reviewer-name">
                  {{ review.name }}
                </h4>
                <p class="reviewer-role">
                  {{ review.role }} @ {{ review.company }}
                </p>
              </div>
            </div>
          </div>

          <div class="review-content">
            <p class="review-text">
              {{ review.content }}
            </p>
          </div>

          <div class="review-footer">
            <span class="review-date">{{ review.date }}</span>
            <div class="review-actions">
              <button class="like-btn">
                <span class="like-icon">👍</span>
                <span class="like-count">{{ review.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.reviews-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.reviews-header {
  text-align: center;
  margin-bottom: 4rem;
}

.reviews-title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
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

.reviews-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.reviews-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  align-items: start;
}

.review-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
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
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-5px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 10px 20px rgba(99, 102, 241, 0.1);
}

.review-header {
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.25rem 0;
}

.reviewer-role {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.review-content {
  margin-bottom: 1rem;
}

.review-text {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.review-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.review-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.review-actions {
  display: flex;
  gap: 0.5rem;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.like-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  color: white;
  transform: scale(1.05);
}

.like-icon {
  font-size: 0.9rem;
}

.like-count {
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .reviews-section {
    padding: 4rem 0;
  }

  .reviews-container {
    padding: 0 1rem;
  }

  .reviews-title {
    font-size: 2rem;
  }

  .reviews-masonry {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .review-card {
    padding: 1.25rem;
  }

  .reviewer-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .reviewer-name {
    font-size: 1rem;
  }

  .reviewer-role {
    font-size: 0.8rem;
  }

  .review-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .reviews-section {
    padding: 3rem 0;
  }

  .reviews-title {
    font-size: 1.5rem;
  }

  .reviews-subtitle {
    font-size: 1rem;
  }

  .review-card {
    padding: 1rem;
  }

  .reviewer-info {
    gap: 0.75rem;
  }

  .reviewer-avatar {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .reviewer-name {
    font-size: 0.9rem;
  }

  .reviewer-role {
    font-size: 0.75rem;
  }

  .review-text {
    font-size: 0.85rem;
  }

  .review-date {
    font-size: 0.75rem;
  }

  .like-btn {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
