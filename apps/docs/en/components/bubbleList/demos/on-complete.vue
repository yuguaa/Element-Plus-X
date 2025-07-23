<docs>
---
title: complete Event and trigger-indices Property
---

🍉This property is rarely used, please use it judiciously for more fine-grained control over your bubble's `completion events` in the list.

You can trigger the list through the `@complete` event, which calls back when each typing `Bubble` component `completes typing`.
`@complete` returns two parameters: `instance` is the typewriter component instance and `index` is the index of `BubbleListItem`.

::: tip
- The `@complete` event will only trigger callback events for `Bubble components` with `typing` property set to `true`.
- If you configure multiple bubbles with `typing` property in the list, the list by default only handles the `@complete` event of the last bubble with `typing` set to `true`.
:::

::: info
- If you need to handle completion callback events for multiple bubbles with `typing` set to `true`, you can specify the indices of bubbles to handle through the `triggerIndices` property. It's of type `'only-last' | 'all' | number[]`.
- Default is `'only-last'`, only executes the `@complete` event of the last bubble with `typing` set to `true`.
- `'all'` means execute `@complete` events for all bubbles with `typing` set to `true`. `@complete` will be executed multiple times.
- `number[]` sets the indices of `BubbleListItem` you want to monitor. The component will automatically filter `invalid indices` and output `console.warn`
:::
</docs>

<script setup lang="ts">
import type {
  BubbleListItemProps,
  BubbleListProps
} from 'vue-element-plus-x/types/BubbleList';
import type { TypewriterInstance } from 'vue-element-plus-x/types/Typewriter';

type listType = BubbleListItemProps & {
  key: number;
  role: 'user' | 'ai';
};

// Example call
const list = ref<BubbleListProps<listType>['list']>(generateFakeItems(0));

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user';
    const placement = role === 'ai' ? 'start' : 'end';
    const key = i + 1;
    const content =
      role === 'ai'
        ? '💖 Thank you for using Element Plus X ! Your support is our strongest motivation for open source ~'
        : `Hahaha, let me try`;
    const loading = false;
    const shape = 'corner';
    const variant = role === 'ai' ? 'filled' : 'outlined';
    const isMarkdown = false;
    const typing = role === 'ai';
    const avatar =
      role === 'ai'
        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        : 'https://avatars.githubusercontent.com/u/76239030?v=4';

    messages.push({
      key,
      role,
      placement,
      content,
      loading,
      shape,
      variant,
      isMarkdown,
      typing,
      avatar,
      avatarSize: '24px'
    });
  }
  return messages;
}

function onComplete(instance: TypewriterInstance, index: number) {
  console.log('@complete', instance, index);
}

const triggerIndices = ref<BubbleListProps['triggerIndices']>('only-last');

function changeTriggerIndices(type: 'only-last' | 'all' | number[]) {
  triggerIndices.value = type;
  // Regenerate list data
  list.value = [];
  nextTick(() => {
    list.value = generateFakeItems(7);
  });
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; align-items: center">
      <span style="margin-right: 12px">trigger-indices: </span>
      <el-button
        style="width: fit-content"
        @click="changeTriggerIndices('only-last')"
      >
        only-last
      </el-button>
      <el-button
        style="width: fit-content"
        type="primary"
        @click="changeTriggerIndices('all')"
      >
        all
      </el-button>
      <el-button
        style="width: fit-content"
        type="success"
        @click="changeTriggerIndices([1, 2, 3])"
      >
        [1, 2, 3]
      </el-button>
    </div>

    <BubbleList
      :list="list"
      max-height="350px"
      :trigger-indices="triggerIndices"
      @complete="onComplete"
    />
  </div>
</template>
