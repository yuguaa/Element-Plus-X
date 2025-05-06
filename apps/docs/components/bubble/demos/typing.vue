<docs>
---
title: 打字效果
---

通过设置 `typing` 属性，开启打字效果。 更新 `content` 如果是之前的子集，则会继续输出，否则会重新输出。

::: info

🙊 当使用 `#content` 插槽，去自定义内容时。`typing` 属性将失效。如果你想让你的内容字符串，重新实现打字效果，可以与 `Typewriter 打字器` 组件 结合使用。

:::

::: tip

`typing` 属性接受一个对象，包含以下属性：
- `step`: 每次打字的吐字字符数，默认为 2
- `interval`: 打字间隔（毫秒），默认为 50
- `suffix`: 结尾字符，默认为 `|`

:::
</docs>

<script setup lang="ts">
const num = ref(1)
const content = computed(() => '🥰 感谢使用 Element-Plus-X ! 你的支持，是我们开源的最强动力 ~ '.repeat(num.value))
const avatarAI = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

function changeContent() {
  num.value++
  if (num.value > 3)
    num.value = 1
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <el-button style="width: fit-content;" @click="changeContent">
      设置 text
    </el-button>

    <Bubble :content="content" :typing="{ step: 1, interval: 100, suffix: '💩' }">
      <template #avatar>
        <el-avatar :src="avatarAI" />
      </template>
    </Bubble>
  </div>
</template>
