<docs>
---
title: Basic Usage
---

Pre-styled bubble list, quickly create a chat record through a simple `Array` of messages.

:::warning
You can pass properties to the built-in **`Bubble`** component through the **`item`** property. Set properties for each bubble. More flexible usage. For specific properties, please refer to the [Bubble](https://element-plus-x.com/components/bubble) component documentation.

All our message operations only need to maintain this array.

Including **`streaming message`** settings. Here we don't use interface streaming operations. In our template project, we go through real combat. You can use it as a reference.

👉 [Template Project Preview](https://chat.element-plus-x.com/chat)

👉 [Template Project Source Code](https://github.com/element-plus-x/ruoyi-element-ai) Welcome to star🥰
:::

You can also control the maximum height of the list through the `max-height` property.
</docs>

<script setup lang="ts">
import type {
  BubbleListItemProps,
  BubbleListProps
} from 'vue-element-plus-x/types/BubbleList';

type listType = BubbleListItemProps & {
  key: number;
  role: 'user' | 'ai';
};

// Example call
const list: BubbleListProps<listType>['list'] = generateFakeItems(5);

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user';
    const placement = role === 'ai' ? 'start' : 'end';
    const key = i + 1;
    const content =
      role === 'ai'
        ? '💖 Thank you for using Element Plus X ! Your support is our strongest motivation for open source ~'.repeat(
            5
          )
        : `Hahaha, let me try`;
    const loading = false;
    const shape = 'corner';
    const variant = role === 'ai' ? 'filled' : 'outlined';
    const isMarkdown = false;
    const typing = role === 'ai' ? i === count - 1 : false;
    const avatar =
      role === 'ai'
        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        : 'https://avatars.githubusercontent.com/u/76239030?v=4';

    messages.push({
      key, // Unique identifier
      role, // user | ai customize according to model definition
      placement, // start | end bubble position
      content, // Message content when streaming, just change this value
      loading, // Current bubble loading state
      shape, // Bubble shape
      variant, // Bubble style
      isMarkdown, // Whether to render as markdown
      typing, // Whether to enable typewriter effect, this property won't conflict with streaming
      isFog: role === 'ai', // Whether to enable typing fog effect, this effect is new in v1.1.6 and works when typing is true, this effect will override typing's suffix property
      avatar,
      avatarSize: '24px', // Avatar placeholder size
      avatarGap: '12px' // Distance between avatar and bubble
    });
  }
  return messages;
}
</script>

<template>
  <BubbleList :list="list" max-height="350px" />
</template>
