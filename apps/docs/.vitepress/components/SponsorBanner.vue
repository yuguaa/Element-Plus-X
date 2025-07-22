<!-- 顶部-模版项目跳转-区域 -->
<script setup lang="ts">
import { ref } from 'vue';

const open = ref(true);
function dismiss() {
  open.value = false;
  document.documentElement.classList.add('banner-dismissed');
}
</script>

<template>
  <div v-if="open" class="banner">
    <img src="/logo.png" class="logo" />
    <p class="vt-banner-text">
      <span class="vt-main">模版项目</span>
      <span class="vt-place"> · MIT · chat-template</span>
      <span class="vt-date"> · 重磅推出 </span>
      <a
        target="_blank"
        class="vt-primary-action"
        href="https://chat.element-plus-x.com/chat"
      >
        在线预览
      </a>
    </p>
    <button @click="dismiss">
      <svg
        class="close"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <path
          d="M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z"
        />
      </svg>
    </button>
    <div class="glow glow--purple" />
    <div class="glow glow--blue" />
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vp-layout-top-height: 30px;
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: 1000;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-layout-top-height);
  line-height: var(--vp-layout-top-height);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .logo {
    width: 1rem;
    height: 1rem;
    margin-right: 4px;
  }
}

.glow.glow--purple {
  position: absolute;
  bottom: -15%;
  left: -75%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(270deg, #7a23a1, #715ebde6 60% 80%, #bd34fe00);
  filter: blur(15vw);
  transform: none;
  opacity: 0.6;
}

.glow.glow--blue {
  position: absolute;
  bottom: -15%;
  right: -40%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(180deg, #61d9ff, #0000);
  filter: blur(15vw);
  transform: none;
  opacity: 0.3;
}

@media (min-width: 768px) {
  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
  }
}

@media (min-width: 1025px) {
  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
  }
}

.banner-dismissed .banner {
  display: none;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 5px;
}

.close {
  width: 20px;
  height: 20px;
  fill: #fff;
  transform: rotate(45deg);
}

.vt-banner-text {
  color: #fff;
  font-size: 12px;
}

.vt-main {
  color: transparent;
  background-image: linear-gradient(120deg, #b047ff 16%, #9499ff, #9499ff);
  background-clip: text;
}

.vt-primary-action {
  background:
    radial-gradient(141.42% 141.42% at 100% 0%, #ffffff80, #fff0),
    radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00);
  color: #fff;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 10px;
  text-decoration: none;
  margin: 0 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 1px #fffc inset;
  }
}

@media (max-width: 1280px) {
  .banner .vt-banner-text {
    font-size: 14px;
  }

  .vt-tagline {
    display: none;
  }
}

@media (max-width: 780px) {
  .vt-tagline {
    display: none;
  }

  .vt-coupon {
    display: none;
  }

  .vt-primary-action {
    margin: 0 10px;
    padding: 4px 8px;
  }

  .vt-time-now {
    display: none;
  }
}

@media (max-width: 560px) {
  .vt-place {
    display: none;
  }
}
</style>
