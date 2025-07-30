<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import _contributors from 'element-plus-x-metadata/dist/component-contributors.json';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

const { page, lang } = useData();
const contributorTitle = computed(() => {
  return lang.value === 'zh-CN' ? '贡献者' : 'Contributors';
});

const isComponentPage = computed(() => {
  return page.value.filePath.includes('components');
});

const contributors = computed<Contributor[]>(() => {
  const filePath = page.value.filePath;
  const paths = filePath.split('/');
  const componentName = paths[paths.length - 2].toLowerCase();
  const contributors = _contributors[componentName as keyof typeof _contributors] as Contributor[];
  return contributors;
});

// 处理图片加载错误
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = `https://ui-avatars.com/api/?name=${img.alt}&background=6366f1&color=fff&size=64`;
}
</script>

<template>
  <div v-if="isComponentPage && contributors.length">
    <div class="page-contributors-title">
      {{ contributorTitle }}
    </div>
    <div class="page-contributors-list">
      <a v-for="contributor in contributors" :key="contributor.login" class="page-contributors-item"
        :href="contributor.html_url" target="_blank">
        <el-tooltip :content="contributor.login" placement="top-start">
          <el-avatar :size="24" :src="contributor.avatar_url" :alt="contributor.login" @error="handleImageError" />
        </el-tooltip>
      </a>
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