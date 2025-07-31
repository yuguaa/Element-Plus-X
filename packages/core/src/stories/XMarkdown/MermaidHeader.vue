<script setup lang="ts">
import { useShiki } from '@hooks/useShiki';
import { ElMessage } from 'element-plus';
// 定义组件接收的 props，这些是从 Mermaid 组件暴露的方法和状态
// const props = defineProps<{
//   // 暴露的方法
//   zoomIn: () => void;
//   zoomOut: () => void;
//   reset: () => void;
//   fullscreen: () => void;
//   toggleCode: () => void;
//   copyCode: () => void;
//   download: () => void;

//   // 暴露的状态
//   showSourceCode: boolean;
//   svg?: string;
//   rawContent?: string;
//   toolbarConfig?: any;
// }>();

const attrs = useAttrs();

console.log('attrs', attrs);

// 得全局注册最好是在app vue中
useShiki();

// 🎯 用户自定义复制逻辑演示
async function handleCustomCopy() {
  try {
    const customContent = `🧩 组件插槽自定义：\n\n${attrs.rawContent}\n\n✨ 使用 Element Plus X 组件`;
    await navigator.clipboard.writeText(customContent);
    ElMessage.success('🎉 组件插槽自定义复制成功！');
  } catch (err) {
    console.error('❌ 自定义复制失败:', err);
  }
}
</script>

<template>
  <div class="mermaid-header">
    <div class="header-left">
      <span class="icon">🧩</span>
      <span class="title">组件插槽</span>
      <span class="mode-badge">
        {{ $attrs.showSourceCode ? '📝 源码' : '📊 图表' }}
      </span>
    </div>

    <div class="header-right">
      <el-tooltip content="放大图表" placement="top">
        <el-button
          class="header-btn zoom-btn"
          size="small"
          type="primary"
          @click="$attrs.zoomIn"
        >
          🔍
        </el-button>
      </el-tooltip>

      <el-tooltip content="缩小图表" placement="top">
        <el-button
          class="header-btn zoom-btn"
          size="small"
          type="primary"
          @click="$attrs.zoomOut"
        >
          🔍-
        </el-button>
      </el-tooltip>

      <el-tooltip content="重置视图" placement="top">
        <el-button
          class="header-btn reset-btn"
          size="small"
          type="warning"
          @click="$attrs.reset"
        >
          🔄
        </el-button>
      </el-tooltip>

      <el-tooltip content="切换视图" placement="top">
        <el-button
          class="header-btn toggle-btn"
          size="small"
          type="info"
          @click="$attrs.toggleCode"
        >
          {{ $attrs.showSourceCode ? '👁️' : '📝' }}
        </el-button>
      </el-tooltip>

      <el-tooltip content="自定义复制逻辑" placement="top">
        <el-button
          class="header-btn copy-btn"
          size="small"
          type="success"
          @click="handleCustomCopy"
        >
          📋
        </el-button>
      </el-tooltip>

      <el-tooltip content="下载图片" placement="top">
        <el-button
          class="header-btn download-btn"
          size="small"
          type="success"
          @click="$attrs.download"
        >
          💾
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
.mermaid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.title {
  font-weight: 600;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.mode-badge {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.25);
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.header-right {
  display: flex;
}

.header-btn {
  --el-button-bg-color: rgba(255, 255, 255, 0.2);
  --el-button-border-color: rgba(255, 255, 255, 0.3);
  --el-button-text-color: white;
  font-size: 11px;
  font-weight: 500;
  min-height: 24px;
  padding: 4px 8px;
}

.header-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.header-btn:active {
  transform: translateY(0);
}

/* 自定义不同类型按钮的悬停效果 */
.zoom-btn:hover {
  --el-button-hover-bg-color: rgba(59, 130, 246, 0.8);
  --el-button-hover-border-color: rgba(59, 130, 246, 0.8);
}

.reset-btn:hover {
  --el-button-hover-bg-color: rgba(168, 85, 247, 0.8);
  --el-button-hover-border-color: rgba(168, 85, 247, 0.8);
}

.toggle-btn:hover {
  --el-button-hover-bg-color: rgba(245, 158, 11, 0.8);
  --el-button-hover-border-color: rgba(245, 158, 11, 0.8);
}

.copy-btn:hover {
  --el-button-hover-bg-color: rgba(99, 102, 241, 0.8);
  --el-button-hover-border-color: rgba(99, 102, 241, 0.8);
}

.download-btn:hover {
  --el-button-hover-bg-color: rgba(5, 150, 105, 0.8);
  --el-button-hover-border-color: rgba(5, 150, 105, 0.8);
}
</style>
