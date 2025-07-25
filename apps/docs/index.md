---
pageClass: landing dark

layout: home
aside: false
editLink: false
markdownStyles: false
---

<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onBeforeMount(() => {
  router.go('/en/')
})
</script>
