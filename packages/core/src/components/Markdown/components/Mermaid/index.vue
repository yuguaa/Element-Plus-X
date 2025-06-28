<script setup lang="ts">
import type { MdComponent } from '../types';
import type { MermaidToolbarConfig } from './types';

import mermaid from 'mermaid';
import { throttle } from 'radash';
import { computed, nextTick, onMounted, ref, toValue, watch } from 'vue';
import { useMermaidZoom } from '../../hooks';
import { useMarkdownContext } from '../MarkdownProvider';
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
// const loading = ref(true);
// let debounceTimer: ReturnType<typeof setTimeout> | null = null;
// const id = useId();

const svg = ref('');
const containerRef = ref<HTMLElement | null>(null);
const showSourceCode = ref(false);
const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

// 初始化缩放功能
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
  } catch (error) {
    console.log('Mermaid render error:', error);
  }
}

// // 防抖渲染
// const scheduleRender = debounce({ delay: 300 }, async () => {
//   await renderMermaid();
// });
// 节流渲染
const scheduleRender = throttle({ interval: 300 }, async () => {
  await renderMermaid();
});
// function scheduleRender() {
//   loading.value = true;
//   if (debounceTimer)
//     clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(() => {
//     loading.value = false;
//     renderMermaid();
//   }, 300);
// }

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
  if (!props.raw.content) {
    return;
  }

  try {
    // 使用现代剪贴板 API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(props.raw.content);
    } else {
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = props.raw.content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    console.log('Mermaid code copied successfully');
  } catch (err) {
    console.error('Failed to copy mermaid code: ', err);
  }
}

function handleDownload() {
  if (!svg.value) {
    return;
  }

  try {
    // 创建处理后的SVG数据URL（避免Blob可能的跨域问题）
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.value)}`;
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: false });
        if (!ctx) {
          return;
        }
        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        // 背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // SVG => Canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          canvas.toBlob(
            blob => {
              if (!blob) {
                return;
              }
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              const timestamp = new Date()
                .toISOString()
                .slice(0, 19)
                .replace(/:/g, '-');
              link.download = `mermaid-diagram-${timestamp}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            },
            'image/png',
            0.95
          );
        } catch (toBlobError) {
          console.error('toBlobError:', toBlobError);
          // 如果toBlob失败，尝试使用toDataURL
          try {
            const dataUrl = canvas.toDataURL('image/png', 0.95);
            const link = document.createElement('a');
            link.href = dataUrl;

            const timestamp = new Date()
              .toISOString()
              .slice(0, 19)
              .replace(/:/g, '-');
            link.download = `mermaid-diagram-${timestamp}.png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (dataUrlError) {
            console.error('dataUrlError:', dataUrlError);
          }
        }
      } catch (canvasError) {
        console.error('Canvas操作失败:', canvasError);
      }
    };

    img.onerror = error => {
      console.error('error:', error);
    };
    // 不设置crossOrigin，使用Data URL避免跨域问题
    img.src = svgDataUrl;
  } catch (error) {
    console.error('error:', error);
  }
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
  newContent => {
    if (newContent) {
      scheduleRender();
    } else {
      // 内容为空时清空显示
      svg.value = '';
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

    // 原始 props（除了重复的 toolbarConfig）
    raw: props.raw
  };
});

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
      <div v-else key="chart" class="mermaid-content" v-html="svg" />
    </Transition>
  </div>
</template>

<style src="./style.scss"></style>
