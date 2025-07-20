<docs>
---
title: Basic Usage
---

You can get the built-in file type fileType: color object from the component instance. It includes 16 built-in file type icons.
</docs>

<script setup lang="ts">
import type { FilesType } from 'vue-element-plus-x/types/FilesCard';

const filesCardRef = ref();
const colorMap = ref({}) as Ref<Record<FilesType, string>>;

onMounted(() => {
  // Get built-in colors
  colorMap.value = filesCardRef.value?.colorMap;
  console.log(colorMap.value);
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>Set name property without extension. name="test-file"</span>
    <FilesCard ref="filesCardRef" name="test-file" />
    <span>Set name property with file extension. name="test-file.pdf"</span>
    <FilesCard name="test-file.pdf" />
    <span>Supports matching built-in icons based on name extension</span>
    <div class="files-card-container">
      <FilesCard name="test-doc-extension.doc" />
      <FilesCard name="test-xls-extension.xls" />
      <FilesCard name="test-ppt-extension.ppt" />
      <FilesCard name="test-txt-extension.txt" />
      <FilesCard name="test-pdf-extension.pdf" />
      <FilesCard name="test-png-extension.png" />
      <FilesCard name="test-jpg-extension.jpg" />
      <FilesCard name="test-gif-extension.gif" />
      <FilesCard name="test-mp4-extension.mp4" />
      <FilesCard name="test-mp3-extension.mp3" />
      <FilesCard name="test-zip-extension.zip" />
      <FilesCard name="test-rar-extension.rar" />
      <FilesCard name="test-7z-extension.7z" />
      <FilesCard name="test-lnk-extension.lnk" />
      <FilesCard name="test-obj-extension.obj" />
      <FilesCard name="test-fbx-extension.fbx" />
      <FilesCard name="test-glb-extension.glb" />
      <FilesCard name="test-sql-extension.sql" />
      <FilesCard name="test-db-extension.db" />
      <FilesCard name="test-md-extension.md" />
      <FilesCard name="test-js-extension.js" />
      <FilesCard name="test-py-extension.py" />
      <FilesCard name="test-java-extension.java" />
      <FilesCard name="test-php-extension.php" />
      <FilesCard name="test-json-extension.json" />
    </div>
    <span
      >If there is an extension but it doesn't match common icons, it defaults
      to File type</span
    >
    <FilesCard name="https://dd.com-multiple-special-chars.extension.self" />
  </div>
</template>

<style module lang="less">
.files-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
