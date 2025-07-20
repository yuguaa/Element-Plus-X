<docs>
---
title: Custom Styles
---

Customize card styles through `style`/`hoverStyle`, supports hover delete icon and custom slot extensions.
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard
      name="custom-style-example.xls"
      style="
        background-color: #f0f9eb;
        border: 2px solid #67c23a;
        border-radius: 20px;
      "
    />
    <FilesCard
      name="custom-hover-style-example.xls"
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

<style module lang="less"></style>
