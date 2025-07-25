<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import _contributors from 'element-plus-x-metadata/dist/component-contributors.json'
console.log(_contributors, '----');


const { page, lang } = useData();
const contributorTitle = computed(() => {
  return lang.value === 'zh-CN' ? '文档贡献者' : 'Contributors';
});

const isComponentPage = computed(() => {
  return page.value.filePath.includes('components');
})

const contributors = computed(() => {
  const filePath = page.value.filePath;
  const paths = filePath.split('/');
  const componentName = paths[paths.length - 2].toLowerCase();
  const contributors = _contributors[componentName as keyof typeof _contributors];
  return contributors;
})






</script>

<template>
  <div v-if="isComponentPage">
    <div class="page-contributors-title">
      {{ contributorTitle }}
    </div>
    <div class="page-contributors-list">
      <div v-for="contributor in contributors" :key="contributor.login" class="page-contributors-item">
        <el-tooltip :content="contributor.login" placement="top-start">
          <el-avatar :size="24" :src="contributor.avatar" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-contributors-title {
  font-size: 12px;
  opacity: 0.5;
  margin-bottom: 8px;
}

.page-contributors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 8px;
}

.page-contributors-item {
  cursor: pointer;
}
</style>