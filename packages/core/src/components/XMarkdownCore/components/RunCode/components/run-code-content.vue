<script lang="ts" setup>
import type { ElxRunCodeContentProps } from '../type';
import DOMPurify from 'dompurify';
import _ from 'lodash';
import CustomLoading from './custom-loading.vue';
import { SELECT_OPTIONS_ENUM } from './options';

const props = defineProps<ElxRunCodeContentProps>();

const computedClass = computed(() => `pre-md ${props.preClass}`);

const codeClass = computed(() => `language-${props.lang || 'text'}`);

const iframeRef = ref<HTMLIFrameElement>();

const allHtml = computed(() => props.content);

const codeContainerRef = ref<HTMLElement>();

const isLoading = ref(false);

// 核心渲染函数
function doRenderIframe() {
  const iframe = iframeRef.value;
  if (!iframe) return;

  isLoading.value = true;

  const safeHTML = DOMPurify.sanitize(allHtml.value, {
    WHOLE_DOCUMENT: true,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'style']
  });

  // 防止乱码
  let htmlWithCharset = safeHTML;
  if (!/charset=/i.test(safeHTML)) {
    htmlWithCharset = safeHTML.replace(
      /<head[^>]*>/i,
      match => `${match}<meta charset="UTF-8">`
    );
  }

  const blob = new Blob([htmlWithCharset], { type: 'text/html' });

  if (iframe.src.startsWith('blob:')) {
    URL.revokeObjectURL(iframe.src);
  }

  iframe.src = URL.createObjectURL(blob);

  const onLoad = () => {
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
    iframe.removeEventListener('load', onLoad);
  };
  iframe.addEventListener('load', onLoad);
}

const renderIframe = _.debounce(() => {
  doRenderIframe();
}, 300);

function startRender() {
  if (props.nowView === SELECT_OPTIONS_ENUM.VIEW) {
    isLoading.value = true;
    renderIframe();
  }
}

watch(
  () => props.nowView,
  () => {
    startRender();
  },
  { immediate: true }
);
watch(
  () => props.code,
  () => {
    startRender();
  },
  { immediate: true }
);

onMounted(() => {
  nextTick(() => {
    startRender();
  });
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
    <div
      v-show="props.nowView === SELECT_OPTIONS_ENUM.VIEW"
      style="position: relative; width: 100%; height: 100%"
      class="elx-run-code-content-view"
    >
      <div v-if="isLoading" class="iframe-loading-mask">
        <CustomLoading />
      </div>
      <div v-show="!isLoading" class="elx-run-code-content-view-iframe">
        <iframe
          ref="iframeRef"
          sandbox="allow-scripts"
          style="border: 0; width: 100%; height: 79.5vh"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<style src="./style/index.scss"></style>
