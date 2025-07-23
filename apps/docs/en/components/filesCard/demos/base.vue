<docs>
---
title: Basic Usage
---

You can get the colorMap built-in file type fileType: color object on the component instance. Built-in 16 file type icons.
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
    <span>Set name property, and name has no suffix. name="Test File"</span>
    <FilesCard ref="filesCardRef" name="Test File" />
    <span>Set name property, has file suffix. name="Test File.pdf"</span>
    <FilesCard name="Test File.pdf" />
    <span>Supports matching built-in icons based on name suffix </span>
    <div class="files-card-container">
      <FilesCard name="Test doc suffix.doc" />
      <FilesCard name="Test xls suffix.xls" />
      <FilesCard name="Test ppt suffix.ppt" />
      <FilesCard name="Test txt suffix.txt" />
      <FilesCard name="Test pdf suffix.pdf" />
      <FilesCard name="Test png suffix.png" />
      <FilesCard name="Test jpg suffix.jpg" />
      <FilesCard name="Test gif suffix.gif" />
      <FilesCard name="Test mp4 suffix.mp4" />
      <FilesCard name="Test mp3 suffix.mp3" />
      <FilesCard name="Test zip suffix.zip" />
      <FilesCard name="Test rar suffix.rar" />
      <FilesCard name="Test 7z suffix.7z" />
      <FilesCard name="Test lnk suffix.lnk" />
      <FilesCard name="Test obj suffix.obj" />
      <FilesCard name="Test fbx suffix.fbx" />
      <FilesCard name="Test glb suffix.glb" />
      <FilesCard name="Test sql suffix.sql" />
      <FilesCard name="Test db suffix.db" />
      <FilesCard name="Test md suffix.md" />
      <FilesCard name="Test js suffix.js" />
      <FilesCard name="Test py suffix.py" />
      <FilesCard name="Test java suffix.java" />
      <FilesCard name="Test php suffix.php" />
      <FilesCard name="Test json suffix.json" />
    </div>
    <span>If there is a suffix but can't match common icons, it defaults to File</span>
    <FilesCard name="https://dd.comMultiple special characters.suffix.self" />
  </div>
</template>

<style scoped lang="less">
.files-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
