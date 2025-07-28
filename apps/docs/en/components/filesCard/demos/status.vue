<docs>
---
title: status and percent Properties
---

Control file loading status (uploading, completed, failed) and progress display.
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div class="files-card-container-wrapper">
      <span>Set status property to control file loading status
        "uploading","done","error"</span>
      <div class="files-card-container">
        <FilesCard name="uploading test file.pdf" status="uploading" />
        <FilesCard name="done test file.pdf" status="done" />
        <FilesCard name="error test file.pdf" status="error" />
      </div>
      <span>"uploading"+"percent" controls upload progress, "error"+"errorTip"
        controls custom failure prompt
      </span>
      <div class="files-card-container">
        <FilesCard
          name="uploading test file.doc"
          status="uploading"
          :percent="50"
        />
        <FilesCard
          name="error test file.doc"
          status="error"
          error-tip="Custom failure prompt"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.files-card-container-wrapper {
  display: flex;
  gap: 12px;
  flex-direction: column;

  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
