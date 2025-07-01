<script setup lang="ts">
import { h } from 'vue';
import {
  MarkdownRenderer
  // MarkdownRendererAsync
} from '../../components/Markdown/index';
import CodeHeader from './CodeHeader.vue';

const props = defineProps<{
  markdown: string;
}>();
const timer = ref();
const index = ref(0);
function start() {
  timer.value = setInterval(() => {
    index.value += 5;
    if (index.value > props.markdown.length) {
      clearInterval(timer.value);
      index.value = props.markdown.length;
    }
  }, 100);
}
function pause() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

const content = computed(() => {
  return props.markdown.slice(0, index.value);
});

function redo() {
  index.value = 0;
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  start();
}
onMounted(() => {
  start();
});
</script>

<template>
  <el-button @click="start"> 开始 </el-button>
  <el-button @click="pause"> 暂停 </el-button>
  <el-button @click="redo"> 重新开始 </el-button>
  <div class="component-container">
    <h4>默认插槽</h4>
    <MarkdownRenderer
      v-bind="$attrs"
      :markdown="content"
      :custom-attrs="{
        code: () => {
          return {
            name: 'code',
            class: 'inline-code'
          };
        },
        a: _ => ({
          target: '_blank',
          rel: 'noopener noreferrer'
        })
      }"
    />
    <h4>全部函数式自定义插槽 以及方法</h4>
    <MarkdownRenderer
      v-bind="$attrs"
      :markdown="content"
      :code-x-slot="{
        codeHeaderLanguage(props: any) {
          return h(
            'span',
            { onClick: (ev: MouseEvent) => props.toggleExpand(ev) },
            '语言(可点击切换)'
          );
        },
        codeHeaderControl(props: any) {
          return h(
            'span',
            {},
            {
              default: () => [
                h(
                  'button',
                  {
                    onClick: () => {
                      console.log('isDark', props.toggleTheme());
                    }
                  },
                  '主题'
                ),
                h('span', {}, '&nbsp;|&nbsp;'),
                h(
                  'button',
                  {
                    onClick: () => {
                      props.copyCode(props.renderLines);
                    }
                  },
                  '复制'
                )
              ]
            }
          );
        }
      }"
    />
    <h4>组件插槽</h4>
    <MarkdownRenderer
      v-bind="$attrs"
      :markdown="content"
      :code-x-slot="{
        codeHeaderLanguage: CodeHeader
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
}
</style>
