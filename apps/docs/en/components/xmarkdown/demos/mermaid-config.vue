<docs>
---
title: mermaidConfig Mermaid Configuration
---

Use the `mermaidConfig` property to customize the ToolbarConfig at the top of mermaid. This property accepts a MermaidToolbarConfig object, which can control the display/hide of the top controls, add class names, and control hover colors, etc.

:::warning
If you set the `codeMermaidHeaderControl` property with `code-x-slot`, you will fully take over the mermaid Toolbar slot, and the developer can fully customize it. Of course, we also expose the built-in Toolbar methods, so you can just modify the style and keep some built-in methods you need.
:::

```ts
interface MermaidToolbarConfig {
  showToolbar?: boolean;
  showFullscreen?: boolean;
  showZoomIn?: boolean;
  showZoomOut?: boolean;
  showReset?: boolean;
  showDownload?: boolean;
  toolbarStyle?: Record<string, any>;
  toolbarClass?: string;
  iconColor?: string;
  tabTextColor?: string;
  hoverBackgroundColor?: string;
  tabActiveBackgroundColor?: string;
}
```
</docs>

<script setup lang="ts">
import { ElButton, ElMessage, ElTooltip } from 'element-plus';
import { h } from 'vue';

const markdown = `
\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`
`;

const selfCodeXSlot = {
  codeMermaidHeaderControl: (props: any) => {
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

const selfMermaidConfig = {
  showToolbar: true,
  showFullscreen: false,
  showZoomIn: true,
  showZoomOut: true,
  showReset: true,
  showDownload: false,
  toolbarStyle: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
    borderRadius: '8px'
  },
  iconColor: '#FFFFFF',
  tabTextColor: '#FFFFFF'
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown
      :markdown="markdown"
      :code-x-slot="selfCodeXSlot"
      :mermaid-config="selfMermaidConfig"
    />

    <XMarkdown :markdown="markdown" :mermaid-config="selfMermaidConfig" />
  </div>
</template>

<style module lang="less"></style>
