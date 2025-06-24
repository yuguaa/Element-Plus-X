<script setup lang="ts">
import {
  MarkdownRenderer
  // MarkdownRendererAsync
} from '../../components/Markdown/index';
</script>

<template>
  <div class="component-container">
    <MarkdownRenderer
      v-bind="$attrs"
      :themes="{
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }"
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
