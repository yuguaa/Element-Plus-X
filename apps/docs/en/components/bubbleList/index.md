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

`BubbleList` depends on the `Bubble` component and is used to display a group of chat bubbles. The component supports setting `maximum list height` and has `auto-scroll` functionality. It also provides multiple `scroll control` methods that `users` can easily call, with powerful performance and no development burden.

## Code Examples

### Basic Usage

<demo src="./demos/list.vue"></demo>

### Custom List

<demo src="./demos/customized.vue"></demo>

### Auto Scroll, Specify Scroll Position

<demo src="./demos/scroll-to.vue"></demo>

### Back to Top Button

<demo src="./demos/back-button.vue"></demo>

### Scroll Complete Event

::: warning
Only used in extreme special cases, not applicable in streaming output, will quickly trigger typing end events.
:::

<demo src="./demos/on-complete.vue"></demo>

## Properties

| Property Name         | Type                                           | <div style="width: 70px">Required</div> | Default                                        | Description                                                                                                                                                                     |
| --------------------- | ---------------------------------------------- | --------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`                | Array                                          | Yes                                     | None                                           | Array containing bubble information, each element is an object containing `content`, `placement`, `loading`, `shape`, `variant`, `isMarkdown`, `typing` and other `Bubble` properties to configure the display content and style of each bubble. |
| `maxHeight`           | String                                         | No                                      | '500px'                                        | Maximum height of the bubble list container, vertical scrollbar will appear when exceeded.                                                                                      |
| `alwaysShowScrollbar` | Boolean                                        | No                                      | false                                          | Whether to always show scrollbar, default is `false`.                                                                                                                           |
| `backButtonThreshold` | Number                                         | No                                      | 80                                             | Scrollbar display threshold, when scrollbar distance from bottom is less than this value, scrollbar will be shown.                                                              |
| `showBackButton`      | Boolean                                        | No                                      | true                                           | Whether to show back to top button, default is `true`.                                                                                                                          |
| `backButtonPosition`  | `{ bottom: '20px', left: 'calc(50% - 19px)' }` | No                                      | `{ bottom: '20px', left: 'calc(50% - 19px)' }` | Position of back to top button, default bottom center display.                                                                                                                  |
| `btnLoading`          | Boolean                                        | No                                      | true                                           | Whether to enable back to top button loading state, default is `true`.                                                                                                          |
| `btnColor`            | String                                         | No                                      | '#409EFF'                                      | Color of back to top button, default is `'#409EFF'`.                                                                                                                            |
| `btnIconSize`         | Number                                         | No                                      | 24                                             | Icon size of back to top button, default is 24px.                                                                                                                               |
| `triggerIndices`      | 'only-last' \| 'all' \| number[]               | No                                      | 'only-last'                                    | Bubble `index array` that triggers `complete` event, default is `'only-last'`.                                                                                                   |

## Events

| Event Name  | Parameters        | Type     | Description                                   |
| ----------- | ----------------- | -------- | ---------------------------------------------- |
| `@complete` | (instance, index) | Function | Event triggered when typing effect of a bubble completes. |

## Ref Instance Methods

| Property Name    | Type     | Description                     |
| ---------------- | -------- | -------------------------------- |
| `scrollToTop`    | Function | Scroll to top.                   |
| `scrollToBottom` | Function | Scroll to bottom.                |
| `scrollToBubble` | Function | Scroll to specified bubble index position. |

## Slots

| Slot Name | Parameters | Type | Description                       |
| --------- | ---------- | ---- | --------------------------------- |
| `#avatar` | -          | Slot | Custom avatar display content     |
| `#header` | -          | Slot | Custom bubble top display content |
| `#content`| -          | Slot | Custom bubble display content     |
| `#loading`| -          | Slot | Custom bubble loading state display content |
| `#footer` | -          | Slot | Custom bubble bottom content     |

## Features

1. **Smart Scrolling** - Automatically tracks latest message position
2. **Deep Customization** - Complete bubble component slot passthrough
3. **Multiple Scroll Methods** - Scroll to top, bottom, specified position
4. **Typing Effects** - Supports typing effects
5. **Multiple Styles** - Supports multiple styles like round, square, etc.
