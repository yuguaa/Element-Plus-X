<script setup lang="ts">
import type { MdComponent } from '../types';
import type { MermaidToolbarConfig } from './types';
import { Warning } from '@element-plus/icons-vue';
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
const renderError = ref(false);
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
    // 重置错误状态
    renderError.value = false;

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
    } else {
      // 解析失败但没有抛出错误
      renderError.value = true;
    }
  } catch (error) {
    console.error('error:', error);
    // 设置渲染错误状态
    renderError.value = true;
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
}

function handleCopyCode() {
  console.log('handleCopyCode');
}

function handleDownload() {
  if (!svg.value || renderError.value) {
    console.warn('无法下载：SVG内容为空或渲染出错');
    return;
  }

  try {
    // 创建SVG Blob
    const svgBlob = new Blob([svg.value], {
      type: 'image/svg+xml;charset=utf-8'
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    // 创建图片元素
    const img = new Image();
    img.onload = () => {
      // 创建Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('无法获取Canvas上下文');
        URL.revokeObjectURL(svgUrl);
        return;
      }

      // 设置Canvas尺寸（增加分辨率以提高图片质量）
      const scale = 2; // 提高分辨率
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // 设置高质量渲染
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 填充白色背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制SVG到Canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 转换为PNG Blob
      canvas.toBlob(
        blob => {
          if (!blob) {
            console.error('Canvas转换为Blob失败');
            return;
          }

          // 创建下载链接
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;

          // 生成文件名
          const timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/:/g, '-');
          link.download = `mermaid-diagram-${timestamp}.png`;

          // 触发下载
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // 清理URL
          URL.revokeObjectURL(url);
        },
        'image/png',
        0.95
      ); // 高质量PNG

      // 清理SVG URL
      URL.revokeObjectURL(svgUrl);
    };

    img.onerror = () => {
      console.error('SVG图片加载失败');
      URL.revokeObjectURL(svgUrl);
    };

    // 加载SVG
    img.src = svgUrl;
  } catch (error) {
    console.error('下载过程中发生错误:', error);
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
  () => {
    if (props.raw.content) {
      // 内容变化时重置错误状态
      renderError.value = false;
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
    <!-- 工具栏 -->
    <Transition name="toolbar" appear>
      <MermaidToolbar
        :toolbar-config="toolbarConfig"
        :is-source-code-mode="showSourceCode"
        :source-code="props.raw.content"
        :render-error="renderError"
        @on-zoom-in="handleZoomIn"
        @on-zoom-out="handleZoomOut"
        @on-reset="handleReset"
        @on-fullscreen="handleFullscreen"
        @on-toggle-code="handleToggleCode"
        @on-copy-code="handleCopyCode"
        @on-download="handleDownload"
      />
    </Transition>
    <!-- Mermaid SVG 内容或源码 -->
    <Transition
      name="content"
      mode="out-in"
      @after-enter="onContentTransitionEnter"
    >
      <!-- 代码视图：总是显示代码，不显示错误 -->
      <pre v-if="showSourceCode" key="source" class="mermaid-source-code">{{
        props.raw.content
      }}</pre>
      <!-- 图片视图：有错误时显示错误，无错误时显示图表 -->
      <template v-else>
        <!-- 渲染错误状态 -->
        <div v-if="renderError" key="error" class="mermaid-error-container">
          <el-empty description="出错啦~">
            <template #image>
              <el-icon :size="60" color="var(--el-color-danger)">
                <Warning />
              </el-icon>
            </template>
          </el-empty>
        </div>
        <!-- 正常图表显示 -->
        <div v-else key="chart" class="mermaid-content" v-html="svg" />
      </template>
    </Transition>
  </div>
</template>

<style src="./style.scss"></style>
