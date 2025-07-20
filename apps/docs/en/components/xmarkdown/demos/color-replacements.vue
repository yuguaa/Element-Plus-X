<docs>
---
title: color-replacements Property
---

Through the `color-replacements` property, you can individually control code colors under a specific theme.

:::warning
Note: Color keys must start with `#` and be in lowercase format, otherwise they won't take effect.

Theme IDs will have corresponding color variables, which can be viewed in the console. We can perform color replacement on built-in color variables.
:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`js
console.log('hello world');
\`\`\`
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown
      :markdown="markdown"
      :color-replacements="{
        // Left side is the variable to modify, right side is the modified color
        'vitesse-light': {
          '#ab5959': '#ee82ee',
          '#1e754f': '#9370db'
        },
        'vitesse-dark': {
          '#cb7676': '#ff0066',
          '#4d9375': '#952189'
        }
      }"
    />

    <XMarkdown
      :markdown="markdown"
      :color-replacements="{
        // Pass a default value here to prevent it from being affected by other colorReplacements
        'vitesse-light': {
          '#ab5959': '#ab5959',
          '#1e754f': '#1e754f'
        },
        'vitesse-dark': {
          '#cb7676': '#cb7676',
          '#4d9375': '#4d9375'
        }
      }"
    />
  </div>
</template>

<style module lang="less"></style>
