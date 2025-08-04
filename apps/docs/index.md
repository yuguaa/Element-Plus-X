---
pageClass: landing dark

layout: home
aside: false
editLink: false
markdownStyles: false
---

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onBeforeMount(() => {
  router.go('/zh/')
})
</script>
