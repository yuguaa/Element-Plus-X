<docs>
---
title: codeXSlot Custom Code Block Top Slot Rendering
---

Use the `codeXSlot` property to customize code block top slot rendering. This property accepts an object where the key is a fixed property of the CodeBlockHeaderExpose type, and the value is a function. The function parameter is the code block properties, and the return value is a VNode, meaning you can use Vue's template syntax to render the top of code blocks.

You can get props in your custom template, and props has the following properties (specific properties can be printed and viewed in the project):
- `isExpand`: props.isExpand whether the code block is expanded.
- `toggleExpand`: props.toggleExpand expand code block.
- `isDark`: props.isDark.value get current code block theme.
- `toggleTheme`: props.toggleTheme switch code block theme.
- `renderLines`: props.renderLines get the content of this code block, you can use it to pass to the copy function.
- `copyCode`: props.copyCode(props.renderLines) copy code block (requires parameter).
- `viewCode`: props.viewCode(props.renderLines) trigger built-in preview HTML code block popover (requires parameter).
- `value`: props.value get this code block type is 'Code' | 'Preview'.
- `changeSelectValue`: props.changeSelectValue('Code' | 'Preview') switch code block type (requires parameter).
- `changeSelectValue`: props.changeSelectValue('Code' | 'Preview') switch code block type (requires parameter).
- `content`: props.content get this code block content.
- `close`: props.close() close built-in preview HTML popover (no parameter needed).

The following are built-in properties that can be obtained in the mermaid code block header custom component props:
- `zoomIn`: props.zoomIn zoom in.
- `zoomOut`: props.zoomOut zoom out.
- `reset`: props.reset return to initial position.
- `toggleCode`: props.toggleCode switch display code.
- `download`: props.download download image.
- `fullscreen`: props.fullscreen enter fullscreen.
- `copyCode`: props.copyCode copy code.

```ts
// Type definition for this property
interface CodeBlockHeaderExpose {
  // Custom render the entire code block header
  codeHeader?: CodeBlockHeaderRenderer;
  // Custom render the left language identifier of the code block
  codeHeaderLanguage?: CodeBlockHeaderRenderer;
  // Custom render the right control button of the code block
  codeHeaderControl?: CodeBlockHeaderRenderer;
  // Custom render the title area of the right preview popover of the code block
  viewCodeHeader?: CodeBlockHeaderRenderer;
  // Custom render the content area of the right preview popover of the code block
  viewCodeContent?: CodeBlockHeaderRenderer;
  // Custom render the close button of the right preview popover of the code block
  viewCodeCloseBtn?: CodeBlockHeaderRenderer;
  // Custom render mermaid top slot
  codeMermaidHeaderControl?: CodeBlockHeaderRenderer;
}
```
</docs>

<script setup lang="ts">
// This ts type has not been successfully exported yet, and the props type currently uses any temporarily, needs optimization later
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
    "Media and Culture Related" : 35
    "Advertising and Marketing" : 8
    "Game Development" : 15
    "Film Animation and Effects" : 12
    "Internet Product Design" : 10
    "VR/AR Development" : 5
    "Others" : 15
\`\`\`
`;

// If you use the codeHeader property, the other two properties become invalid
const selfCodeXSlot1 = {
  // Custom render the entire code block header, h function can also be written as a custom component form
  // (props: any) => h(SelfComponent, { selfProps: props }),
  codeHeader: (props: any) =>
    h(
      'div',
      {
        onClick: (ev: MouseEvent) => props.toggleExpand(ev)
      },
      { default: () => 'This is custom header, click to toggle collapse state' }
    ),
  // Custom render the left language identifier of the code block
  codeHeaderLanguage: () =>
    h('div', 'Custom code block left language identifier'),
  // Custom render the right control button of the code block
  codeHeaderControl: () => h('div', 'Custom code block right control button')
};

// If you use the codeHeader property, the other two properties become invalid
const selfCodeXSlot2 = {
  // Custom render the left language identifier of the code block
  codeHeaderLanguage: () =>
    h('div', 'Custom code block left language identifier')
};

const selfCodeXSlot3 = {
  // Custom render the right control button of the code block
  codeHeaderControl: () => h('div', 'Custom code block right control button')
};

// If you use the codeHeader property, the other two properties become invalid
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
                        ElMessage.success(
                          '🎉 Component slot custom copy successful!'
                        );
                      }
                      catch (err) {
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
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot1" />
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot2" />
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot3" />
    <XMarkdown :markdown="mermaidMarkdown" :code-x-slot="selfCodeXSlot4" />
  </div>
</template>

<style scoped lang="less"></style>
