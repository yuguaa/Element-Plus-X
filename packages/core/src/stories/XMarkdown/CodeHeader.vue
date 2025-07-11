<script setup lang="ts">
import type { CodeBlockExpose } from '@components/XMarkdownCore/components/CodeBlock/shiki-header';

const props = defineProps<CodeBlockExpose>();
</script>

<template>
  <div @click="(ev: MouseEvent) => props.toggleExpand(ev)">
    组件插槽--{{ props.isExpand.value }}
  </div>
</template>

<style scoped lang="scss"></style>
