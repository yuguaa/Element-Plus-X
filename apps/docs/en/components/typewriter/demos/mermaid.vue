<docs>
---
title: Built-in markdown-it-mermaid Plugin Renders Simple Charts
---

You can also find custom plugins in the `markdown-it` community to implement more custom functionality.
Through the `md-plugins` property, pass in a `markdown-it` plugin array to use custom plugins in `markdown-it`.
Through the `highlight` function, pass in Prism's highlighting function, or other highlighting libraries, to use Prism's highlighting functionality in `markdown-it`.

For detailed Mermaid format, see: [Mermaid.js](https://mermaid.js.org/syntax/pie.html)
</docs>

<script setup lang="ts">
import markdownItMermaid from '@jsonlee_12138/markdown-it-mermaid';
import { ref } from 'vue';

// This is a code highlighting library Prismjs built into the component library, a custom hooks example. (For integration reference only) Code address: https://github.com/HeJiaYue520/Element-Plus-X/blob/main/packages/components/src/hooks/usePrism.ts
import { usePrism } from 'vue-element-plus-x';
// Here you can import Prism core styles, or import other third-party theme styles yourself
// import 'vue-element-plus-x/styles/prism.min.css';
import 'prismjs/themes/prism.min.css';

const mdPlugins = [markdownItMermaid({ delay: 100, forceLegacyMathML: true })];
const highlight = usePrism();

const markdownText =
  ref(`#### Title \n This is a Markdown example.\n - List item 1 \n - List item 2 **bold text** and *italic text* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n \`\`\`mermaid
 pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
 \n
\`\`\`

\`\`\`mermaid
 xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

 \n
\`\`\`
`);
</script>

<template>
  <ClientOnly>
    <div>
      <Typewriter
        :content="markdownText"
        :is-markdown="true"
        :md-plugins="mdPlugins"
        :highlight="highlight"
      />
    </div>
  </ClientOnly>
</template>
