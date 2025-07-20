<docs>
---
title: customAttrs Custom Attributes
---

Use the `customAttrs` property to receive an object where the properties are tag names and the values are tag attributes. When a tag is matched, the corresponding attributes will be added to that tag.
</docs>

<script setup lang="ts">
const markdown = `
<a href="https://element-plus-x.com/">element-plus-x</a>
<h1>Title 1</h1>
<h2>Title 2</h2>

<self-btn>Add el-button class name to custom tag</self-btn>
`;

// If you use the codeHeader property, the other two properties become invalid
const selfAttrs = {
  a: () => ({
    target: '_blank',
    rel: 'noopener noreferrer'
  }),
  h1: {
    style: {
      color: 'red',
      fontSize: '24px'
    }
  },
  h2: {
    style: {
      color: 'blue',
      fontSize: '20px'
    }
  },
  // Add el-button class name to custom tag
  'self-btn': {
    class: 'el-button'
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :custom-attrs="selfAttrs" />
  </div>
</template>

<style module lang="less"></style>
