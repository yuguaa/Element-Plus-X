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
  <section class="support-section">
    <div class="support-container">
      <!-- 紧凑的标题区域 -->
      <div class="support-header">
        <h2 class="support-title">感谢支持</h2>
        <p class="support-subtitle">他们的支持让开源项目持续发展</p>
      </div>

      <!-- 玻璃拟态赞助商卡片 -->
      <div class="sponsors-glass-card">
        <!-- 赞助商列表 - 水平布局 -->
        <div class="sponsors-list">
          <div
            v-for="sponsor in sponsors.slice(0, 6)"
            :key="sponsor.company"
            class="sponsor-compact"
          >
            <div class="sponsor-avatar">
              {{ sponsor.logo }}
            </div>
            <div class="sponsor-name">
              {{ sponsor.company }}
            </div>
          </div>
        </div>

        <!-- 更多赞助商指示器 -->
        <div class="more-sponsors">
          <span class="more-text">+{{ sponsors.length - 6 }} 更多赞助商</span>
        </div>
      </div>

      <!-- 紧凑的CTA区域 -->
      <div class="sponsor-cta-compact">
        <div class="cta-content">
          <div class="cta-left">
            <div class="cta-icon">🤝</div>
            <div class="cta-text">
              <h3 class="cta-title">成为赞助商</h3>
              <p class="cta-desc">支持开源项目，获得品牌曝光</p>
            </div>
          </div>
          <button class="sponsor-btn-compact">
            <span class="btn-text">立即赞助</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 赞助与支持区域 */
.support-section {
  padding: 3rem 0;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(59, 130, 246, 0.08) 50%,
    rgba(99, 102, 241, 0.08) 100%
  );
}

.support-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.support-header {
  text-align: center;
}

.support-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.support-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.sponsors-glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sponsors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.sponsor-compact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sponsor-compact:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

.sponsor-avatar {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.sponsor-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.more-sponsors {
  text-align: center;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.more-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.sponsor-cta-compact {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.cta-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cta-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cta-text {
  flex: 1;
}

.cta-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: white;
}

.cta-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.sponsor-btn-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.sponsor-btn-compact:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.sponsor-btn-compact:hover .btn-arrow {
  transform: translateX(3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .support-section {
    padding: 2rem 0;
  }

  .support-container {
    padding: 0 1rem;
  }

  .support-title {
    font-size: 1.5rem;
  }

  .sponsors-glass-card {
    padding: 1.5rem;
  }

  .sponsors-list {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .cta-left {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .sponsors-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .sponsor-compact {
    padding: 0.75rem;
  }

  .sponsor-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .sponsor-name {
    font-size: 0.8rem;
  }

  .cta-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .cta-title {
    font-size: 1.1rem;
  }

  .cta-desc {
    font-size: 0.8rem;
  }
}
</style>
