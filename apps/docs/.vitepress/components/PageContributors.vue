<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, onMounted } from 'vue';

const { page, lang } = useData();
const contributorTitle  = computed(() => {
    return lang.value === 'zh-CN' ? '文档贡献者' : 'Contributors';
});
console.log(page.value, '----');

const getContributors = () => {
  
}

onMounted(() => {
  getContributors();
})


</script>

<template>
  <div>
    <div class="page-contributors-title">
        {{ contributorTitle }}
    </div>
    <div class="page-contributors-list">
        
    </div>
  </div>
</template>

<style scoped>
.page-contributors-title {
    font-size: 12px;
    opacity: 0.5;
    margin-bottom: 8px;
}
</style>
    