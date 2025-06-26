<script setup lang="ts">
import type { MdComponent } from '../types';
import type { MermaidToolbarConfig } from './types';
import mermaid from 'mermaid';
import { debounce } from 'radash';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useMermaidZoom } from '../../hooks';
import MermaidToolbar from './MermaidToolbar.vue';

interface MermaidProps extends MdComponent {
  toolbarConfig?: MermaidToolbarConfig;
}

const props = withDefaults(defineProps<MermaidProps>(), {
  raw: () => ({}),
  toolbarConfig: () => ({})
});

// 计算工具栏配置，合并默认值
const toolbarConfig = computed(() => {
  return {
    showToolbar: true,
    showFullscreen: true,
    showZoomIn: true,
    showZoomOut: true,
    showReset: true,
    showCode: true,
    ...props.toolbarConfig
  };
});

const svg = ref('');
const containerRef = ref<HTMLElement | null>(null);
const showSourceCode = ref(false);
const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

// 初始化缩放功能（在组件 setup 期间创建，避免 Vue 警告）
const zoomControls = useMermaidZoom({
  container: containerRef,
  scaleStep: 0.2,
  minScale: 0.1,
  maxScale: 5
});

async function renderMermaid() {
  try {
    const valid = await mermaid.parse(props.raw.content);
    if (valid) {
      mermaid.initialize({
        securityLevel: 'loose'
      });
      const { svg: renderedSvg } = await mermaid.render(id, props.raw.content);
      svg.value = renderedSvg;

      // SVG 渲染完成后，手动触发缩放功能初始化
      setTimeout(() => {
        if (containerRef.value) {
          zoomControls.initialize();
        }
      }, 100);
    }
  } catch (err) {
    console.log('Mermaid parse/render error:', err);
  }
}

// 防抖渲染
const scheduleRender = debounce({ delay: 300 }, async () => {
  await renderMermaid();
});

// 工具栏事件处理
function handleZoomIn() {
  if (!showSourceCode.value) {
    zoomControls?.zoomIn();
  }
}

function handleZoomOut() {
  if (!showSourceCode.value) {
    zoomControls?.zoomOut();
  }
}

function handleReset() {
  if (!showSourceCode.value) {
    zoomControls?.reset();
  }
}

function handleFullscreen() {
  if (!showSourceCode.value) {
    zoomControls?.fullscreen();
  }
}

function handleToggleCode() {
  showSourceCode.value = !showSourceCode.value;
  // 移除延时逻辑，依赖过渡完成事件来初始化
}

// 处理图表内容过渡完成事件
function onContentTransitionEnter() {
  // 只在图表模式下初始化缩放功能
  if (!showSourceCode.value) {
    // 使用 nextTick 确保 DOM 完全更新
    nextTick(() => {
      if (containerRef.value) {
        zoomControls.initialize();
      }
    });
  }
}

// 监听内容变化
watch(
  () => props.raw.content,
  () => {
    if (props.raw.content) {
      scheduleRender();
    }
  }
);

onMounted(() => {
  if (props.raw.content) {
    renderMermaid();
  }
});
</script>

<template>
  <div
    ref="containerRef"
    :key="props.raw.key"
    class="markdown-mermaid unselectable"
    unselectable="on"
    onselectstart="return false"
    ondragstart="return false"
  >
    <!-- Mermaid SVG 内容或源码 -->
    <Transition
      name="content"
      mode="out-in"
      @after-enter="onContentTransitionEnter"
    >
      <div
        v-if="!showSourceCode"
        key="chart"
        class="mermaid-content"
        v-html="svg"
      />
      <pre v-else key="source" class="mermaid-source-code">{{
        props.raw.content
      }}</pre>
    </Transition>

    <!-- 工具栏 -->
    <Transition name="toolbar" appear>
      <MermaidToolbar
        :toolbar-config="toolbarConfig"
        :is-source-code-mode="showSourceCode"
        @on-zoom-in="handleZoomIn"
        @on-zoom-out="handleZoomOut"
        @on-reset="handleReset"
        @on-fullscreen="handleFullscreen"
        @on-toggle-code="handleToggleCode"
      />
    </Transition>
  </div>
</template>

<style src="./style.scss"></style>
