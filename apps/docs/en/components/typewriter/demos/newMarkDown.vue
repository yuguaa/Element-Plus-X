<docs>
---
title: Built-in Prism Style Files
---

```ts

// Import different theme styles for Prism syntax highlighting (based on style files provided by vue-element-plus-x plugin)
// Each file corresponds to an independent code highlighting theme style, which can be selected and enabled according to project requirements

// 1. Coy theme (simple light style, suitable for daily reading)
import 'vue-element-plus-x/styles/prism-coy.min.css'

// 2. Dark theme (dark background theme, suitable for night mode or low-light environments)
import 'vue-element-plus-x/styles/prism-dark.min.css'

// 3. Funky theme (vibrant color style, strong contrast in code syntax highlighting)
import 'vue-element-plus-x/styles/prism-funky.min.css'

// 4. Okaidia theme (dark high-contrast theme, focuses on code structure distinction)
import 'vue-element-plus-x/styles/prism-okaidia.min.css'

// 5. Solarized Light theme (soft light theme, based on Solarized color scheme)
import 'vue-element-plus-x/styles/prism-solarizedlight.min.css'

// 6. Tomorrow theme (modern minimalist style, suitable for wide screens and large fonts)
import 'vue-element-plus-x/styles/prism-tomorrow.min.css'

// 7. Twilight theme (twilight color theme, balanced style between light and dark)
import 'vue-element-plus-x/styles/prism-twilight.min.css'

// 8. Prism core base styles (must be imported, contains basic styles and structure for syntax highlighting)
import 'vue-element-plus-x/styles/prism.min.css'

/* Usage Instructions:
1. prism.min.css is the core style of Prism, containing basic code block layout and common styles, must be retained
2. Other files starting with prism- are different theme styles, which can be selected and imported according to project visual design
3. If multiple themes are imported simultaneously, later imported styles will override earlier ones (can dynamically switch themes by switching class names)
4. Theme names correspond to Prism official preset themes (such as Coy, Okaidia, etc.), style details can refer to Prism theme documentation
*/

```
</docs>

<script setup lang="ts">
import { ref } from 'vue';
// import Typewriter from 'vue-element-plus-x/src/components/Typewriter/index.vue';
// import { usePrism } from 'vue-element-plus-x/src/hooks/usePrism.js'
// import AppConfig from 'vue-element-plus-x/src/components/AppConfig/index.vue'
// Here you can import Prism core styles, or import other third-party theme styles yourself
// import 'vue-element-plus-x/styles/prism.min.css';

const markdownText = ref(
  `#### Title \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`js \n console.log('Hello, world!'); \n \`\`\``
);
</script>

<template>
  <ClientOnly>
    <div>
      <Typewriter :content="markdownText" :is-markdown="true" />
    </div>
  </ClientOnly>
</template>
