<script setup lang="ts">
import { DEFAULT_MD_CONFIG } from '@components/ConfigProvider/constants';
import Shiki from '@shikijs/markdown-it';
import MarkdownIt from 'markdown-it';
import { useAttrs } from 'vue';
import ConfigProvider from '../../components/ConfigProvider/index.vue';
import Typewriter from '../../components/Typewriter/index.vue';

const md = new MarkdownIt({
  ...DEFAULT_MD_CONFIG
});

md.use(
  await Shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  })
);

const attrs = useAttrs();
</script>

<template>
  <ConfigProvider :md="md">
    <div class="component-container">
      <div class="component-title" style="color: red">
        注: 由于shiki是异步加载, 因此当前使用的异步加载,
        如果介意的话可以在全局注册markdown-it,
        后期可能会提供比较好的方案来解决这个问题。
      </div>

      <Typewriter v-bind="attrs" />
    </div>
  </ConfigProvider>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409eff;
    }
  }
}
</style>
