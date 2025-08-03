<script lang="ts" setup>
import type { GlobalShiki } from '@components/XMarkdownCore/hooks/useShiki';
import type { Element, Root } from 'hast';
import type { BundledLanguage } from 'shiki';
import type { VNode } from 'vue';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers';
import { ElScrollbar } from 'element-plus';
import { computed, h, ref, watch } from 'vue';
import { SHIKI_SUPPORT_LANGS, shikiThemeDefault } from '../../shared';
import { useMarkdownContext } from '../MarkdownProvider';

export interface HighLightCodeProps {
  code: string;
  lang: string;
  enableCodeLineNumber?: boolean;
}

const props = withDefaults(defineProps<HighLightCodeProps>(), {
  enableCodeLineNumber: false
});

const context = useMarkdownContext();
const { globalShiki } = context?.value || {};
const themes = computed(() => context?.value?.themes ?? shikiThemeDefault);
const colorReplacements = computed(() => context?.value?.colorReplacements);

const vNodes = ref<VNode>();
const codeLines = ref<string[]>([]);

const shikiTransformers = [
  transformerNotationDiff(),
  transformerNotationErrorLevel(),
  transformerNotationFocus(),
  transformerNotationHighlight(),
  transformerNotationWordHighlight()
];

// 将 Shiki 的 hast 转换为 Vue VNode
function renderCodeLine(hast: any): VNode {
  if (hast.type !== 'root') {
    if (hast.tagName === 'pre') {
      return h(
        'div',
        hast.properties,
        hast.children.map((node: any) => renderCodeLine(node))
      );
    } else {
      if (hast.children && hast.children.length > 0) {
        return h(
          'span',
          hast.properties,
          hast.children.map((node: any) => renderCodeLine(node))
        );
      }
      return h(
        'span',
        {
          ...hast.properties,
          class: {
            ...hast.properties?.class,
            'elx-code-animate': true
          }
        },
        hast.value
      );
    }
  } else {
    return renderCodeLine(hast.children[0] as Element);
  }
}

// 生成高亮HTML
async function generateHighlight() {
  if (!globalShiki || !props.code) return;

  let language = props.lang || 'text';
  if (!(SHIKI_SUPPORT_LANGS as readonly string[]).includes(language)) {
    language = 'text';
  }

  const { codeToHast } = globalShiki as GlobalShiki;
  const hast = await codeToHast(props.code.trim(), {
    lang: language as BundledLanguage,
    themes: themes.value,
    colorReplacements: colorReplacements.value,
    transformers: shikiTransformers
  });

  vNodes.value = renderCodeLine(hast as Root);

  // 为行号功能分割代码行
  codeLines.value = props.code.trim().split('\n');
}

const codeClass = computed(() => `language-${props.lang || 'text'}`);

// 监听代码变化，重新生成高亮
watch(
  () => [props.code, props.lang],
  async () => {
    await generateHighlight();
  },
  { immediate: true }
);
</script>

<template>
  <div class="elx-highlight-code-wrapper">
    <div v-if="props.enableCodeLineNumber" class="line-numbers">
      <span
        v-for="(_line, index) in codeLines"
        :key="index"
        class="line-number"
      >
        {{ index + 1 }}
      </span>
    </div>
    <ElScrollbar class="elx-highlight-code-scrollbar">
      <div :class="codeClass" class="elx-highlight-code-content">
        <component :is="vNodes" v-if="vNodes" />
        <pre v-else><code>{{ code }}</code></pre>
      </div>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>
