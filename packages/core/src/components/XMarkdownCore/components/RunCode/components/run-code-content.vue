<script lang="ts" setup>
import type { ElxRunCodeProps } from '../type';
import type { ElxRunCodeHeaderTypes } from './run-code-header.vue';
import DOMPurify from 'dompurify';
import { SELECT_OPTIONS_ENUM } from './options';

export interface ElxRunCodeContentProps
  extends Omit<
    ElxRunCodeProps,
    'visible' | 'customClass' | 'dialogOptions' | 'drawerOptions'
  > {
  nowView: ElxRunCodeHeaderTypes['options'];
}

const props = defineProps<ElxRunCodeContentProps>();

const computedClass = computed(() => `pre-md ${props.preClass}`);

const codeClass = computed(() => `language-${props.lang || 'text'}`);

const iframeRef = ref<HTMLIFrameElement>();

const allHtml = computed(() => props.content);

const codeContainerRef = ref<HTMLElement>();

function scrollToBottom() {
  nextTick(() => {
    const el = codeContainerRef.value;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });
}

watch(
  () => props.code,
  () => {
    if (props.nowView === SELECT_OPTIONS_ENUM.CODE) {
      scrollToBottom();
    }
  }
);

function renderIframe() {
  if (!iframeRef.value) return;
  const iframe = iframeRef.value;

  const safeHTML = DOMPurify.sanitize(allHtml.value, { WHOLE_DOCUMENT: true });

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(safeHTML);
  doc.close();
}

watch(
  () => props.nowView,
  v => {
    if (v === SELECT_OPTIONS_ENUM.VIEW) {
      renderIframe();
    }
  },
  { immediate: true }
);
watch(
  () => props.code,
  () => {
    if (props.nowView === SELECT_OPTIONS_ENUM.VIEW) {
      renderIframe();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.nowView === SELECT_OPTIONS_ENUM.VIEW) {
    renderIframe();
  }
});
</script>

<template>
  <el-scrollbar ref="codeContainerRef">
    <div
      v-show="props.nowView === SELECT_OPTIONS_ENUM.CODE"
      class="elx-xmarkdown-container elx-run-code-content"
    >
      <pre>
          <div
          :class="computedClass"
          :style="preStyle"
          >
            <code
                class="elx-run-code-content-code"
                :class="codeClass"
                :style="{
                    display: 'block',
                    overflowX: 'auto'
                }"
            >
            <div
                v-for="(line, index) in props.code"
                :key="index"
                class="code-line"
            >
                <span class="line-number">{{ index + 1 }}</span>
                <span class="line-content" v-html="line" />
            </div>
            </code>
        </div>
    </pre>
    </div>
    <iframe
      v-show="props.nowView === SELECT_OPTIONS_ENUM.VIEW"
      ref="iframeRef"
      sandbox="allow-same-origin"
      style="border: 0; width: 100%; height: 79.5vh"
    />
  </el-scrollbar>
</template>

<style src="./style/index.scss"></style>
