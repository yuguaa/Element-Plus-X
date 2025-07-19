# Bubble Chat Bubble 🔥

::: warning
`Version 1.1.6` inherits the typewriter fog property. Please update and try it in time

🐵 This friendly reminder was updated on: `2025-04-13`
:::

## Introduction

`Bubble` is a chat bubble component commonly used in chat scenarios. It can display conversation content, supports custom avatars, headers, content, and footers, and features typing effects and loading state display. The component has a built-in `Typewriter` component that can achieve text typing animation effects.

## Code Examples

### Basic Usage

<demo src="../../components/bubble/demos/content.vue"></demo>

### Avatar and Placement

<demo src="../../components/bubble/demos/avatar-and-placement.vue"></demo>

### Header and Footer

<demo src="../../components/bubble/demos/header-and-footer.vue"></demo>

### Loading State

<demo src="../../components/bubble/demos/loading.vue"></demo>

### Typewriter Configuration

<demo src="../../components/bubble/demos/typing.vue"></demo>

### Enable Markdown Rendering

<demo src="../../components/bubble/demos/is-markdown.vue"></demo>

### Inherit Typewriter Charts and MD Styles

<demo src="../../components/bubble/demos/cssAndMermaid.vue"></demo>

### Fog Effect

<demo src="../../components/bubble/demos/is-fog.vue"></demo>

### Custom Content

<demo src="../../components/bubble/demos/content-customize.vue"></demo>

### Variants and Shapes

<demo src="../../components/bubble/demos/variant-and-shape.vue"></demo>

### Control Typing

<demo src="../../components/bubble/demos/customized.vue"></demo>

## Properties

| <div style="width: 130px">Property</div> |       Type        | Default  | Description                                                                                                                                                                                                           |
| :--------------------------------------- | :---------------: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`                                |      String       |    ''    | Text content to display in the bubble                                                                                                                                                                                 |
| `placement`                              |      String       | 'start'  | Position of the bubble, options are `'start'` or `'end'`, representing left and right sides respectively.                                                                                                             |
| `avatar`                                 |      String       |    ''    | Image URL for the bubble avatar                                                                                                                                                                                       |
| `loading`                                |      Boolean      |  false   | Whether to show loading state. When `true`, the bubble will display a loading state.                                                                                                                                  |
| `shape`                                  |      String       |   null   | Shape of the bubble, options are `'round'` (rounded) or `'corner'` (angular).                                                                                                                                         |
| `variant`                                |      String       | 'filled' | Style variant of the bubble, options are `'filled'` (filled), `'borderless'` (no border), `'outlined'` (outline), `'shadow'` (shadow).                                                                                |
| `noStyle`                                |      Boolean      |  false   | Whether to remove styles, when `true`, will remove the built-in `padding` and `background color` of the bubble                                                                                                        |
| `isMarkdown`                             |      Boolean      |  false   | Whether to process `content` as Markdown format.                                                                                                                                                                      |
| `typing`                                 | Boolean \| Object |  false   | Whether to enable typing effect. If it's an object, you can set `step` (number of characters rendered each time) and `suffix` (typing cursor suffix content). `interval` represents the typing interval time in `ms`. |
| `maxWidth`                               |      String       | '500px'  | Maximum width of the bubble content.                                                                                                                                                                                  |
| `avatar-size`                            |      String       |    ''    | Set avatar placeholder size                                                                                                                                                                                           |
| `avatar-gap`                             |      String       |  '12px'  | Set the `gap` value between avatar and bubble                                                                                                                                                                         |
| `avatar-shape`                           |      String       |    ''    | Avatar shape, options are `'circle'` (circular) or `'square'` (square).                                                                                                                                               |
| `avatar-icon`                            |      String       |    ''    | Avatar icon, priority higher than `avatar`, supports passing icon names like `'user'`.                                                                                                                                |
| `avatar-src-set`                         |      String       |    ''    | Set avatar image srcset attribute                                                                                                                                                                                     |
| `avatar-alt`                             |      String       |    ''    | Set avatar image alt attribute                                                                                                                                                                                        |
| `avatar-fit`                             |      String       | 'cover'  | Set avatar image `object-fit` property, optional values: `'cover'`, `'contain'`, `'fill'`, `'none'`, `'scale-down'`                                                                                                   |

## Events

| Event Name     | Parameters     | Type     | Description                            |
| -------------- | -------------- | -------- | -------------------------------------- |
| `@start`       | `ref` instance | Function | Triggered when typing effect starts    |
| `@finish`      | `ref` instance | Function | Triggered when typing effect completes |
| `@writing`     | `ref` instance | Function | Triggered in real-time during typing   |
| `@avatarError` | `ref` instance | Function | Triggered when avatar loading fails    |

## Ref Instance Methods

| Property Name     | Type     | Description                                       |
| ----------------- | -------- | ------------------------------------------------- |
| `interrupt`       | Function | Interrupt typing.                                 |
| `continue`        | Function | Continue unfinished typing.                       |
| `restart`         | Function | Restart typing.                                   |
| `destroy`         | Function | Actively destroy Bubble component.                |
| `renderedContent` | String   | Get the content rendered by the typing component. |
| `isTyping`        | Boolean  | Whether currently typing.                         |
| `progress`        | Number   | Typing progress, range 0 - 100.                   |

## Slots

| Slot Name  | Parameters | Type | Description                                 |
| ---------- | ---------- | ---- | ------------------------------------------- |
| `#avatar`  | -          | Slot | Custom avatar display content               |
| `#header`  | -          | Slot | Custom bubble top display content           |
| `#content` | -          | Slot | Custom bubble display content               |
| `#loading` | -          | Slot | Custom bubble loading state display content |
| `#footer`  | -          | Slot | Custom bubble bottom display content        |

## Features

1. **Layout Direction** - Supports left alignment (`start`) and right alignment (`end`)
2. **Content Types** - Supports plain text, Markdown, custom slot content
3. **Loading State** - Built-in loading animation, supports custom loading content
4. **Visual Effects** - Provides multiple shapes and variants (rounded/angular, filled/outline/shadow, etc.)
5. **Typing Animation** - Supports progressive text output effects
6. **Flexible Slots** - Provides avatar, header, content, footer, loading state and other slots
