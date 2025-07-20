# Sender Input Box 💭

::: warning
`Version 1.1.6` New Features

- Variant **`up-down structure`**
- Custom bottom `#footer` slot
- Custom directive `popup` and `callback events` for triggering directives

🐵 This friendly reminder was updated on: `2025-04-16`
:::

## Introduction

`Sender` is an input box component for chat. It has rich interactive features and customization capabilities. It supports voice input, clearing input content, multiple submission methods, and allows users to customize header, prefix, and action list content. At the same time, the component provides focus control, submission callbacks and other functions to meet diverse input scenario requirements.

## Code Demo

### Basic Usage

<demo src="./demos/basic.vue"></demo>

### Placeholder

<demo src="./demos/placeholder.vue"></demo>

### Two-way Binding (Not bound, value won't change)

<demo src="./demos/v-model.vue"></demo>

### Submit Button Disabled State

<demo src="./demos/submit-btn-disabled.vue"></demo>

### Custom Max and Min Rows

<demo src="./demos/autosize.vue"></demo>

### Various Input Box States

<demo src="./demos/state.vue"></demo>

### Submit Methods

<demo src="./demos/submit-type.vue"></demo>

### Speech Recognition

::: warning
Browser built-in speech recognition API, you can use the built-in [`useRecord`](https://element-plus-x.com/components/useRecord/) **hooks** for more convenient built-in speech recognition integration and control
:::

<demo src="./demos/allow-speech.vue"></demo>

### Variant - Vertical Style

<demo src="./demos/variant.vue"></demo>

### Custom Action List

<demo src="./demos/action-list.vue"></demo>

### Custom Prefix

<demo src="./demos/prefix.vue"></demo>

### Custom Header

<demo src="./demos/header.vue"></demo>

### Custom Footer

<demo src="./demos/footer.vue"></demo>

### Custom Input Box Style

<demo src="./demos/input-style.vue"></demo>

### Trigger Directive

<demo src="./demos/trigger.vue"></demo>

### Custom Directive Popup

<demo src="./demos/trigger-popover.vue"></demo>

### Input Box Focus Control

<demo src="./demos/focus.vue"></demo>

## Properties

| Property Name             | Type                 | Required | Default                    | Description                                                                                                                                                                                                                               |
| ------------------------- | -------------------- | -------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v-model`                 | String               | No       | ''                         | The bound value of the input box, use `v-model` for two-way binding.                                                                                                                                                                      |
| `placeholder`             | String               | No       | ''                         | The placeholder text of the input box.                                                                                                                                                                                                    |
| `auto-size`               | Object               | No       | \{ minRows:1, maxRows:6 \} | Set the minimum and maximum display rows of the input box.                                                                                                                                                                                |
| `read-only`               | Boolean              | No       | false                      | Whether the input box is in read-only state.                                                                                                                                                                                              |
| `disabled`                | Boolean              | No       | false                      | Whether the input box is in disabled state.                                                                                                                                                                                               |
| `submitBtnDisabled`       | Boolean \| undefined | No       | undefined                  | Built-in send button disabled state. (Note the usage scenario)                                                                                                                                                                            |
| `loading`                 | Boolean              | No       | false                      | Whether to show loading state. When `true`, the input box will show a loading animation.                                                                                                                                                  |
| `clearable`               | Boolean              | No       | false                      | Whether the input box content can be cleared. Shows the default clear button                                                                                                                                                              |
| `allowSpeech`             | Boolean              | No       | false                      | Whether to allow voice input. Shows the built-in voice recognition button by default, uses the browser's built-in speech recognition API                                                                                                  |
| `submitType`              | String               | No       | 'enter'                    | Submit method, supports `'shiftEnter'` (submit by pressing `Shift + Enter`).                                                                                                                                                              |
| `headerAnimationTimer`    | Number               | No       | 300                        | The display duration of the custom header of the input box, in `ms`.                                                                                                                                                                      |
| `inputWidth`              | String               | No       | '100%'                     | The width of the input box.                                                                                                                                                                                                               |
| `variant`                 | String               | No       | 'default'                  | The variant type of the input box, supports `'default'`, `'updown'`.                                                                                                                                                                      |
| `showUpdown`              | Boolean              | No       | true                       | When the variant is `updown`, whether to show the built-in style.                                                                                                                                                                         |
| `inputStyle`              | Object               | No       | \{}                        | The style of the input box.                                                                                                                                                                                                               |
| `triggerStrings`          | string[]             | No       | []                         | The `string array` that triggers directives.                                                                                                                                                                                              |
| `triggerPopoverVisible`   | Boolean              | No       | false                      | Whether the directive `popup` is visible. Need to use `v-model:triggerPopoverVisible` for control.                                                                                                                                        |
| `triggerPopoverWidth`     | String               | No       | 'fit-content'              | The width of the directive `popup`. Can use percentage and other CSS units.                                                                                                                                                               |
| `triggerPopoverLeft`      | String               | No       | '0px'                      | The left margin of the directive `popup`. Can use percentage and other CSS units.                                                                                                                                                         |
| `triggerPopoverOffset`    | Number               | No       | 8                          | The spacing of the directive `popup`. Can only be a number type, unit is px                                                                                                                                                               |
| `triggerPopoverPlacement` | String               | No       | 'top-start'                | The position of the directive `popup`. Values: `'top'` \| `'top-start'` \| `'top-end'` \| `'bottom'` \| `'bottom-start'` \| `'bottom-end'` \| `'left'` \| `'left-start'` \| `'left-end'` \| `'right'` \| `'right-start'` \| `'right-end'` |

## Events

| Event Name        | Description                                                         | Callback Parameters                                                             |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `submit`          | Event triggered when the built-in `submit button` is submitted.     | None                                                                            |
| `cancel`          | Event triggered when the built-in `loading button` is clicked.      | None                                                                            |
| `recordingChange` | Event triggered when the built-in speech recognition state changes. | None                                                                            |
| `trigger`         | Event triggered when the directive popup changes.                   | `interface TriggerEvent{oldValue: string; newValue: string; isOpen: boolean; }` |

## Ref Instance Methods

| Property Name      | Type     | Description                                                                                                                                                                |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openHeader`       | Function | Open the custom header of the input box.                                                                                                                                   |
| `closeHeader`      | Function | Close the custom header of the input box.                                                                                                                                  |
| `clear`            | Function | Clear the content of the input box.                                                                                                                                        |
| `blur`             | Function | Remove focus from the input box.                                                                                                                                           |
| `focus`            | Function | Focus the input box. Default `focus('all')` focuses the entire text, `focus('start')` focuses at the beginning of the text, `focus('end')` focuses at the end of the text. |
| `submit`           | Function | Submit the input content.                                                                                                                                                  |
| `cancel`           | Function | Cancel the loading state.                                                                                                                                                  |
| `startRecognition` | Function | Start speech recognition.                                                                                                                                                  |
| `stopRecognition`  | Function | Stop speech recognition.                                                                                                                                                   |

## Slots

| Slot Name      | Parameters | Type | Description                                                 |
| -------------- | ---------- | ---- | ----------------------------------------------------------- |
| `#header`      | -          | Slot | Used to customize the header content of the input box.      |
| `#prefix`      | -          | Slot | Used to customize the prefix content of the input box.      |
| `#action-list` | -          | Slot | Used to customize the action list content of the input box. |
| `#footer`      | -          | Slot | Used to customize the footer content of the input box.      |

## Features

1. **Focus Control**: Supports setting focus to the beginning, end, or selecting the entire text, and can also remove focus.
2. **Custom Content**: Provides slots for header, prefix, action list, etc., allowing users to customize the content of these parts.
3. **Submit Function**: Supports submitting input content by pressing `Shift + Enter`, and can execute custom operations after submission.
4. **Loading State**: Can display loading state to simulate the submission processing process.
5. **Voice Input**: Supports voice input functionality to improve input convenience.
6. **Clear Function**: The input box can clear content, making it convenient for users to re-enter.
