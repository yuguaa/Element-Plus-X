<!-- 欢迎组件首页演示 -->
<script setup lang="ts">
import { XMarkdown } from 'vue-element-plus-x';
import Bin from './Bin.vue';
import Zhe from './Zhe.vue';

const markdown = ref(`
$e^{i\\pi} + 1 = 0$

$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$
`);
</script>

<template>
  <div>
    <div class="zhe-svg">
      <Zhe />
    </div>
    <div class="bin-svg">
      <Bin />
    </div>
    <XMarkdown :markdown="markdown" />
  </div>
</template>

<style scoped lang="less">
.card-content-component {
  align-self: center;
  width: calc(100% - 80px);
  margin: 0 40px;
  border-radius: 15px;
  // 旋转45度
  // transform: rotate(5deg);
  /* 彩色阴影：多层不同颜色叠加 */
  // transform: rotate(5deg);
  box-shadow:
    0 0 15px rgba(0, 255, 255, 0.5),
    /* 青色 */ 0 0 20px rgba(138, 43, 226, 0.4),
    /* 蓝紫 */ 0 0 30px rgba(0, 191, 255, 0.3);
  padding: 0;
  position: relative;

  .elx-xmarkdown-container {
    padding: 0;
  }

  .zhe-svg {
    position: absolute;
    top: -30px;
    left: 90%;
    // 旋转45度
    transform: rotate(35deg);
    // 旋转中心为自己中点
    transform-origin: top left;
    width: fit-content;
    height: fit-content;
    // 上下呼吸运行
    animation: zheMove 3.5s infinite ease-in-out;
  }

  .bin-svg {
    position: absolute;
    top: 20px;
    left: -10px;
    // 旋转45度
    transform: rotate(-35deg);
    // 上下呼吸运行
    animation: binMove 5s infinite ease-in-out;
  }

  :deep(.elx-xmarkdown-provider) {
    width: 100%;
    height: 100%;
    padding: 10px 10px 5px 50px;
    background: linear-gradient(
      97deg,
      rgba(90, 196, 255, 0.12) 0%,
      rgba(174, 136, 255, 0.12) 100%
    );
  }

  :deep(.katex) {
    /* 设置字体大小和粗细 */
    font-size: 1.05em;
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

  :deep(semantics) {
    /* 设置字体大小和粗细 */
    font-size: 1.05em;
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

  :deep(.mop) {
    /* 设置字体大小和粗细 */
    font-size: 1.05em;
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

  /*  binsvg 动画 */
  @keyframes binMove {
    0% {
      transform: rotate(-35deg) translateY(0);
    }
    50% {
      transform: rotate(-35deg) translateY(-10px);
    }
    100% {
      transform: rotate(-35deg) translateY(0);
    }
  }

  /*  zhesvg 动画 */
  @keyframes zheMove {
    0% {
      transform: rotate(35deg) translateY(0);
    }
    50% {
      transform: rotate(35deg) translateY(-10px);
    }
    100% {
      transform: rotate(35deg) translateY(0);
    }
  }
}
</style>
