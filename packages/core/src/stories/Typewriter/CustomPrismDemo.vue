<script setup lang="ts">
// import { DEFAULT_MD_CONFIG } from '@components/ConfigProvider/constants';
import ConfigProvider from '@components/ConfigProvider/index.vue';
import Typewriter from '@components/Typewriter/index.vue';
// import { usePrism } from '@hooks/usePrism';
// import MarkdownIt from 'markdown-it';
import { useAttrs } from 'vue';
// import 'prismjs/themes/prism.min.css';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-go';

// const prismHighlight = usePrism();

// const md = new MarkdownIt({
//   ...DEFAULT_MD_CONFIG,
//   highlight: (code, language) => {
//     return prismHighlight(code, language);
//   }
// });

const attrs = useAttrs();
</script>

<template>
  <ConfigProvider>
    <div class="component-container">
      <Typewriter v-bind="attrs" />
    </div>
  </ConfigProvider>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
}
</style>
