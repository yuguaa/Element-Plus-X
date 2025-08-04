<script setup lang="ts">
import type {
  CodeBlockHeaderExpose,
  CodeBlockHeaderFunctionExpose
} from '@components/XMarkdownCore/components/CodeBlock/shiki-header';
import type { MermaidToolbarConfig } from '../../components/XMarkdownCore/components/Mermaid/types';
import XMarkdown from '@components/XMarkdown/index.vue';
import { ElButton, ElMessage, ElTooltip } from 'element-plus';
import { computed, h, onMounted, ref } from 'vue';
import MermaidHeader from './MermaidHeader.vue';

const props = defineProps<{
  markdown: string;
  mermaidConfig?: MermaidToolbarConfig;
  themes?: {
    light: string;
    dark: string;
  };
}>();

const mermaidConfig = computed(() => {
  return props.mermaidConfig;
});

// 函数式插槽配置演示
const slotRenderConfig: CodeBlockHeaderFunctionExpose = {
  codeMermaidHeaderControl: props => {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }
      },
      [
        h(
          'div',
          {
            style: { display: 'flex', alignItems: 'center', gap: '12px' }
          },
          [
            h('span', { style: { fontSize: '16px' } }, '🎨'),
            h('span', { style: { fontWeight: '600' } }, 'Custom Mermaid'),
            h(
              'span',
              {
                style: {
                  fontSize: '12px',
                  background: 'rgba(255,255,255,0.25)',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }
              },
              props.showSourceCode ? '📝 源码' : '📊 图表'
            )
          ]
        ),

        h('div', { style: { display: 'flex' } }, [
          h(
            ElTooltip,
            {
              content: '放大',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.zoomIn
                  },
                  () => '🔍'
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '重置缩放',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.reset
                  },
                  () => '🔄'
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: props.showSourceCode ? '查看图表' : '查看源码',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.toggleCode
                  },
                  () => (props.showSourceCode ? '👁️' : '📝')
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '自定义复制',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    // 🎯 用户自定义复制逻辑演示 - 完全接管
                    onClick: async () => {
                      try {
                        const customContent = `🎨 自定义前缀：\n\n${props.rawContent}\n\n📝 来自：Element-Plus-X`;
                        await navigator.clipboard.writeText(customContent);
                        ElMessage.success('🎉 组件插槽自定义复制成功！');
                      } catch (err) {
                        console.error('❌ 自定义复制失败:', err);
                      }
                    }
                  },
                  () => '📋'
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '下载图片',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.download
                  },
                  () => '💾'
                )
            }
          )
        ])
      ]
    );
  }
};

// 组件插槽配置演示
const slotComponentsConfig: CodeBlockHeaderExpose = {
  codeMermaidHeaderControl: MermaidHeader
};
const timer = ref();
const index = ref(0);
function start() {
  timer.value = setInterval(() => {
    index.value += 5;
    if (index.value > props.markdown.length) {
      clearInterval(timer.value);
      index.value = props.markdown.length;
    }
  }, 100);
}
function pause() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

const mermaidCode = computed(() => {
  return props.markdown.slice(0, index.value);
});
function redo() {
  index.value = 0;
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  start();
}

onMounted(() => {
  start();
});
</script>

<template>
  <ElButton @click="start"> 开始 </ElButton>
  <ElButton @click="pause"> 暂停 </ElButton>
  <ElButton @click="redo"> 重新开始 </ElButton>
  <div class="component-container">
    <div class="demo-section">
      <h4>1. 📋 通过mermaidConfig 配置</h4>
      <XMarkdown
        :markdown="mermaidCode"
        :mermaid-config="mermaidConfig"
        :themes="themes"
      />
    </div>

    <div class="demo-section">
      <h4>2. 🔧 函数式插槽</h4>
      <XMarkdown
        :markdown="mermaidCode"
        :code-x-slot="slotRenderConfig"
        :themes="themes"
      />
    </div>

    <div class="demo-section">
      <h4>3. 🧩 组件插槽</h4>
      <XMarkdown
        :markdown="mermaidCode"
        :code-x-slot="slotComponentsConfig"
        :themes="themes"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;

  .demo-section {
    margin-bottom: 32px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    h3 {
      margin: 0 0 24px 0;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      color: #374151;
    }
    h4 {
      margin: 0;
      padding: 16px 20px;
      background: #f8fafc;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
    }
  }
}
</style>
