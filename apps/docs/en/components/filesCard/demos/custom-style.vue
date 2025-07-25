<docs>
---
title: Custom Styles
---

Customize card styles via `style`/`hoverStyle`, supports hover delete icon and custom slot extension.
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard
      name="Custom style.xls"
      style="
        background-color: #f0f9eb;
        border: 2px solid #67c23a;
        border-radius: 20px;
      "
    />
    <FilesCard
      name="Custom hoverStyle.xls"
      style="
        background-color: #f0f9eb;
        border: 1px solid #67c23a;
        border-radius: 20px;
      "
      :hover-style="{
        'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        'border-color': 'red',
        'background-color': 'rgba(255, 0, 0, 0.1)'
      }"
    />
  </div>
</template>

<style scoped lang="less"></style>
