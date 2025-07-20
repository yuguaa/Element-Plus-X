<docs>
---
title: mermaidConfig Mermaid Configuration
---

Use the `mermaidConfig` property to customize the mermaid top ToolbarConfig. This property accepts a MermaidToolbarConfig object, which can control the hide/show of top controls, add some class names, and control hover colors.

:::warning
If you set the `codeMermaidHeaderControl` property with `code-x-slot`, it completely takes over the mermaid Toolbar slot, allowing developers to fully customize it. Of course, we still expose the built-in Toolbar methods, so you can retain some built-in methods you need while only modifying styles.
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
    "Media and Culture Related" : 35
    "Advertising and Marketing" : 8
    "Game Development" : 15
    "Film Animation and Effects" : 12
    "Internet Product Design" : 10
    "VR/AR Development" : 5
    "Others" : 15
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
              props.showSourceCode ? '📝 Source' : '📊 Chart'
            )
          ]
        ),

        h('div', { style: { display: 'flex' } }, [
          h(
            ElTooltip,
            {
              content: 'Zoom In',
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
              content: 'Reset Zoom',
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
              content: props.showSourceCode ? 'View Chart' : 'View Source',
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
              content: 'Custom Copy',
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
                    // 🎯 User custom copy logic demonstration - complete takeover
                    onClick: async () => {
                      try {
                        const customContent = `🎨 Custom Prefix:\n\n${props.rawContent}\n\n📝 From: Element-Plus-X`;
                        await navigator.clipboard.writeText(customContent);
                        ElMessage.success('🎉 Component slot custom copy successful!');
                      } catch (err) {
                        console.error('❌ Custom copy failed:', err);
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
              content: 'Download Image',
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

<style scoped lang="less"></style>
