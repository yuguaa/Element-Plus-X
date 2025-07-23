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
  <section
    class="quickstart-section py-16 relative backdrop-blur-5 border-t border-b border-white/10"
  >
    <div class="quickstart-container max-w-3xl mx-auto px-8">
      <div class="quickstart-content text-center flex flex-col gap-8">
        <p
          class="quickstart-description text-lg leading-relaxed text-white/80 m-0 max-w-2xl mx-auto"
        >
          Element Plus X 是基于 Vue 3
          的现代化组件库，提供丰富的组件和优雅的设计，
          帮助您快速构建美观且功能强大的 Web 应用程序。
        </p>

        <div class="quickstart-actions flex justify-center">
          <div
            class="install-command flex items-center bg-black/30 border border-white/20 rounded-3 px-6 py-4 font-mono text-sm backdrop-blur-[10px] transition-all duration-300 gap-4 min-w-75"
          >
            <span class="command-prefix text-indigo-400/80 font-semibold mr-2"
              >$</span
            >
            <span class="command-text text-white/90 flex-1 text-left">{{
              installCommand
            }}</span>
            <button
              class="command-copy bg-indigo-500/20 border border-indigo-500/30 rounded-1.5 p-2 text-white/80 cursor-pointer transition-all duration-300 flex-center"
              @click="copyInstallCommand"
            >
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

<style scoped lang="less">
/* 快速开始区域背景 */
.quickstart-section {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.05) 0%,
    rgba(139, 92, 246, 0.05) 50%,
    rgba(59, 130, 246, 0.05) 100%
  );
}

/* 安装命令样式 */
.install-command {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.install-command:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* 复制按钮悬停效果 */
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
    @apply py-12;
  }

  .quickstart-container {
    @apply px-4;
  }

  .quickstart-description {
    @apply text-base;
  }

  .install-command {
    @apply w-full px-4 py-3 text-sm;
  }
}

@media (max-width: 480px) {
  .quickstart-section {
    @apply py-8;
  }

  .quickstart-content {
    @apply gap-6;
  }

  .quickstart-description {
    @apply text-sm;
  }

  .install-command {
    @apply flex-col gap-3 text-center;
  }

  .command-text {
    @apply text-center;
  }
}
</style>
