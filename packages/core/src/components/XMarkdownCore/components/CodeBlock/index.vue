<script lang="ts" setup>
import type { BundledLanguage } from 'shiki';
import type { ElxRunCodeProps } from '../RunCode/type';
import type { CodeBlockExpose } from './shiki-header';
import type { RawProps } from './types';
import { computed, h, reactive, ref, toValue, watch } from 'vue';
import HighLightCode from '../../components/HighLightCode/index.vue';
import { SHIKI_SUPPORT_LANGS } from '../../shared';
import { useMarkdownContext } from '../MarkdownProvider';
import RunCode from '../RunCode/index.vue';
import {
  controlEle,
  controlHasRunCodeEle,
  copyCode,
  isDark,
  languageEle,
  toggleExpand,
  toggleTheme
} from './shiki-header';
import '../../style/shiki.scss';

const props = withDefaults(
  defineProps<{
    raw?: RawProps;
  }>(),
  {
    raw: () => ({})
  }
);

const context = useMarkdownContext();
const {
  codeXSlot,
  customAttrs,
  enableCodeLineNumber = false
} = toValue(context) || {};
const preStyle = ref<any | null>(null);
const preClass = ref<string | null>(null);
const nowViewBtnShow = computed(() => context?.value?.needViewCodeBtn ?? false);
const viewCodeModalOptions = computed(
  () => context?.value?.viewCodeModalOptions
);
const isExpand = ref(true);
const nowCodeLanguage = ref<BundledLanguage>();
const codeAttrs =
  typeof customAttrs?.code === 'function'
    ? customAttrs.code(props.raw)
    : customAttrs?.code || {};

const runCodeOptions = reactive<ElxRunCodeProps>({
  code: [],
  content: '',
  visible: false,
  lang: '',
  preClass: '',
  preStyle: {}
});

// 设置当前代码语言
watch(
  () => props.raw?.language,
  language => {
    let lang = language || 'text';
    if (!(SHIKI_SUPPORT_LANGS as readonly string[]).includes(lang)) {
      lang = 'text';
    }
    nowCodeLanguage.value = lang as BundledLanguage;
  },
  { immediate: true }
);
function viewCode() {
  const content = props.raw?.content ?? '';
  if (!content) return;

  Object.assign(runCodeOptions, {
    code: [], // 这里可能需要根据具体需求调整
    content,
    lang: nowCodeLanguage.value || 'html',
    preClass: preClass.value || 'pre-md',
    preStyle: preStyle.value || {},
    visible: true
  });
}

watch(
  () => props.raw?.content,
  val => {
    if (runCodeOptions.visible && val) {
      runCodeOptions.content = val;
    }
  }
);

// 渲染插槽函数
function renderSlot(slotName: string) {
  if (!codeXSlot) {
    return 'div';
  }
  const slotFn = codeXSlot[slotName];
  if (typeof slotFn === 'function') {
    return slotFn({
      ...props,
      renderLines: [], // 保持兼容性，但现在为空数组
      isDark,
      isExpand,
      nowViewBtnShow: nowViewBtnShow.value,
      toggleExpand,
      toggleTheme,
      copyCode,
      viewCode
    } satisfies CodeBlockExpose);
  }

  return h(slotFn as any, {
    ...props,
    renderLines: [], // 保持兼容性，但现在为空数组
    isDark,
    isExpand,
    nowViewBtnShow: nowViewBtnShow.value,
    toggleExpand,
    toggleTheme,
    copyCode,
    viewCode
  } satisfies CodeBlockExpose);
}

function handleHeaderLanguageClick() {
  isExpand.value = !isExpand.value;
}

// 计算属性
const computedClass = computed(() => `pre-md ${preClass.value} is-expanded`);
const codeClass = computed(() => `language-${props.raw?.language || 'text'}`);
const RunCodeComputed = computed(() => {
  return nowCodeLanguage.value === 'html' && nowViewBtnShow.value
    ? RunCode
    : undefined;
});
const codeControllerEleComputed = computed(() => {
  if (nowCodeLanguage.value === 'html' && nowViewBtnShow.value) {
    return controlHasRunCodeEle(
      () => {
        copyCode([]); // 传递空数组保持兼容性
      },
      () => {
        viewCode();
      }
    );
  }
  return controlEle(() => {
    copyCode([]); // 传递空数组保持兼容性
  });
});

watch(
  () => nowViewBtnShow.value,
  v => {
    if (!v) {
      runCodeOptions.visible = false;
    }
  }
);
</script>

<template>
  <div :key="props.raw?.key" :class="computedClass" :style="preStyle">
    <div class="markdown-elxLanguage-header-div is-always-shadow">
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
          @click="handleHeaderLanguageClick"
        />
        <component
          :is="
            codeXSlot?.codeHeaderControl
              ? renderSlot('codeHeaderControl')
              : codeControllerEleComputed
          "
        />
      </template>
    </div>

    <code
      :class="codeClass"
      :style="{
        display: 'block',
        overflowX: 'auto'
      }"
      v-bind="codeAttrs"
    >
      <HighLightCode
        :enable-code-line-number="enableCodeLineNumber"
        :lang="props.raw?.language ?? 'text'"
        :code="props.raw?.content ?? ''"
      />
    </code>
    <!-- run-code -->
    <component
      :is="RunCodeComputed"
      v-bind="{ ...viewCodeModalOptions, ...runCodeOptions }"
      v-model:visible="runCodeOptions.visible"
    />
  </div>
</template>

<style>
.elx-code-animate {
  animation: elx-code-animate 0.3s ease-in-out;
  position: relative;
}
@keyframes elx-code-animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
