<docs>
---
title: Basic Usage
---

Pre-styled bubble list, quickly create a chat history through a simple message `Array`.

:::warning
You can pass properties to the built-in **`Bubble`** component through the **`item`** property to set properties for each bubble. For more flexible usage. For specific properties, visit the [Bubble](https://element-plus-x.com/components/bubble) component documentation.

All our message operations only need to maintain this array.

Including **`streaming message`** settings. We haven't used interface streaming operations here. In our template project, we have practical implementation. You can use it as a reference.

👉 [Template Project Preview](https://chat.element-plus-x.com/chat)

👉 [Template Project Source Code](https://github.com/element-plus-x/ruoyi-element-ai) Welcome to star🥰
:::

You can also control the list's maximum height through the `max-height` property.
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
        ? '💖 Thank you for using Element Plus X! Your support is our strongest motivation for open source ~'.repeat(
            5
          )
        : `Haha, let me try`;
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
      key, // unique identifier
      role, // user | ai define according to your model
      placement, // start | end bubble position
      content, // message content, when receiving stream, just need to change this value
      loading, // current bubble's loading state
      shape, // bubble shape
      variant, // bubble style
      isMarkdown, // whether to render as markdown
      typing, // whether to enable typewriter effect, this property won't conflict with stream receiving
      isFog: role === 'ai', // whether to enable typewriter fog effect, this effect added in v1.1.6, and takes effect when typing is true, this effect will override typing's suffix property
      avatar,
      avatarSize: '24px', // avatar placeholder size
      avatarGap: '12px' // distance between avatar and bubble
    });
  }
  return messages;
}
</script>

<template>
  <BubbleList :list="list" max-height="350px" />
</template>
