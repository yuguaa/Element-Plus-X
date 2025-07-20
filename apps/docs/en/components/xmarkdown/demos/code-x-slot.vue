<docs>
---
title: codeXSlot Custom Code Block Top Slot Rendering
---

Use the `codeXSlot` property to customize the rendering of the code block top slot. This property accepts an object, where the key is a fixed property of type CodeBlockHeaderExpose, and the value is a function. The function parameter is the code block property, and the return value is a VNode, which means you can use Vue's template syntax to render the top of the code block.

You can get props in your custom template, and the props have the following properties (you can print and check in the project):
- `isExpand`: props.isExpand Whether to expand the code block.
- `toggleExpand`: props.toggleExpand Expand the code block.
- `isDark`: props.isDark.value Get the current code block theme.
- `toggleTheme`: props.toggleTheme Switch code block theme.
- `renderLines`: props.renderLines Get the content of this code block, you can use it to pass to the copy function.
- `copyCode`: props.copyCode(props.renderLines) Copy code block (need to pass parameter).
- `viewCode`: props.viewCode(props.renderLines) Trigger the built-in preview HTML code block modal (need to pass parameter).
- `value`: props.value Get the type of this code block, which is 'code' | 'preview'.
- `changeSelectValue`: props.changeSelectValue('code' | 'preview') Switch code block type (need to pass parameter).
- `content`: props.content Get the content of this code block.
- `close`: props.close() Close the built-in preview HTML modal (no parameter needed).

The following are the built-in properties that can be obtained in the custom component props for the mermaid code block top:
- `zoomIn`: props.zoomIn Zoom in.
- `zoomOut`: props.zoomOut Zoom out.
- `reset`: props.reset Reset to initial position.
- `toggleCode`: props.toggleCode Switch to show code.
- `download`: props.download Download image.
- `fullscreen`: props.fullscreen Enter fullscreen.
- `copyCode`: props.copyCode Copy code.

```ts
// The type definition for this property
interface CodeBlockHeaderExpose {
  // Custom render the entire code block header
  codeHeader?: CodeBlockHeaderRenderer;
  // Custom render the left language identifier of the code block
  codeHeaderLanguage?: CodeBlockHeaderRenderer;
  // Custom render the right control button of the code block
  codeHeaderControl?: CodeBlockHeaderRenderer;
  // Custom render the title area of the right preview modal of the code block
  viewCodeHeader?: CodeBlockHeaderRenderer;
  // Custom render the content area of the right preview modal of the code block
  viewCodeContent?: CodeBlockHeaderRenderer;
  // Custom render the close button of the right preview modal of the code block
  viewCodeCloseBtn?: CodeBlockHeaderRenderer;
  // Custom render the mermaid top slot
  codeMermaidHeaderControl?: CodeBlockHeaderRenderer;
}
```
</docs>

<script setup lang="ts">
// 这个 ts 类型还未成功导出，还有 props 类型目前暂时使用 any，需要后续优化
// import type { CodeBlockHeaderExpose, CodeBlockExpose } from 'vue-element-plus-x/types/components/XMarkdownCore/components/CodeBlock/shiki-header.d.ts';
import { h } from 'vue';

const markdown = `
\`\`\`javascript
const a = 1;
\`\`\`
`;

const mermaidMarkdown = `
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

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfCodeXSlot1 = {
  // 自定义渲染整个代码块的头部 h 函数也可以写成自定义的组件的形式
  // (props: any) => h(SelfComponent, { selfProps: props }),
  codeHeader: (props: any) =>
    h(
      'div',
      {
        onClick: (ev: MouseEvent) => props.toggleExpand(ev)
      },
      { default: () => '这是自定义头部，点击切换折叠状态' }
    ),
  // 自定义渲染代码块的左侧语言标识符
  codeHeaderLanguage: () => h('div', '自定义代码块左侧语言标识符'),
  // 自定义渲染代码块的右侧控制按钮
  codeHeaderControl: () => h('div', '自定义代码块右侧控制按钮')
};

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfCodeXSlot2 = {
  // 自定义渲染代码块的左侧语言标识符
  codeHeaderLanguage: () => h('div', '自定义代码块左侧语言标识符')
};

const selfCodeXSlot3 = {
  // 自定义渲染代码块的右侧控制按钮
  codeHeaderControl: () => h('div', '自定义代码块右侧控制按钮')
};

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfCodeXSlot4 = {
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
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot1" />
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot2" />
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot3" />
    <XMarkdown :markdown="mermaidMarkdown" :code-x-slot="selfCodeXSlot4" />
  </div>
</template>

<style module lang="less"></style>
