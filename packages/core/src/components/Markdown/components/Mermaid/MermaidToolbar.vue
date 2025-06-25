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

function handleZoomIn() {
  emit('onZoomIn');
}

function handleZoomOut() {
  emit('onZoomOut');
}

function handleReset() {
  emit('onReset');
}

function handleFullscreen() {
  emit('onFullscreen');
}

function handleToggleCode() {
  emit('onToggleCode');
}
</script>

<template>
  <div
    v-if="config.showToolbar"
    class="mermaid-toolbar"
    :class="config.toolbarClass"
    :style="config.toolbarStyle"
  >
    <el-icon
      v-if="config.showFullscreen"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleFullscreen()"
    >
      <FullScreen />
    </el-icon>

    <el-icon
      v-if="config.showZoomIn"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleZoomIn()"
    >
      <ZoomIn />
    </el-icon>

    <el-icon
      v-if="config.showZoomOut"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleZoomOut()"
    >
      <ZoomOut />
    </el-icon>

    <el-icon
      v-if="config.showReset"
      class="toolbar-icon"
      :size="20"
      :class="{ disabled: props.isSourceCodeMode }"
      @click="props.isSourceCodeMode ? undefined : handleReset()"
    >
      <Refresh />
    </el-icon>

    <el-icon
      v-if="config.showCode"
      class="toolbar-icon"
      :size="20"
      @click="handleToggleCode"
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
  z-index: 10;

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
