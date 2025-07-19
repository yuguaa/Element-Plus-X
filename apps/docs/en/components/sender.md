# Sender Input Box 💭

::: warning
`Version 1.1.6` new features:

- Variant **`up-down structure`**
- Custom bottom `#footer` slot
- Custom command `popup` and `callback events` for triggering commands

🐵 This friendly reminder was updated on: `2025-04-16`
:::

## Introduction

`Sender` is an input box component for chat. It has rich interactive functions and custom features. It supports voice input, clearing input content, multiple submission methods, and allows users to customize header, prefix, and action list content. At the same time, the component provides focus control, submission callbacks, and other functions to meet diverse input scenario requirements.

## Code Examples

### Basic Usage

<demo src="../../components/sender/demos/basic.vue"></demo>

### Placeholder

<demo src="../../components/sender/demos/placeholder.vue"></demo>

### Two-way Binding (Unbound, value won't change)

<demo src="../../components/sender/demos/v-model.vue"></demo>

### Submit Button Disabled State

<demo src="../../components/sender/demos/submit-btn-disabled.vue"></demo>

### Custom Max and Min Rows

<demo src="../../components/sender/demos/autosize.vue"></demo>

### Input Box Various States

<demo src="../../components/sender/demos/state.vue"></demo>

### Submit Method

<demo src="../../components/sender/demos/submit-type.vue"></demo>

### Speech Recognition

::: warning
Browser built-in speech recognition API, you can use the component library's built-in [`useRecord`](https://element-plus-x.com/components/useRecord/) **hooks** for more convenient built-in speech recognition integration and control
:::

<demo src="../../components/sender/demos/allow-speech.vue"></demo>

### Variant - Vertical Style

<demo src="../../components/sender/demos/variant.vue"></demo>

### Custom Action List

<demo src="../../components/sender/demos/action-list.vue"></demo>

### Custom Prefix

<demo src="../../components/sender/demos/prefix.vue"></demo>

### Custom Header

<demo src="../../components/sender/demos/header.vue"></demo>

### Custom Footer

<demo src="../../components/sender/demos/footer.vue"></demo>

### Custom Input Box Style

<demo src="../../components/sender/demos/input-style.vue"></demo>

### Trigger Commands

<demo src="../../components/sender/demos/trigger.vue"></demo>

### Custom Command Popup

<demo src="../../components/sender/demos/trigger-popover.vue"></demo>

### Input Box Focus Control

<demo src="../../components/sender/demos/focus.vue"></demo>

## Properties

| Property Name             | Type                 | Required | Default                    | Description                                                                                                                                                                                                                             |
| ------------------------- | -------------------- | -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v-model`                 | String               | No       | ''                         | Input box binding value, use `v-model` for two-way binding.                                                                                                                                                                             |
| `placeholder`             | String               | No       | ''                         | Input box placeholder text.                                                                                                                                                                                                             |
| `auto-size`               | Object               | No       | \{ minRows:1, maxRows:6 \} | Set minimum and maximum display rows for input box.                                                                                                                                                                                     |
| `read-only`               | Boolean              | No       | false                      | Whether input box is in read-only state.                                                                                                                                                                                                |
| `disabled`                | Boolean              | No       | false                      | Whether input box is in disabled state.                                                                                                                                                                                                 |
| `submitBtnDisabled`       | Boolean \| undefined | No       | undefined                  | Built-in send button disabled state. (Note usage scenarios)                                                                                                                                                                             |
| `loading`                 | Boolean              | No       | false                      | Whether to show loading state. When `true`, input box will show loading animation.                                                                                                                                                      |
| `clearable`               | Boolean              | No       | false                      | Whether input box content can be cleared. Shows default clear button                                                                                                                                                                    |
| `allowSpeech`             | Boolean              | No       | false                      | Whether to allow speech input. Default shows built-in speech recognition button, built-in browser speech recognition API                                                                                                                |
| `submitType`              | String               | No       | 'enter'                    | Submit method, supports `'shiftEnter'` (press `Shift + Enter` to submit).                                                                                                                                                               |
| `headerAnimationTimer`    | Number               | No       | 300                        | Custom header display duration for input box, unit is `ms`.                                                                                                                                                                             |
| `inputWidth`              | String               | No       | '100%'                     | Input box width.                                                                                                                                                                                                                        |
| `variant`                 | String               | No       | 'default'                  | Input box variant type, supports `'default'`, `'updown'`.                                                                                                                                                                               |
| `showUpdown`              | Boolean              | No       | true                       | When variant is `updown`, whether to show built-in styles.                                                                                                                                                                              |
| `inputStyle`              | Object               | No       | \{}                        | Input box styles.                                                                                                                                                                                                                       |
| `triggerStrings`          | string[]             | No       | []                         | Trigger command `string array`.                                                                                                                                                                                                         |
| `triggerPopoverVisible`   | Boolean              | No       | false                      | Whether trigger command `popup` is visible. Need to use `v-model:triggerPopoverVisible` for control.                                                                                                                                    |
| `triggerPopoverWidth`     | String               | No       | 'fit-content'              | Width of trigger command `popup`. Can use percentage and other CSS units.                                                                                                                                                               |
| `triggerPopoverLeft`      | String               | No       | '0px'                      | Left margin of trigger command `popup`. Can use percentage and other CSS units.                                                                                                                                                         |
| `triggerPopoverOffset`    | Number               | No       | 8                          | Spacing of trigger command `popup`. Can only be numeric type, unit px                                                                                                                                                                   |
| `triggerPopoverPlacement` | String               | No       | 'top-start'                | Position of trigger command `popup`. Values: `'top'` \| `'top-start'` \| `'top-end'` \| `'bottom'` \| `'bottom-start'` \| `'bottom-end'` \| `'left'` \| `'left-start'` \| `'left-end'` \| `'right'` \| `'right-start'` \| `'right-end'` |

## Events

| Event Name        | Description                                                     | Callback Parameters                                                             |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `submit`          | Event triggered when built-in `submit button` submits.          | None                                                                            |
| `cancel`          | Event triggered when built-in `loading button` is clicked.      | None                                                                            |
| `recordingChange` | Event triggered when built-in speech recognition state changes. | None                                                                            |
| `trigger`         | Event triggered when command popup changes.                     | `interface TriggerEvent{oldValue: string; newValue: string; isOpen: boolean; }` |

## Ref Instance Methods

| Property Name      | Type     | Description                                                                                                                                  |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `openHeader`       | Function | Open custom header of input box.                                                                                                             |
| `closeHeader`      | Function | Close custom header of input box.                                                                                                            |
| `clear`            | Function | Clear input box content.                                                                                                                     |
| `blur`             | Function | Remove focus from input box.                                                                                                                 |
| `focus`            | Function | Focus input box. Default `focus('all')` focuses entire text, `focus('start')` focuses beginning of text, `focus('end')` focuses end of text. |
| `submit`           | Function | Submit input content.                                                                                                                        |
| `cancel`           | Function | Cancel loading state.                                                                                                                        |
| `startRecognition` | Function | Start speech recognition.                                                                                                                    |
| `stopRecognition`  | Function | Stop speech recognition.                                                                                                                     |

## Slots

| Slot Name      | Parameters | Type | Description                                      |
| -------------- | ---------- | ---- | ------------------------------------------------ |
| `#header`      | -          | Slot | Used to customize input box header content.      |
| `#prefix`      | -          | Slot | Used to customize input box prefix content.      |
| `#action-list` | -          | Slot | Used to customize input box action list content. |
| `#footer`      | -          | Slot | Used to customize input box footer content.      |

## Features

1. **Focus Control**: Supports setting focus to beginning, end, or selecting entire text, can also remove focus.
2. **Custom Content**: Provides header, prefix, action list, and other slots, allowing users to customize content of these parts.
3. **Submit Function**: Supports pressing `Shift + Enter` to submit input content, can execute custom operations after submission.
4. **Loading State**: Can display loading state, simulating submission processing.
5. **Speech Input**: Supports speech input function, improving input convenience.
6. **Clear Function**: Input box can clear content, convenient for users to re-enter.
