<script setup lang="ts">
import Markdown from '@components/Markdown/index.vue';
import { ElButton, ElTooltip } from 'element-plus';
import { h } from 'vue';
import CodeHeader from './CodeHeader.vue';

const props = defineProps<{
  markdown: string;
}>();
const timer = ref();
const index = ref(0);
function start() {
  timer.value = setInterval(() => {
    index.value += 10;
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

const codeXSlotConfig = {
  codeHeaderLanguage: (props: any) => {
    return h(
      'span',
      { onClick: (ev: MouseEvent) => props.toggleExpand(ev) },
      {
        default: () => '语言(可点击切换)'
      }
    );
  },
  codeHeaderControl: (props: any) => {
    return h(
      ElSpace,
      {
        class: `markdown-language-header-space`,
        direction: 'horizontal'
      },
      {
        default: () => [
          h(
            ElTooltip,
            {
              content: '切换主题',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    class: 'shiki-header-button',
                    onClick: () => {
                      console.log('isDark', props.toggleTheme());
                    }
                  },
                  { default: () => (props.isDark.value ? '🌞' : '🌙') }
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '复制代码',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    class: 'shiki-header-button',
                    onClick: () => {
                      props.copyCode(props.renderLines);
                    }
                  },
                  { default: () => '🥢' }
                )
            }
          )
        ]
      }
    );
  }
};

const codeXSlotComponentsConfig = {
  codeHeaderLanguage: CodeHeader
};

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
  <ElButton @click="start"> 开始 </ElButton>
  <ElButton @click="pause"> 暂停 </ElButton>
  <ElButton @click="redo"> 重新开始 </ElButton>
  <div class="component-container">
    <h4>默认插槽</h4>
    <Markdown
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
    <h4>函数自定义插槽以及使用暴露出来的方法</h4>
    <Markdown
      v-bind="$attrs"
      :markdown="content"
      :code-x-slot="codeXSlotConfig"
    />
    <h4>组件插槽</h4>
    <Markdown
      v-bind="$attrs"
      :markdown="content"
      :code-x-slot="codeXSlotComponentsConfig"
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
