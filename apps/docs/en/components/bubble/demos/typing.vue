<docs>
---
title: Typing Effect
---

Enable typing effect by setting the `typing` property. When updating `content`, if it's a subset of the previous content, it will continue outputting, otherwise it will restart.

::: info

🙊 When using `#content` slot to customize content, the `typing` property will be disabled. If you want to re-implement typing effect for your content string, you can combine it with the `Typewriter` component.

:::

::: tip

The `typing` property accepts an object with the following properties:
- `step`: Number of characters typed each time, default is 2
- `interval`: Typing interval (milliseconds), default is 50
- `suffix`: Ending character, default is `|`

:::
</docs>

<script setup lang="ts">
const num = ref(1);
const content = computed(() =>
  '🥰 Thank you for using Element-Plus-X ! Your support is our strongest motivation for open source ~ '.repeat(
    num.value
  )
);
const avatarAI =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

function changeContent() {
  num.value++;
  if (num.value > 3)
    num.value = 1;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-button style="width: fit-content" @click="changeContent">
      Set text
    </el-button>

    <Bubble
      :content="content"
      :typing="{ step: 1, interval: 100, suffix: '💩' }"
    >
      <template #avatar>
        <el-avatar :src="avatarAI" />
      </template>
    </Bubble>
  </div>
</template>
