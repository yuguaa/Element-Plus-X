<script setup lang="ts">
import type { MdComponent } from '../types';
import type { MermaidToolbarConfig } from './types';

import { throttle } from 'radash';
import { computed, nextTick, onMounted, ref, toValue, watch } from 'vue';
import { useMermaidZoom } from '../../hooks';
import { useMarkdownContext } from '../MarkdownProvider';
import {
  copyToClipboard,
  downloadSvgAsPng,
  useMermaidRenderer
} from './composables';
import MermaidToolbar from './MermaidToolbar.vue';

interface MermaidProps extends MdComponent {
  toolbarConfig?: MermaidToolbarConfig;
}

const props = withDefaults(defineProps<MermaidProps>(), {
  // codeKey: '',
  // lang: '',
  // content: '',
  // codeData: () => ({}),
  // mermaidConfig: () => ({
  //   delay: 500,
  //   securityLevel: 'loose',
  // }),
  raw: () => ({}),
  toolbarConfig: () => ({})
});

// 获取插槽上下文
const context = useMarkdownContext();
const { codeXSlot } = toValue(context);

// 计算工具栏配置，合并默认值
const toolbarConfig = computed(() => {
  return {
    showToolbar: true,
    showFullscreen: true,
    showZoomIn: true,
    showZoomOut: true,
    showReset: true,
    ...props.toolbarConfig
  };
});
const containerRef = ref<HTMLElement | null>(null);
const showSourceCode = ref(false);
const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

// 使用渲染器composable
const { svg, isRendering, renderMermaid, resetRenderer } =
  useMermaidRenderer(id);

// 初始化缩放功能
const zoomControls = useMermaidZoom({
  container: containerRef,
  scaleStep: 0.2,
  minScale: 0.1,
  maxScale: 5
});

// 渲染包装函数
async function handleRender() {
  const success = await renderMermaid(props.raw.content);
  if (success) {
    await nextTick();
    if (containerRef.value && !showSourceCode.value) {
      zoomControls.initialize();
    }
  }
}

// 节流渲染
const scheduleRender = throttle({ interval: 150 }, handleRender);

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
}

async function handleCopyCode() {
  await copyToClipboard(props.raw.content || '');
}

function handleDownload() {
  downloadSvgAsPng(svg.value);
}
// 处理图表内容过渡完成事件
function onContentTransitionEnter() {
  // 只在图表模式下初始化缩放功能
  if (!showSourceCode.value && svg.value && !isRendering.value) {
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
  newContent => {
    if (newContent) {
      scheduleRender();
    } else {
      resetRenderer();
    }
  }
);

// 创建暴露给插槽的方法对象
const exposedMethods = computed(() => {
  return {
    // 基础属性
    showSourceCode: showSourceCode.value,
    svg: svg.value,
    rawContent: props.raw.content || '',
    toolbarConfig: toolbarConfig.value,

    // 缩放控制方法
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    reset: handleReset,
    fullscreen: handleFullscreen,

    // 其他操作方法
    toggleCode: handleToggleCode,
    copyCode: handleCopyCode,
    download: handleDownload,

    // 原始 props
    raw: props.raw
  };
});

onMounted(() => {
  if (props.raw.content) {
    handleRender();
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
    <!-- 工具栏 -->
    <Transition name="toolbar" appear>
      <div class="toolbar-container">
        <!-- 自定义完整头部插槽 -->
        <component
          :is="codeXSlot.codeMermaidHeader"
          v-if="codeXSlot?.codeMermaidHeader"
          v-bind="exposedMethods"
        />
        <!-- 默认工具栏 + 自定义操作插槽 -->
        <template v-else>
          <!-- 自定义操作按钮插槽 -->
          <component
            :is="codeXSlot.codeMermaidHeaderControl"
            v-if="codeXSlot?.codeMermaidHeaderControl"
            v-bind="exposedMethods"
          />
          <!-- 默认工具栏 -->
          <MermaidToolbar
            v-else
            :toolbar-config="toolbarConfig"
            :is-source-code-mode="showSourceCode"
            :source-code="props.raw.content"
            @on-zoom-in="handleZoomIn"
            @on-zoom-out="handleZoomOut"
            @on-reset="handleReset"
            @on-fullscreen="handleFullscreen"
            @on-toggle-code="handleToggleCode"
            @on-copy-code="handleCopyCode"
            @on-download="handleDownload"
          />
        </template>
      </div>
    </Transition>
    <!-- Mermaid SVG 内容或源码 -->
    <Transition
      name="content"
      mode="out-in"
      @after-enter="onContentTransitionEnter"
    >
      <!-- 代码视图 -->
      <pre v-if="showSourceCode" key="source" class="mermaid-source-code">
        {{ props.raw.content }}
      </pre>
      <!-- 图表视图 -->
      <div
        v-else
        key="chart"
        class="mermaid-content"
        :class="{ rendering: isRendering }"
        v-html="svg"
      />
    </Transition>
  </div>
</template>

<style src="./style.scss"></style>
