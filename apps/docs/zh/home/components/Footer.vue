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
        subName: null,
        url: 'https://ant.design'
      },
      {
        icon: null,
        name: 'Ant Design Pro',
        subName: null,
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
        subName: null,
        url: 'https://ant.design'
      },
      {
        icon: null,
        name: 'Ant Design Pro',
        subName: null,
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
        subName: null,
        url: 'https://ant.design'
      },
      {
        icon: 'https://automation.vuejs.org/images/daman_game.png',
        name: 'Ant Design Pro',
        subName: null,
        url: 'https://pro.ant.design'
      }
    ]
  },
  {
    icon: 'https://automation.vuejs.org/images/daman_game.png',
    name: '更多产品',
    sites: [
      {
        icon: 'https://automation.vuejs.org/images/daman_game.png',
        name: '语雀',
        subName: '构建你的数字花园',
        url: 'https://ant.design'
      },
      {
        icon: 'https://automation.vuejs.org/images/daman_game.png',
        name: 'AntV',
        subName: '数据可视化解决方案',
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
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(59, 130, 246, 0.08) 50%,
    rgba(99, 102, 241, 0.08) 100%
  );
}
</style>
