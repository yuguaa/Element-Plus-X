<docs>
---
title: themes Property
---

Set code block themes through the `themes` property. This property is an object with highlight and dark theme properties, with values being built-in `theme IDs`.

```ts
themes: {
  light: 'vitesse-light'; // Light theme (component default theme)
  dark: 'vitesse-dark'; // Dark theme (component default theme)
}
```

We have built-in shiki styles, you can view them at [shiki-theme](https://shiki.style/themes).

:::warning
After resetting the theme, you may need to refresh the page for it to take effect. Below lists all built-in `shiki` styles and their corresponding `theme IDs`. If you're in a ts project, you should get type inference hints for built-in style themes during development.

<img src="https://cdn.element-plus-x.com/shiki-style.png" width="100%">
:::

::: details 💝View all theme ID reference table
| Name | Chinese Translation | Corresponding Value (`Theme ID`) |
| --- | --- | --- |
| Andromeeda | Andromeda | andromeeda |
| Aurora X | Aurora X | aurora-x |
| Ayu Dark | Ayu Dark | ayu-dark |
| Catppuccin Frappé | Catppuccin Frappé | catppuccin-frappe |
| Catppuccin Latte | Catppuccin Latte | catppuccin-latte |
| Catppuccin Macchiato | Catppuccin Macchiato | catppuccin-macchiato |
| Catppuccin Mocha | Catppuccin Mocha | catppuccin-mocha |
| Dark Plus | Dark Plus | dark-plus |
| Dracula Theme | Dracula Theme | dracula |
| Dracula Theme Soft | Dracula Soft Theme | dracula-soft |
| Everforest Dark | Everforest Dark | everforest-dark |
| Everforest Light | Everforest Light | everforest-light |
| GitHub Dark | GitHub Dark | github-dark |
| GitHub Dark Default | GitHub Dark Default | github-dark-default |
| GitHub Dark Dimmed | GitHub Dark Dimmed | github-dark-dimmed |
| GitHub Dark High Contrast | GitHub Dark High Contrast | github-dark-high-contrast |
| GitHub Light | GitHub Light | github-light |
| GitHub Light Default | GitHub Light Default | github-light-default |
| GitHub Light High Contrast | GitHub Light High Contrast | github-light-high-contrast |
| Gruvbox Dark Hard | Gruvbox Dark Hard | gruvbox-dark-hard |
| Gruvbox Dark Medium | Gruvbox Dark Medium | gruvbox-dark-medium |
| Gruvbox Dark Soft | Gruvbox Dark Soft | gruvbox-dark-soft |
| Gruvbox Light Hard | Gruvbox Light Hard | gruvbox-light-hard |
| Gruvbox Light Medium | Gruvbox Light Medium | gruvbox-light-medium |
| Gruvbox Light Soft | Gruvbox Light Soft | gruvbox-light-soft |
| Houston | Houston | houston |
| Kanagawa Dragon | Kanagawa Dragon | kanagawa-dragon |
| Kanagawa Lotus | Kanagawa Lotus | kanagawa-lotus |
| Kanagawa Wave | Kanagawa Wave | kanagawa-wave |
| LaserWave | LaserWave | laserwave |
| Light Plus | Light Plus | light-plus |
| Material Theme | Material Theme | material-theme |
| Material Theme Darker | Material Theme Darker | material-theme-darker |
| Material Theme Lighter | Material Theme Lighter | material-theme-lighter |
| Material Theme Ocean | Material Theme Ocean | material-theme-ocean |
| Material Theme Palenight | Material Theme Palenight | material-theme-palenight |
| Min Dark | Min Dark | min-dark |
| Min Light | Min Light | min-light |
| Monokai | Monokai | monokai |
| Night Owl | Night Owl | night-owl |
| Nord | Nord | nord |
| One Dark Pro | One Dark Pro | one-dark-pro |
| One Light | One Light | one-light |
| Plastic | Plastic | plastic |
| Poimandres | Poimandres | poimandres |
| Red | Red Theme | red |
| Rosé Pine | Rosé Pine | rose-pine |
| Rosé Pine Dawn | Rosé Pine Dawn | rose-pine-dawn |
| Rosé Pine Moon | Rosé Pine Moon | rose-pine-moon |
| Slack Dark | Slack Dark | slack-dark |
| Slack Ochin | Slack Ochin | slack-ochin |
| Snazzy Light | Snazzy Light | snazzy-light |
| Solarized Dark | Solarized Dark | solarized-dark |
| Solarized Light | Solarized Light | solarized-light |
| Synthwave '84 | Synthwave '84 | synthwave-84 |
| Tokyo Night | Tokyo Night | tokyo-night |
| Vesper | Vesper | vesper |
| Vitesse Black | Vitesse Black | vitesse-black |
| Vitesse Dark | Vitesse Dark | vitesse-dark |
| Vitesse Light | Vitesse Light | vitesse-light |
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
      :themes="{ light: 'andromeeda', dark: 'material-theme-darker' }"
    />
  </div>
</template>

<style scoped lang="less"></style>
