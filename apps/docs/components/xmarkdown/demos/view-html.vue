<docs>
---
title: 预览 HTML 代码块
---

支持预览 HTML 代码块。如果你不需要，可以通过 `nowViewBtnShow` 属性，设置 `false` 来隐藏按钮。

:::warning

同时也可以通过自定义顶部代码块，控制顶部预览按钮的样式。
详情请看 [自定义代码块顶部渲染](https://element-plus-x.com/components/xmarkdown/#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BB%A3%E7%A0%81%E5%9D%97%E9%A1%B6%E9%83%A8%E6%B8%B2%E6%9F%93)。或者，完全走自定义渲染。

:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`html
<div class="product-card">
  <div class="badge">新品</div>
  <img src="https://picsum.photos/300/200?product" alt="产品图片">

  <div class="content">
    <h3>无线蓝牙耳机 Pro</h3>
    <p class="description">主动降噪技术，30小时续航，IPX5防水等级</p>

    <div class="rating">
      <span>★★★★☆</span>
      <span class="reviews">(124条评价)</span>
    </div>

    <div class="price-container">
      <span class="price">¥499</span>
      <span class="original-price">¥699</span>
      <span class="discount">7折</span>
    </div>

    <div class="actions">
      <button class="cart-btn">加入购物车</button>
      <button class="fav-btn">❤️</button>
    </div>

    <div class="meta">
      <span>✓ 次日达</span>
      <span>✓ 7天无理由</span>
    </div>
  </div>
</div>

<style>
  .product-card {
    width: 280px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    position: relative;
    background: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: #ff6b6b;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    z-index: 2;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .content {
    padding: 16px;
  }

  h3 {
    margin: 8px 0;
    font-size: 18px;
    color: #333;
  }

  .description {
    color: #666;
    font-size: 14px;
    margin: 8px 0 12px;
    line-height: 1.4;
  }

  .rating {
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: #ffb300;
  }

  .reviews {
    font-size: 13px;
    color: #888;
    margin-left: 8px;
  }

  .price-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 12px 0;
  }

  .price {
    font-size: 22px;
    font-weight: bold;
    color: #ff4757;
  }

  .original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }

  .discount {
    background: #fff200;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }

  .actions {
    display: flex;
    gap: 8px;
    margin: 16px 0 12px;
  }

  .cart-btn {
    flex: 1;
    background: #5352ed;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }

  .cart-btn:hover {
    background: #3742fa;
  }

  .fav-btn {
    width: 42px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .fav-btn:hover {
    border-color: #ff6b6b;
    color: #ff6b6b;
  }

  .meta {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: #2ed573;
    margin-top: 8px;
  }
</style>
\`\`\`
`;
const value1 = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-switch v-model="value1" />
    <XMarkdown :markdown="markdown" :now-view-btn-show="value1" />
  </div>
</template>

<style module lang="less"></style>
