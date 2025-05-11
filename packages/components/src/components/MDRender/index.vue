<!-- md 渲染器组件 -->
<script setup lang="ts">
import type { MdrendererProps } from './types.d.ts'

const props = withDefaults(defineProps<MdrendererProps>(), {
  classNamePrefix: 'elx-md-renderer',
})

console.log(props)
</script>

<template>
  <div
    class="elx-md-renderer"
    :class="[
      `${props.classNamePrefix ? `${props.classNamePrefix}-container` : ''}`,
    ]"
  >
    md 渲染器组件
  </div>
</template>

<style scoped lang='scss'>

</style>
