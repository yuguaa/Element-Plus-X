---
layout: home
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 自动重定向到英文版本
  if (typeof window !== 'undefined') {
    window.location.href = '/en/'
  }
})
</script>

<div style="text-align: center; padding: 2rem;">
  <h1>🔄 Redirecting...</h1>
  <p>正在重定向到英文版本 / Redirecting to English version...</p>
  <p>如果没有自动跳转，请点击: <a href="/en/">English</a> | <a href="/zh/">中文</a></p>
</div>
