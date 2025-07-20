<docs>
---
title: Delete Icon and Delete Event
---

You can set the `showDelIcon` property to display the delete icon, and set the `@delete` method to handle the delete event.
</docs>

<script setup lang="ts">
function handleDel() {
  ElMessage.success('Delete successful');
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard name="delete-test-file.md" show-del-icon @delete="handleDel" />
  </div>
</template>

<style module lang="less"></style>
