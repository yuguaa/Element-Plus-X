<script setup lang="ts">
const props = defineProps<{
  toggleExpand: (ev: MouseEvent) => void;
}>();
</script>

<template>
  <div @click="(ev: MouseEvent) => props.toggleExpand(ev)">组件插槽</div>
</template>

<style scoped lang="scss"></style>
