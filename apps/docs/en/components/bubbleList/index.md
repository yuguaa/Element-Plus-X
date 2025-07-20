# BubbleList Chat Bubble List 🍅

::: warning
`Version 1.1.6` inherits the typewriter's **fog** effect. Added **scroll to bottom button, similar to `Douyin`🔥**. Added **mouse hover to show scrollbar** for enhanced interaction experience. Please update to try it out.

🐵 Last updated: `2025-04-13`
:::

::: tip
Also: In the new version, auto-scroll occurs when the `list` length changes. However, after scrolling up, you need to manually call the `scrollToBottom` method to re-enable auto-scroll. Or, auto-scroll will be re-triggered when the scrollbar reaches the bottom.

Same logic as before, no need to worry about the upgrade.
:::

## Introduction

`BubbleList` depends on the `Bubble` component and is used to display a group of chat bubbles. The component supports setting `list maximum height` and features `auto-scroll` functionality. Additionally, it provides various `scroll control` methods that users can easily call, offering powerful performance without any development concerns.

## Code Demo

### Basic Usage

<demo src="./demos/list.vue"></demo>

### Custom List

<demo src="./demos/customized.vue"></demo>

### Auto Scroll and Scroll to Specific Position

<demo src="./demos/scroll-to.vue"></demo>

### Back to Top Button

<demo src="./demos/back-button.vue"></demo>

### Scroll Complete Event

::: warning
Only used in extremely special cases, not suitable for streaming output as it will quickly trigger typing completion events.
:::

<demo src="./demos/on-complete.vue"></demo>

## Properties

| Property Name         | Type                                           | <div style="width: 70px">Required</div> | Default                                        | Description                                                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------- | --------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`                | Array                                          | Yes                                     | None                                           | Array containing bubble information, each element is an object with `Bubble` properties like `content`, `placement`, `loading`, `shape`, `variant`, `isMarkdown`, `typing`, etc., used to configure each bubble's display content and style. |
| `maxHeight`           | String                                         | No                                      | '500px'                                        | Maximum height of the bubble list container, will show vertical scrollbar when exceeded.                                                                                                                                                     |
| `alwaysShowScrollbar` | Boolean                                        | No                                      | false                                          | Whether to always show scrollbar, default is `false`.                                                                                                                                                                                        |
| `backButtonThreshold` | Number                                         | No                                      | 80                                             | Scrollbar display threshold, will show scrollbar when distance to bottom is less than this value.                                                                                                                                            |
| `showBackButton`      | Boolean                                        | No                                      | true                                           | Whether to show back to top button, default is `true`.                                                                                                                                                                                       |
| `backButtonPosition`  | `{ bottom: '20px', left: 'calc(50% - 19px)' }` | No                                      | `{ bottom: '20px', left: 'calc(50% - 19px)' }` | Position of back to top button, default is centered at bottom.                                                                                                                                                                               |
| `btnLoading`          | Boolean                                        | No                                      | true                                           | Whether to enable loading state for back to top button, default is `true`.                                                                                                                                                                   |
| `btnColor`            | String                                         | No                                      | '#409EFF'                                      | Color of back to top button, default is `'#409EFF'`.                                                                                                                                                                                         |
| `btnIconSize`         | Number                                         | No                                      | 24                                             | Icon size of back to top button, default is 24px.                                                                                                                                                                                            |
| `triggerIndices`      | 'only-last' \| 'all' \| number[]               | No                                      | 'only-last'                                    | Array of bubble `indices` that trigger scroll complete event, default is `'only-last'`.                                                                                                                                                      |

## Events

| Event Name  | Parameters        | Type     | Description                                               |
| ----------- | ----------------- | -------- | --------------------------------------------------------- |
| `@complete` | (instance, index) | Function | Event triggered when typing effect of a bubble completes. |

## Ref Instance Methods

| Property Name    | Type     | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| `scrollToTop`    | Function | Scroll to top.                             |
| `scrollToBottom` | Function | Scroll to bottom.                          |
| `scrollToBubble` | Function | Scroll to specified bubble index position. |

## Slots

| Slot Name  | Parameters | Type | Description                                 |
| ---------- | ---------- | ---- | ------------------------------------------- |
| `#avatar`  | -          | Slot | Custom avatar display content               |
| `#header`  | -          | Slot | Custom bubble top display content           |
| `#content` | -          | Slot | Custom bubble display content               |
| `#loading` | -          | Slot | Custom bubble loading state display content |
| `#footer`  | -          | Slot | Custom bubble bottom content                |

## Features

1. **Smart Scrolling** - Automatically tracks latest message position
2. **Deep Customization** - Complete bubble component slot pass-through
3. **Multiple Scroll Methods** - Scroll to top, bottom, or specified position
4. **Typing Effect** - Supports typing effect
5. **Multiple Styles** - Supports various styles like round, square, etc.
