<!-- 欢迎组件首页演示 -->
<script setup lang="ts">
import { Welcome } from 'vue-element-plus-x';

const bgColor =
  'linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)';
</script>

<template>
  <Welcome
    :style="{ background: bgColor }"
    icon="https://element-plus-x.com/logo.png"
    title="你好，我是"
    description="Element Plus X 💌"
    variant="borderless"
  />
</template>

<style scoped lang="less">
.welcome-container {
  width: calc(100% - 80px);
  margin: 50px 40px;
  padding: 8px;
  border-radius: 15px;
  border: none;
  // 旋转45度
  // transform: rotate(5deg);
  /* 彩色阴影：多层不同颜色叠加 */
  box-shadow:
    0 0 15px rgba(0, 255, 255, 0.5),
    /* 青色 */ 0 0 20px rgba(138, 43, 226, 0.4),
    /* 蓝紫 */ 0 0 30px rgba(0, 191, 255, 0.3);
  /* 天蓝 */

  // 渐变标题
  :deep(.welcome-title) {
    /* 设置字体大小和粗细 */
    font-size: 1.25em;
    font-weight: bold;

    /* 设置渐变背景 */
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00);
    background-size: 300% 300%;

    /* 将背景裁剪为文本形状 */
    -webkit-background-clip: text;
    background-clip: text;

    /* 使文本本身透明，显示背景渐变 */
    color: transparent;

    /* 添加光辉效果 */
    text-shadow:
      0 0 10px rgba(255, 255, 255, 0.8),
      0 0 20px rgba(255, 0, 255, 0.6),
      0 0 30px rgba(0, 255, 255, 0.4);

    /* 添加动画效果使渐变流动 */
    animation: gradientShift 5s ease infinite;
  }

  // 描述文本
  :deep(.welcome-description) {
    font-size: 0.875rem;

    /* 文字本身的纯色 */
    color: rgba(0, 255, 255);
  }

  /* 渐变动画 */
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
