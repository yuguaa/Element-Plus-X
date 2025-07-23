<docs>
---
title: Delete Icon, Delete Event
---

You can set the `showDelIcon` property to show the delete icon, and set the `@delete` method to handle the delete event.
</docs>

<script setup lang="ts">
function handleDel() {
  ElMessage.success('Delete successful');
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard name="Delete test file.md" show-del-icon @delete="handleDel" />
  </div>
</template>

<style scoped lang="less"></style>
