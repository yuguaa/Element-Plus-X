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

// 设置当前代码语言
function setCodeLanguage() {
  let { language = 'text' } = props.raw || {};
  // 如果语言不在支持列表中，默认使用 'text'
  if (!(SHIKI_SUPPORT_LANGS as readonly string[]).includes(language)) {
    language = 'text';
  }
  nowCodeLanguage.value = language as BundledLanguage;
}

// 监听原始内容变化，设置代码语言
watch(
  () => props.raw?.content,
  content => {
    if (content) {
      setCodeLanguage();
    }
  },
  { immediate: true }
);

// 运行代码的配置项
const runCodeOptions = reactive<ElxRunCodeProps>({
  content: '', // 只保留原始内容
  visible: false,
  lang: '',
  preClass: 'pre-md', // 使用默认类名
  preStyle: {} // 使用默认空样式
});

// 查看代码函数 - 现在直接使用原始内容
function viewCode() {
  const content = props.raw?.content ?? '';
  if (!content) return;

  // 更新运行代码配置
  Object.assign(runCodeOptions, {
    content,
    lang: nowCodeLanguage.value || 'html',
    preClass: 'pre-md',
    preStyle: {},
    visible: true
  });
}

// 监听内容变化，同步更新 runCodeOptions
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
      renderLines: [], // 保持接口兼容性，传递空数组
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
    renderLines: [], // 保持接口兼容性，传递空数组
    isDark,
    isExpand,
    nowViewBtnShow: nowViewBtnShow.value,
    toggleExpand,
    toggleTheme,
    copyCode,
    viewCode
  } satisfies CodeBlockExpose);
}

// 处理头部语言点击事件
function handleHeaderLanguageClick() {
  isExpand.value = !isExpand.value;
}

// 计算属性
const computedClass = computed(() => `pre-md is-expanded`); // 移除对 preClass 的依赖
const codeClass = computed(() => `language-${props.raw?.language || 'text'}`);
const RunCodeComputed = computed(() => {
  return nowCodeLanguage.value === 'html' && nowViewBtnShow.value
    ? RunCode
    : undefined;
});

// 代码控制器元素计算属性
const codeControllerEleComputed = computed(() => {
  if (nowCodeLanguage.value === 'html' && nowViewBtnShow.value) {
    return controlHasRunCodeEle(
      () => {
        // 复制代码时直接使用原始内容
        copyCode(props.raw?.content ?? '');
      },
      () => {
        // 查看代码
        viewCode();
      }
    );
  }
  return controlEle(() => {
    // 复制代码时直接使用原始内容
    copyCode(props.raw?.content ?? '');
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
  <div :key="props.raw?.key" :class="computedClass">
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
