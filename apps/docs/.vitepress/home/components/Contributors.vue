<script setup lang="ts">
import { Loading, Warning } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const contributors = ref<Contributor[]>([]);
const loading = ref(true);
const error = ref('');

// 获取贡献者数据
async function fetchContributors() {
  try {
    loading.value = true;
    error.value = '';

    const response = await fetch(
      'https://api.github.com/repos/element-plus-x/Element-Plus-X/contributors?per_page=100'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // 按贡献数量排序
    contributors.value = data.sort(
      (a: Contributor, b: Contributor) => b.contributions - a.contributions
    );
  } catch (err) {
    console.error('Failed to fetch contributors:', err);
    error.value = 'Failed to load contributors. Please try again later.';
  } finally {
    loading.value = false;
  }
}

// 重试功能
function retry() {
  fetchContributors();
}

// 组件挂载时获取数据
onMounted(() => {
  fetchContributors();
});
</script>

<template>
  <div class="p-5">
    <!-- Loading State -->
    <div v-if="loading" class="flex-center gap-2 py-10 text-gray-500">
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
      <span>Loading contributors...</span>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex-center flex-col gap-2 py-10 text-red-500"
    >
      <el-icon>
        <Warning />
      </el-icon>
      <div class="flex-center flex-col gap-3">
        <span>{{ error }}</span>
        <el-button type="primary" size="small" @click="retry">
          Retry
        </el-button>
      </div>
    </div>

    <!-- Contributors Content -->
    <div v-else class="w-full flex flex-col items-center p4">
      <h2 class="text-2xl font-bold mb-4">由社区构建</h2>
      <!-- Header with count -->
      <div class="text-center mb-4">
        <span class="text-sm text-gray-500"
          >{{ contributors.length }} contributors</span
        >
      </div>

      <!-- Contributors Grid -->
      <div class="flex flex-wrap gap-3 justify-center">
        <el-tooltip
          v-for="contributor in contributors"
          :key="contributor.login"
          :content="`${contributor.login} (${contributor.contributions} contributions)`"
          placement="top"
          effect="dark"
        >
          <a
            :href="contributor.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="block transition-all duration-300 ease-in-out rounded-full overflow-hidden hover:transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <img
              :src="contributor.avatar_url"
              :alt="contributor.login"
              class="w-15 h-15 rounded-full transition-all duration-300 ease-in-out grayscale border-2 border-transparent hover:grayscale-0 hover:border-blue-500 md:w-12 md:h-12 sm:w-10 sm:h-10"
              loading="lazy"
            />
          </a>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
