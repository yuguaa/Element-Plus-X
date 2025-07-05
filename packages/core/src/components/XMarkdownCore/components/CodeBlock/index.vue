<script lang="ts" setup>
import type { BundledLanguage } from 'shiki';
import type { RawProps } from './types';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers';
import { codeToHtml } from 'shiki';
import { computed, h, ref, toValue, watch } from 'vue';
import { SHIKI_SUPPORT_LANGS, shikiThemeDefault } from '../../shared';
import { useMarkdownContext } from '../MarkdownProvider';
import {
  controlEle,
  copyCode,
  expand,
  isDark,
  languageEle,
  toggleExpand,
  toggleTheme
} from './shiki-header';
import '../../../../assets/style/shiki.scss';

const props = withDefaults(
  defineProps<{
    raw?: RawProps;
  }>(),
  {
    raw: () => ({})
  }
);

const context = useMarkdownContext();
const { codeXSlot, customAttrs } = toValue(context) || {};
const renderLines = ref<string[]>([]);
const firstRender = ref(true);
const preStyle = ref<any | null>(null);
const preClass = ref<string | null>(null);
const themes = computed(() => context?.value?.themes ?? shikiThemeDefault);
const codeAttrs =
  typeof customAttrs?.code === 'function'
    ? customAttrs.code(props.raw)
    : customAttrs?.code || {};
const shikiTransformers = [
  transformerNotationDiff(),
  transformerNotationErrorLevel(),
  transformerNotationFocus(),
  transformerNotationHighlight(),
  transformerNotationWordHighlight()
];

// 生成高亮HTML
async function generateHtml() {
  let { language = 'text', content = '' } = props.raw || {};
  if (!(SHIKI_SUPPORT_LANGS as readonly string[]).includes(language)) {
    language = 'text';
  }
  const html = await codeToHtml(content, {
    lang: language as BundledLanguage,
    themes: themes.value,
    transformers: shikiTransformers
  });
  const parse = new DOMParser();
  const doc = parse.parseFromString(html, 'text/html');
  const preElement = doc.querySelector('pre');
  preStyle.value = preElement?.getAttribute('style');
  const preClassNames = preElement?.className;
  preClass.value = preClassNames ?? '';
  const codeElement = doc.querySelector('pre code');
  if (codeElement) {
    const lines = codeElement.querySelectorAll('.line'); // 获取所有代码行
    renderLines.value = Array.from(lines).map(line => line.outerHTML); // 存储每行HTML
  }
}

watch(
  () => props.raw?.content,
  async content => {
    if (content) {
      await generateHtml();
    }
  },
  { immediate: true }
);

function handleUpdated(vnode: any) {
  if (renderLines.value.length > 0) {
    const ele = vnode.el as HTMLElement;
    if (ele && firstRender.value) {
      firstRender.value = false;
      setTimeout(() => {
        expand(ele);
      }, 100);
    }
  }
}

// 渲染插槽函数
function renderSlot(slotName: string) {
  if (!codeXSlot) {
    return 'div';
  }
  const slotFn = codeXSlot[slotName];
  if (typeof slotFn === 'function') {
    return slotFn({
      ...props,
      renderLines: renderLines.value,
      isDark,
      toggleExpand,
      toggleTheme,
      copyCode
    });
  }

  return h(slotFn as any, {
    ...props,
    renderLines: renderLines.value,
    isDark,
    toggleExpand,
    toggleTheme,
    copyCode
  });
}

// 计算属性
const computedClass = computed(() => `pre-md ${preClass.value}`);
const codeClass = computed(() => `language-${props.raw?.language || 'text'}`);
</script>

<template>
  <div
    :key="props.raw?.key"
    :class="computedClass"
    :style="preStyle"
    @vue:updated="handleUpdated"
  >
    <div class="markdown-language-header-div el-card is-always-shadow">
      <component
        :is="renderSlot('codeHeader')"
        v-if="codeXSlot?.codeHeader && renderSlot('codeHeader')"
      />
      <template v-else>
        <component
          :is="
            codeXSlot?.codeHeaderLanguage
              ? renderSlot('codeHeaderLanguage')
              : languageEle(props.raw?.language ?? 'text')
          "
        />
        <component
          :is="
            codeXSlot?.codeHeaderControl
              ? renderSlot('codeHeaderControl')
              : controlEle(() => {
                  copyCode(renderLines);
                })
          "
        />
      </template>
    </div>

    <code
      :class="codeClass"
      :style="{
        display: 'flex',
        flexDirection: 'column'
      }"
      v-bind="codeAttrs"
    >
      <span v-for="(line, index) in renderLines" :key="index" v-html="line" />
    </code>
  </div>
</template>
