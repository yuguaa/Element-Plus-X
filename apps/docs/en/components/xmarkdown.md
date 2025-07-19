# XMarkdown Rendering Component 📜

## Introduction

The `XMarkdown` component has built-in basic styles for **inline code**, **code blocks**, **mathematical formula functions (inline/block)**, **mermaid charts**, etc.

:::info

⚠️ In this development documentation, some style demonstrations may not be very good, but it shouldn't affect integration usage. If you have integration or usage issues, you can join 👉[Discussion Group](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81) for the latest technical support.

This component supports **incremental updates** and **customization**. More built-in styles and component customization🥰
Currently this component is in the latest `1.3.0` version, please install using the following command

```npm
pnpm add vue-element-plus-x@1.3.0
```

:::

:::warning

💖Friendly Reminder💖

All demo cases in the documentation with `h function` demonstrations mean that you can use the `h` function for component rendering, or you can use `custom Vue components` for rendering.

**For example:**

```vue
<!-- This is the h function demonstration in the documentation -->
(props:any) => {return h('div', props, {default: () => 'test'})}
```

**🙊 Actually, it can be written as a custom component:**

```vue
<!-- Import your Vue component from external -->
import SelfButton from './SelfButton.vue'

<!-- Custom component rendering -->
<!-- SelfButton is your custom Vue component defined above -->
<!-- selfProps is a custom property that receives props -->
(props:any) => {return h(SelfButton, { selfProps: props })}
```

**💟 In your custom component, you can get props like this:**

```vue
<!-- SelfButton.vue -->

<script setup lang="ts">
const props = defineProps({
  selfProps: { type: Object, default: () => ({}) }
});

console.log(props.selfProps); // Check the props you received in console
</script>

<template>
  <!-- You can get props properties for some custom rendering -->
  <button>{{ selfProps.text }}</button>
</template>
```

:::

## Code Examples

### Basic Usage

<demo src="../../components/xmarkdown/demos/base.vue"></demo>

### Set Default Highlight/Dark Mode

<demo src="../../components/xmarkdown/demos/default-theme-mode.vue"></demo>

### Built-in Shiki Themes

Code block highlighting has multiple built-in themes to choose from.

<demo src="../../components/xmarkdown/demos/shiki-style.vue"></demo>

### Define Code Block Highlight Styles Separately

<demo src="../../components/xmarkdown/demos/color-replacements.vue"></demo>

### Unified Style Override

<demo src="../../components/xmarkdown/demos/base-style.vue"></demo>

Here's an example using `github` style file to uniformly override styles

### GitHub Style

<demo src="../../components/xmarkdown/demos/github-style.vue"></demo>

If you want to control the code block highlighting style separately, you can do this:

### allowHtml

<demo src="../../components/xmarkdown/demos/allow-html.vue"></demo>

### enableLatex

<demo src="../../components/xmarkdown/demos/enable-latex.vue"></demo>

### enableBreaks

<demo src="../../components/xmarkdown/demos/enable-breaks.vue"></demo>

### Preview HTML Code Blocks

<demo src="../../components/xmarkdown/demos/view-html.vue"></demo>

### Custom Code Block Rendering

<demo src="../../components/xmarkdown/demos/code-x-render.vue"></demo>

The echarts component referenced in the example code. The source code is placed here for easy understanding. How to customize components, this echarts component implementation is for example only. In actual use, please encapsulate according to your own backend data and requirements.

::: details 💝View `echarts` Component Code Example

```vue
<!-- echarts.vue -->

<script setup lang="ts">
import * as echarts from 'echarts';

// Retain original props.code logic while adding optional configuration
const props = defineProps<{
  code: string; // Original JSON string configuration
  width?: string; // Optional: chart width
  height?: string; // Optional: chart height
  theme?: string; // Optional: chart theme
}>();

const refEle = ref<HTMLElement>();
let myChart: echarts.ECharts | null = null; // Chart instance reference

function parseEChartsOption(str: string): any {
  try {
    let cleanedStr = str.replace(/^option\s*=\s*/, '').replace(/;\s*$/, '');
    cleanedStr = cleanedStr.replace(/'/g, '"');
    cleanedStr = cleanedStr.replace(/(\w+)\s*:/g, '"$1":');
    return JSON.parse(cleanedStr);
  } catch (error) {
    console.error('Failed to parse ECharts option:', error);
    return null;
  }
}

// Core rendering logic (retain original parsing process)
function renderChart() {
  if (!refEle.value) return;

  try {
    // Parse JSON configuration (retain original logic)
    const cleanedStr = parseEChartsOption(props.code);

    // Initialize/update chart
    if (!myChart) {
      myChart = echarts.init(refEle.value, props.theme);
    }
    myChart.setOption(cleanedStr);
  } catch (error) {
    console.error('Chart configuration parsing failed:', error);
  }
}

// Window resize handling
function handleResize() {
  myChart?.resize();
}

// Destroy logic
function destroyChart() {
  if (myChart) {
    myChart.dispose(); // Release ECharts instance
    myChart = null;
  }
  window.removeEventListener('resize', handleResize);
}

// Initialize rendering
onMounted(() => {
  renderChart();
  window.addEventListener('resize', handleResize); // Add resize listener
});

// Watch code changes for automatic updates (key optimization)
watch(
  () => props.code,
  () => {
    renderChart(); // Re-render when configuration changes
  }
);

// Clean up resources on unmount
onUnmounted(() => {
  destroyChart();
});
</script>

<template>
  <div class="echarts-wrap">
    <span class="echarts-titlt">This is my custom echarts component</span>
    <div
      ref="refEle"
      :style="{
        height: height || '400px', // Optional height, default 400px
        width: width || '100%' // Optional width, default 100%
      }"
    />
  </div>
</template>

<style module lang="less">
.echarts-wrap {
  position: relative;

  .echarts-titlt {
    position: absolute;
    width: fit-content;
    margin-left: 20px;
    color: blue;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
```

:::

### Custom Code Block Top Rendering

If you just want to modify the content at the top of our built-in code block, you can use `codeXSlot`. And we expose the built-in `collapse`, `theme switching`, and `copy` methods. You can retain the default functionality while only changing the style.

<demo src="../../components/xmarkdown/demos/code-x-slot.vue"></demo>

### Custom Attributes

<demo src="../../components/xmarkdown/demos/custom-attrs.vue"></demo>

### Mermaid Operation Bar Configuration

<demo src="../../components/xmarkdown/demos/mermaid-config.vue"></demo>

### Slot Tag Interception

<demo src="../../components/xmarkdown/demos/slot.vue"></demo>

### Built-in Code Block Languages

<demo src="../../components/xmarkdown/demos/lang.vue"></demo>

## Properties

| Property Name   | Type   | Required | Default  | Description                          |
| --------------- | ------ | -------- | -------- | ------------------------------------ |
| `markdown`      | string | Yes      | ''       | markdown content                     |
| `allowHtml`     | bool   | No       | `true`   | whether to render html               |
| `enableLatex`   | bool   | No       | `true`   | whether to render latex              |
| `enableBreaks`  | bool   | No       | `true`   | whether to render breaks             |
| `codeXRender`   | Object | No       | `()=>{}` | custom code block rendering          |
| `codeXSlot`     | Object | No       | `()=>{}` | custom code block top slot rendering |
| `customAttrs`   | Object | No       | `()=>{}` | custom attributes                    |
| `mermaidConfig` | Object | No       | `()=>{}` | mermaid configuration                |

## Features

- Supports incremental rendering for ultimate performance
- Supports custom slots, can be h function components or template components. Easier to get started
- Built-in rich basic styles for mathematical formulas, mermaid charts, reducing developer burden
- Supports multiple interceptions and custom rendering, maximizing flexibility
