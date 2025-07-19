# MentionSender Mention Input Box 🦥

## Introduction

`MentionSender` is an input box component for chat.

::: warning
It has basically the same functionality as the `Sender` component, the only difference is that the **properties and methods** related to the `command popup` are different. Click here to quickly understand the difference 👉 [**Command Differences**](https://element-plus-x.com/components/mentionSender/#packages-vue-element-plus-x-src-mentionSender-demos-options)
:::

We haven't considered combining the **command functions** of `MentionSender` and `Sender` together yet, only distinguishing them through components. Later, we will consider merging the two functions into another new component: `EditorSender` rich text input box component, to support more input box requirements.

::: tip
The `EditorSender` rich text input component will reference DouBao's input box and meet everyone in the future:

<img src="./image1.png" width="100%">
:::

## Code Examples

### Basic Usage

<demo src="../../components/mentionSender/demos/basic.vue"></demo>

### Placeholder

<demo src="../../components/mentionSender/demos/placeholder.vue"></demo>

### Two-way Binding (Unbound, value won't change)

<demo src="../../components/mentionSender/demos/v-model.vue"></demo>

### Submit Button Disabled State

<demo src="../../components/mentionSender/demos/submit-btn-disabled.vue"></demo>

### Custom Max and Min Rows

<demo src="../../components/mentionSender/demos/autosize.vue"></demo>

### Input Box Various States

<demo src="../../components/mentionSender/demos/state.vue"></demo>

### Submit Method

<demo src="../../components/mentionSender/demos/submit-type.vue"></demo>

### Speech Recognition

::: warning
Browser built-in speech recognition API, you can use the component library's built-in [`useRecord`](https://element-plus-x.com/components/useRecord/) **hooks** for more convenient built-in speech recognition integration and control
:::

<demo src="../../components/mentionSender/demos/allow-speech.vue"></demo>

### Variant - Vertical Style

<demo src="../../components/mentionSender/demos/variant.vue"></demo>

### Custom Action List

<demo src="../../components/mentionSender/demos/action-list.vue"></demo>

### Custom Prefix

<demo src="../../components/mentionSender/demos/prefix.vue"></demo>

### Custom Header

<demo src="../../components/mentionSender/demos/header.vue"></demo>

### Custom Footer

<demo src="../../components/mentionSender/demos/footer.vue"></demo>

### Custom Input Box Style

<demo src="../../components/mentionSender/demos/input-style.vue"></demo>

### Input Box Focus Control

<demo src="../../components/mentionSender/demos/focus.vue"></demo>

## Mention Command Usage Introduction (Differences from Sender Component)

::: warning
Below shows the **properties and methods** related to commands that are **different** from the `Sender` component. Please pay attention to the **usage differences** when using

This friendly reminder was updated on: `2025-04-16`
:::

### Custom Trigger Command Array

<demo src="../../components/mentionSender/demos/options.vue"></demo>

### Custom Trigger Command String

<demo src="../../components/mentionSender/demos/trigger-strings.vue"></demo>

### Custom Trigger Command Separator

<demo src="../../components/mentionSender/demos/trigger-split.vue"></demo>

### Trigger Command Loading

<demo src="../../components/mentionSender/demos/trigger-loading.vue"></demo>

### Custom Trigger Command Filter

<demo src="../../components/mentionSender/demos/filter-option.vue"></demo>

### Whole Delete

<demo src="../../components/mentionSender/demos/whole.vue"></demo>

### Trigger Command Popup Position

<demo src="../../components/mentionSender/demos/trigger-popover-placement.vue"></demo>

### Trigger Command Popup Offset

<demo src="../../components/mentionSender/demos/trigger-popover-offset.vue"></demo>

### Command Popup Various Slots

<demo src="../../components/mentionSender/demos/solts.vue"></demo>

### Search Event

<demo src="../../components/mentionSender/demos/search.vue"></demo>

### Select Event

<demo src="../../components/mentionSender/demos/select.vue"></demo>

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

| Event Name        | Description                                                     | Callback Parameters                   |
| ----------------- | --------------------------------------------------------------- | ------------------------------------- |
| `submit`          | Event triggered when built-in `submit button` submits.          | None                                  |
| `cancel`          | Event triggered when built-in `loading button` is clicked.      | None                                  |
| `recordingChange` | Event triggered when built-in speech recognition state changes. | None                                  |
| `select`          | Triggered when pressing trigger field                           | `option: MentionOption`               |
| `search`          | Triggered when user selects an option                           | `searchValue: string, prefix: string` |

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
