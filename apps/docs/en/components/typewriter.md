# Typewriter ✍

::: warning
**`XMarkdown Component`** has been released and can be used in combination with the `Typewriter Component`. Please upgrade to `beta 1.2.2` version.
:::

::: info
`v1.2.0 version` provides simple solutions for **style override**, **chart rendering**, and **custom code highlighting styles, custom plugins**

First, we added `prismjs` official CSS style files to the component library, which can be directly imported in projects to solve **md code block highlighting** issues.

Second, we added `Mermaid.js` to the component library. Used to solve simple **chart** rendering issues for `mermaid format`.

Third, we exposed the **code highlighting methods** and **plugins** built into `markdown-it`. Making it easier for developers to better integrate third-party ecosystem **styles** and **plugins**

🐵 This friendly reminder was updated on: `2025-07-06`
:::

## Introduction

`Typewriter` is a highly customizable `typewriter component`, inspired by the `ant-design-x` official `bubble component` case, extracting the typing method. Supports Markdown rendering and dynamic typing effects.

## Code Examples

### Basic Usage

<demo src="../../components/typewriter/demos/content.vue"></demo>

### Markdown Rendering

<demo src="../../components/typewriter/demos/isMarkdown.vue"></demo>

### MD-Code Block Highlighting (v1.2.0 new)

Provides a built-in style

<demo src="../../components/typewriter/demos/newMarkDown.vue"></demo>

### MD-Plugin Mode (v1.2.0 new)

If you think the built-in styles don't look good or the built-in plugins can't meet your needs, you can customize **styles** and **plugins** through plugin mode.

<demo src="../../components/typewriter/demos/mermaid.vue"></demo>

### Enable Typing Effect

<demo src="../../components/typewriter/demos/typing.vue"></demo>

### Typewriter Fog Effect

<demo src="../../components/typewriter/demos/isFog.vue"></demo>

### Dynamic Content Updates

<demo src="../../components/typewriter/demos/updates.vue"></demo>

### Control Typing

<demo src="../../components/typewriter/demos/customized.vue"></demo>

## Properties

| Property Name     | Type                                                               | Required | Default | Description                                                               |
| ----------------- | ------------------------------------------------------------------ | -------- | ------- | ------------------------------------------------------------------------- |
| `content`         | String                                                             | No       | `''`    | Text content to display, supports plain text or Markdown format.          |
| `isMarkdown`      | Boolean                                                            | No       | `false` | Whether to enable Markdown rendering mode.                                |
| `typing`          | Boolean \| `{ step?: number, interval?: number, suffix?: string }` | No       | `false` | Whether to enable typewriter effect.                                      |
| `typing.step`     | Number                                                             | No       | `2`     | How many characters to output each time typing.                           |
| `typing.interval` | Number                                                             | No       | `50`    | Interval time for each typing, unit (`ms`).                               |
| `typing.suffix`   | String                                                             | No       | `'\|'`  | Typewriter suffix cursor character (only effective in non-Markdown mode). |
| `isFog`           | Boolean \| `{ bgColor?: string, width?: string }`                  | No       | `false` | Whether to enable fog effect, can set background color and width.         |

## Events

| Event Name | Parameters     | Type     | Description                                 |
| ---------- | -------------- | -------- | ------------------------------------------- |
| `@start`   | `ref` instance | Function | Triggered when typing effect starts         |
| `@finish`  | `ref` instance | Function | Triggered when typing effect completes      |
| `@writing` | `ref` instance | Function | Continuously triggered during typing effect |

## Ref Instance Methods

| Property Name     | Type     | Description                                   |
| ----------------- | -------- | --------------------------------------------- |
| `interrupt`       | Function | Interrupt typing.                             |
| `continue`        | Function | Continue unfinished typing.                   |
| `restart`         | Function | Restart typing.                               |
| `destroy`         | Function | Actively destroy typewriter component.        |
| `renderedContent` | String   | Get content rendered by typewriter component. |
| `isTyping`        | Boolean  | Whether currently typing.                     |
| `progress`        | Number   | Typing progress, range 0 - 100.               |

## Features

1. **Markdown Support**: Supports rendering Markdown format text and applies GitHub-style styles.
2. **Dynamic Typing Effect**: Can simulate typewriter effect, gradually displaying text content.
3. **Code Highlighting**: Built-in Prism.js, supports syntax highlighting for code blocks.
4. **XSS Security**: Uses DOMPurify to filter HTML content, preventing XSS attacks.
5. **Flexible Configuration**: Supports custom typing speed, cursor character, suffix, and other parameters.
6. **Customizable Development**: Supports customized development based on component typing state.
