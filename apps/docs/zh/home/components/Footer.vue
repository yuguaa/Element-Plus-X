<script setup lang="ts">
import { ref } from 'vue';

const siteList = ref([
  {
    icon: null,
    name: '相关生态',
    sites: [
      {
        icon: null,
        name: 'hook-fetch',
        subName: '优雅请求库',
        url: 'https://jsonlee12138.github.io/hook-fetch/'
      },
      {
        icon: null,
        name: 'element-ui-x',
        subName: 'vue2 版本支持',
        url: 'https://element-ui-x.com/'
      },
      {
        icon: null,
        name: 'ChatArea',
        subName: '轻量级聊天框',
        url: 'https://jianfv.top/ChatAreaDoc/'
      }
    ]
  },
  {
    icon: null,
    name: '社区',
    sites: [
      {
        icon: '/sq/wx.png',
        name: '微信交流群',
        subName: '二维码',
        url: 'https://element-plus-x.com/introduce.html'
      },
      {
        icon: '/sq/qq.png',
        name: 'QQ频道',
        subName: '二维码',
        url: 'https://pro.ant.design'
      },
      {
        icon: '/sq/bsky.png',
        name: 'bsky',
        subName: null,
        url: 'https://bsky.app/profile'
      },
      {
        icon: '/sq/x.png',
        name: 'x',
        subName: null,
        url: 'https://x.com/'
      },
      {
        icon: '/sq/discord.png',
        name: 'discord',
        subName: null,
        url: 'https://discord.com/'
      }
    ]
  },
  {
    icon: null,
    name: '帮助',
    sites: [
      {
        icon: 'https://github.githubassets.com/assets/apple-touch-icon-144x144-b882e354c005.png',
        name: 'gihub',
        subName: null,
        url: 'https://github.com/element-plus-x/Element-Plus-X'
      },
      {
        icon: 'https://element-plus-x.com/logo.png',
        name: '更新日志',
        subName: null,
        url: 'https://element-plus-x.com/update-log.html'
      }
    ]
  },
  {
    icon: null,
    name: '更多产品',
    sites: [
      {
        icon: null,
        name: 'ruoyi-element-ai',
        subName: '仿豆包 模版项目',
        url: 'https://github.com/element-plus-x/ruoyi-element-ai'
      }
    ]
  }
]);
</script>

<template>
  <!-- Footer -->
  <footer class="linear-footer py-12">
    <section
      class="site-container max-w-6xl mx-auto px-8 flex justify-between gap-12 flex-wrap"
    >
      <div
        v-for="siteItem in siteList"
        :key="siteItem.name"
        class="site-list flex-1 min-w-[235px]"
      >
        <div
          class="site-list-title text-white/80 text-lg font-bold mb-4 flex items-center"
        >
          <img
            v-if="siteItem.icon"
            class="w-4 h-4 mr-2"
            :src="siteItem.icon"
            alt=""
          />
          <span>{{ siteItem.name }}</span>
        </div>
        <div class="site-list-content flex flex-wrap gap-4 flex-col">
          <a
            v-for="site in siteItem.sites"
            :key="site.name"
            target="_blank"
            :href="site.url"
            class="site-list-item text-white/60 text-sm flex items-center gap-2"
          >
            <img v-if="site.icon" class="w-4 h-4" :src="site.icon" alt="" />
            <span>
              <span>{{ site.name }}</span>
              <span v-if="site.subName" class="text-white/40 text-xs">
                - {{ site.subName }}</span
              >
            </span>
          </a>
        </div>
      </div>
    </section>
    <section
      class="copyright-container pt-8 max-w-6xl mx-auto px-8 flex justify-between items-center mt-12"
      style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
    >
      <div
        class="copyright-text w-full text-white/60 text-sm flex gap-3 items-center flex-col justify-center"
      >
        <span class="text-center text-sm text-white/40"
          >Released under the MIT License.</span
        >
        <span class="text-center text-base">
          Copyright © Element-Plus-X
          {{ new Date().getFullYear() }}&nbsp;&nbsp;<a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            >赣ICP备2025057058号-1</a
          >
        </span>
      </div>
    </section>
  </footer>
</template>

<style scoped lang="less">
.linear-footer {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(59, 130, 246, 0.08) 50%,
    rgba(99, 102, 241, 0.08) 100%
  );
}
</style>
