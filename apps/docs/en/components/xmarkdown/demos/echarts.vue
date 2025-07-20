<script setup lang="ts">
import * as echarts from 'echarts';

// Keep original props.code logic, while adding optional configuration
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
    // Step 1: Remove variable assignment prefix and trailing semicolon
    let cleanedStr = str.replace(/^option\s*=\s*/, '').replace(/;\s*$/, '');

    // Step 2: Replace single quotes with double quotes for string values
    cleanedStr = cleanedStr.replace(/'/g, '"');

    // Step 3: Add double quotes around unquoted keys
    cleanedStr = cleanedStr.replace(/(\w+)\s*:/g, '"$1":');

    // Step 4: Parse the transformed string into JSON object
    return JSON.parse(cleanedStr);
  } catch (error) {
    console.error('Failed to parse ECharts option:', error);
    return null;
  }
}

// Core rendering logic (keep original parsing process)
function renderChart() {
  if (!refEle.value) return;

  try {
    // Parse JSON configuration (keep original logic)
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

// Destruction logic
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

// Listen for code changes to auto-update (key optimization)
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
