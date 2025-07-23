<script setup lang="ts">
import { ref } from 'vue';

const siteList = ref([
  {
    icon: null,
    name: '相关资源',
    sites: [
      {
        icon: null,
        name: 'Ant Design',
        url: 'https://ant.design'
      },
      {
        icon: null,
        name: 'Ant Design Pro',
        url: 'https://pro.ant.design'
      }
    ]
  },
  {
    icon: null,
    name: '社区',
    sites: [
      {
        icon: null,
        name: 'Ant Design',
        url: 'https://ant.design'
      },
      {
        icon: null,
        name: 'Ant Design Pro',
        url: 'https://pro.ant.design'
      }
    ]
  },
  {
    icon: 'https://automation.vuejs.org/images/daman_game.png',
    name: '帮助',
    sites: [
      {
        icon: 'https://automation.vuejs.org/images/daman_game.png',
        name: 'Ant Design',
        url: 'https://ant.design'
      },
      {
        icon: 'https://automation.vuejs.org/images/daman_game.png',
        name: 'Ant Design Pro',
        url: 'https://pro.ant.design'
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
        class="site-list flex-1 min-w-[320px]"
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
            <span>{{ site.name }}</span>
          </a>
        </div>
      </div>
    </section>
    <section
      class="copyright-container pt-8 max-w-6xl mx-auto px-8 flex justify-between items-center mt-12"
      style="border-top: 1px solid #26282f"
    >
      <div
        class="copyright-text w-full text-white/60 text-sm flex gap-3 items-center flex-col justify-center"
      >
        <span class="text-center text-sm text-white/40">Copyright © 2025</span>
        <span class="text-center text-base"
          >蚂蚁集团和 Ant Design 开源社区</span
        >
      </div>
    </section>
  </footer>
</template>

<style scoped lang="less">
.linear-footer {
  background-color: #14161c;
}
</style>
