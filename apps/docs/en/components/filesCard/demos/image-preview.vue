<docs>
---
title: Image File Section
---

Supports image preview, square/rectangle variants, upload status overlay and other features. Can also be controlled through status and percent.
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div class="files-card-container-wrapper">
      <span>Image files <span style="color: red">previewable</span> and
        <span style="color: red">non-previewable</span></span>
      <div class="files-card-container">
        <FilesCard
          name="Previewable image.jpeg"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard name="Non-previewable image.jpeg" show-del-icon />
      </div>
      <span>Image files
        <span style="color: red">square variant</span>
        other formats are not affected by variant property</span>
      <div class="files-card-container">
        <FilesCard
          name="Previewable image.jpeg"
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
          img-variant="square"
          show-del-icon
        />
        <FilesCard
          name="Non-previewable image.jpeg"
          img-variant="square"
          show-del-icon
        />
        <FilesCard
          name="Other files not affected by variant.txt"
          img-variant="square"
          show-del-icon
          :file-size="30000"
        />
      </div>
      <span>Image files default rectangle variant
        <span style="color: red">supports upload status, supports preview on/off, supports preview
          mask overlay on/off</span></span>
      <div class="files-card-container">
        <FilesCard
          name="Upload progress.jpeg"
          :percent="50"
          status="uploading"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Upload failed.jpeg"
          status="error"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Close preview hover mask.jpeg"
          :img-preview-mask="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Close preview function.jpeg"
          :img-preview="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
      </div>

      <span>Image files square variant
        <span style="color: red">supports upload status, supports preview on/off, supports preview
          mask overlay on/off</span></span>
      <div class="files-card-container">
        <FilesCard
          name="Upload progress.jpeg"
          img-variant="square"
          :percent="50"
          status="uploading"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Upload failed.jpeg"
          img-variant="square"
          status="error"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Upload completed.jpeg"
          img-variant="square"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Close preview hover mask.jpeg"
          img-variant="square"
          :img-preview-mask="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="Close preview function.jpeg"
          img-variant="square"
          :img-preview="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
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
