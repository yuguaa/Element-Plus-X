<docs>
---
title: Preview HTML Code Blocks
---

Support previewing HTML code blocks.
- If you don't need it, you can hide the button by setting `need-view-code-btn` property to `false`. Default is `true`.
- You can also use the `secure-view-code` property, set to `true` to enable `html` safe mode. Default is `false`. If enabled, `script` tags will not be rendered. Click to add to cart
- You can also configure the modal through the `viewCodeModalOptions` property.

```js
viewCodeModalOptions: {
  mode: 'drawer',
  customClass: '',
  dialogOptions: {
    closeOnClickModal: true,
    closeOnPressEscape: true
  },
  drawerOptions: {
    closeOnClickModal: true,
    closeOnPressEscape: true
  }
}
```

| Property            | Value     | Description                                                          |
|---------------------|-----------|----------------------------------------------------------------------|
| mode                | 'drawer'  | Modal display form as drawer type                                    |
| customClass         | ''        | No custom style class added                                           |
| dialogOptions       | -         | Dialog mode configuration (currently not enabled)                    |
| - closeOnClickModal | true      | Click outside dialog area to close (only effective in dialog mode)  |
| - closeOnPressEscape | true     | Press ESC key to close dialog (only effective in dialog mode)       |
| drawerOptions       | -         | Drawer mode configuration (currently enabled)                        |
| - closeOnClickModal | true      | Click outside drawer area to close                                   |
| - closeOnPressEscape | true     | Press ESC key to close drawer                                         |

:::warning

You can also control the top preview button style by customizing the top code block.

Or, go completely custom rendering, see details below **`Custom Code Block Top Rendering`**.

:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`html
<div class="product-card">
  <div class="badge">New</div>
  <img src="https://picsum.photos/300/200?product" alt="Product Image">

  <div class="content">
    <h3>Wireless Bluetooth Headphones Pro</h3>
    <p class="description">Active noise cancellation technology, 30-hour battery life, IPX5 waterproof rating</p>

    <div class="rating">
      <span>★★★★☆</span>
      <span class="reviews">(124 reviews)</span>
    </div>

    <div class="price-container">
      <span class="price">¥499</span>
      <span class="original-price">¥699</span>
      <span class="discount">70% off</span>
    </div>

    <div class="actions">
      <button class="cart-btn" onclick="addToCart(this)">Add to Cart</button>
      <button class="fav-btn">❤️</button>
    </div>

    <div class="meta">
      <span>✓ Next Day Delivery</span>
      <span>✓ 7-Day Return</span>
    </div>
  </div>
</div>

\<script\>
  function addToCart(button) {
    // Prevent duplicate clicks
    if (button.disabled) return;
    
    // Disable button
    button.disabled = true;
    button.innerHTML = 'Adding...';
    
    // Simulate API request to add to cart
    setTimeout(() => {
      // Show success message
      button.innerHTML = '✓ Added';
      button.classList.add('success');
      
      // Restore button state after 3 seconds
      setTimeout(() => {
        button.innerHTML = 'Add to Cart';
        button.disabled = false;
        button.classList.remove('success');
      }, 3000);
    }, 800);
  };
\<\/script\>

<style>
  .product-card {
  width: 280px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.cart-btn.disabled {
  background: #a4b0be;
  cursor: not-allowed;
}

.cart-btn.success {
  background: #2ed573;
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
const value2 = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>是否显示 html 预览按钮 <el-switch v-model="value1" /></span>
    <span>是否开启安全预览 <el-switch v-model="value2" /></span>
    <span
      >开启安全预览后，尝试点击加入购物车按钮，不会触发 script
      标签中的事件</span
    >
    <XMarkdown
      :markdown="markdown"
      :need-view-code-btn="value1"
      :secure-view-code="value2"
    />
  </div>
</template>

<style module lang="less"></style>
