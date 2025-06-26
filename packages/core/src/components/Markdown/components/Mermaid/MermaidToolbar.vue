<script setup lang="ts">
import type { MermaidToolbarConfig, MermaidToolbarEmits } from './types';
import {
  Document,
  FullScreen,
  Refresh,
  ZoomIn,
  ZoomOut
} from '@element-plus/icons-vue';
import { computed } from 'vue';

interface MermaidToolbarInternalProps {
  toolbarConfig?: MermaidToolbarConfig;
  isSourceCodeMode?: boolean;
}

const props = withDefaults(defineProps<MermaidToolbarInternalProps>(), {
  toolbarConfig: () => ({}),
  isSourceCodeMode: false
});

const emit = defineEmits<MermaidToolbarEmits>();

// 合并默认配置
const config = computed(() => {
  return {
    showToolbar: true,
    showFullscreen: true,
    showZoomIn: true,
    showZoomOut: true,
    showReset: true,
    showCode: true,
    toolbarStyle: {},
    toolbarClass: '',
    ...props.toolbarConfig
  };
});

function handleZoomIn(event: Event) {
  event.stopPropagation();
  event.preventDefault();
  emit('onZoomIn');
}

function handleZoomOut(event: Event) {
  event.stopPropagation();
  event.preventDefault();
  emit('onZoomOut');
}

function handleReset(event: Event) {
  event.stopPropagation();
  event.preventDefault();
  emit('onReset');
}

function handleFullscreen(event: Event) {
  event.stopPropagation();
  event.preventDefault();
  emit('onFullscreen');
}

function handleToggleCode(event: Event) {
  event.stopPropagation();
  event.preventDefault();
  emit('onToggleCode');
}

function handleToolbarClick(event: Event) {
  event.stopPropagation();
  event.preventDefault();
}
</script>

<template>
  <div
    v-if="config.showToolbar"
    class="mermaid-toolbar"
    :class="config.toolbarClass"
    :style="config.toolbarStyle"
    @click="handleToolbarClick"
  >
    <el-icon
      v-if="config.showFullscreen"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleFullscreen($event)"
    >
      <FullScreen />
    </el-icon>

    <el-icon
      v-if="config.showZoomIn"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleZoomIn($event)"
    >
      <ZoomIn />
    </el-icon>

    <el-icon
      v-if="config.showZoomOut"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleZoomOut($event)"
    >
      <ZoomOut />
    </el-icon>

    <el-icon
      v-if="config.showReset"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleReset($event)"
    >
      <Refresh />
    </el-icon>

    <el-icon
      v-if="config.showCode"
      class="toolbar-icon"
      :size="20"
      @click="handleToggleCode($event)"
    >
      <Document />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.mermaid-toolbar {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  padding: 8px 16px;
  background: rgb(242 243 247);
  border-radius: 12px;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  z-index: 1000;
  pointer-events: auto;
  user-select: none !important;

  .toolbar-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #020817;
    pointer-events: auto;
    user-select: none !important;

    &:hover:not(.disabled) {
      background: rgb(230 230 234);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    &:active:not(.disabled) {
      transform: translateY(0) scale(1);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
  }
}

/* 父容器悬停时显示工具栏 */
:global(.markdown-mermaid:hover .mermaid-toolbar) {
  opacity: 1;
  visibility: visible;
}

/* 全屏状态下的样式调整 */
:global(.markdown-mermaid:fullscreen .mermaid-toolbar) {
  background: rgba(0, 0, 0, 0.7);

  .toolbar-icon {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: white;

    &:hover:not(.disabled) {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      color: white;
    }
  }
}
</style>
