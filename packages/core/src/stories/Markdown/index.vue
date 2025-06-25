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
    <!-- <MarkdownRenderer
      v-bind="$attrs"
      :themes="{
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }"
    >
      <template #headerLanguage="{ language }">
        <span>slots language ----  {{ language }}</span>
      </template>
      <template #headerControl="{ lines }">
        <span>slots control ----  {{ lines.length }}</span>
      </template>
    </MarkdownRenderer> -->
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
}
</style>
