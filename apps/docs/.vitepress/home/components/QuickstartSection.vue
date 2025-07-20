<script setup lang="ts">
import { ref } from 'vue';

const installCommand = ref('npm install element-plus-x');

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand.value);
    // 可以添加复制成功的提示
  } catch (err) {
    console.error('复制失败:', err);
  }
}
</script>

<template>
  <!-- 快速开始区域 -->
  <section class="quickstart-section">
    <div class="quickstart-container">
      <div class="quickstart-content">
        <p class="quickstart-description">
          Element Plus X 是基于 Vue 3
          的现代化组件库，提供丰富的组件和优雅的设计，
          帮助您快速构建美观且功能强大的 Web 应用程序。
        </p>

        <div class="quickstart-actions">
          <div class="install-command">
            <span class="command-prefix">$</span>
            <span class="command-text">{{ installCommand }}</span>
            <button class="command-copy" @click="copyInstallCommand">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 快速开始区域 */
.quickstart-section {
  padding: 4rem 0;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.05) 0%,
    rgba(139, 92, 246, 0.05) 50%,
    rgba(59, 130, 246, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.quickstart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.quickstart-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.quickstart-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.quickstart-actions {
  display: flex;
  justify-content: center;
}

.install-command {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  gap: 1rem;
  min-width: 300px;
}

.install-command:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.command-prefix {
  color: rgba(99, 102, 241, 0.8);
  font-weight: 600;
  margin-right: 0.5rem;
}

.command-text {
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
  text-align: left;
}

.command-copy {
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 6px;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.command-copy:hover {
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.5);
  color: white;
  transform: scale(1.05);
}

.command-copy svg {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .quickstart-section {
    padding: 3rem 0;
  }

  .quickstart-container {
    padding: 0 1rem;
  }

  .quickstart-description {
    font-size: 1rem;
  }

  .install-command {
    min-width: auto;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .quickstart-section {
    padding: 2rem 0;
  }

  .quickstart-content {
    gap: 1.5rem;
  }

  .quickstart-description {
    font-size: 0.9rem;
  }

  .install-command {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  .command-text {
    text-align: center;
  }
}
</style>
