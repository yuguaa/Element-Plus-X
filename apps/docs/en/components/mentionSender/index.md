# MentionSender Mention Input Component 🦥

## Introduction

`MentionSender` is an input component for chat.

::: warning
It has basically the same functionality as the `Sender` component, the only difference is that the **attributes and methods** related to `directive popover` are different. Click here to quickly understand the difference 👉 [**Directive Differences**](https://element-plus-x.com/components/mentionSender/#packages-vue-element-plus-x-src-mentionSender-demos-options)
:::

We haven't considered merging the **directive functionality** of `MentionSender` and `Sender` together, only distinguishing them through components. Later we will consider merging both functionalities into another new component: `EditorSender` rich text input component, to support more input requirements.

::: tip
The `EditorSender` rich text input component will reference Douban's input box and meet everyone in the future:

<img src="./image1.png" width="100%">
:::

## Code Examples

### Basic Usage

<demo src="./demos/basic.vue"></demo>

### Placeholder

<demo src="./demos/placeholder.vue"></demo>

### Two-way Binding (Unbound, value won't change)

<demo src="./demos/v-model.vue"></demo>

### Submit Button Disabled State

<demo src="./demos/submit-btn-disabled.vue"></demo>

### Custom Max and Min Rows

<demo src="./demos/autosize.vue"></demo>

### Input Component Various States

<demo src="./demos/state.vue"></demo>

### Submission Methods

<demo src="./demos/submit-type.vue"></demo>

### Voice Recognition

::: warning
Browser built-in voice recognition API, you can use the component library's built-in [`useRecord`](https://element-plus-x.com/components/useRecord/) **hooks** for more convenient built-in voice recognition integration and control
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

### Custom Input Style

<demo src="./demos/input-style.vue"></demo>

### Input Focus Control

<demo src="./demos/focus.vue"></demo>

## Mention Directive Usage Introduction (Differences from Sender Component)

::: warning
Below shows the **attributes and methods** related to directives that are **different** from the `Sender` component. Please note the **usage differences** when using

This friendly reminder update time: `2025-04-16`
:::

### Custom Array for Trigger Directives

<demo src="./demos/options.vue"></demo>

### Custom Trigger Directive Strings

<demo src="./demos/trigger-strings.vue"></demo>

### Custom Trigger Directive Separator

<demo src="./demos/trigger-split.vue"></demo>

### Trigger Directive Loading

<demo src="./demos/trigger-loading.vue"></demo>

### Custom Trigger Directive Filter

<demo src="./demos/filter-option.vue"></demo>

### Whole Delete

<demo src="./demos/whole.vue"></demo>

### Trigger Directive Popover Position

<demo src="./demos/trigger-popover-placement.vue"></demo>

### Trigger Directive Popover Offset

<demo src="./demos/trigger-popover-offset.vue"></demo>

### Various Slots for Directive Popover

<demo src="./demos/solts.vue"></demo>

### Search Event

<demo src="./demos/search.vue"></demo>

### Select Event

<demo src="./demos/select.vue"></demo>

## Attributes

| Attribute | Type | Required | Default | Description |
| --------- | ---- | -------- | ------- | ----------- |
| `v-model` | String | No | '' | Input binding value, use `v-model` for two-way binding. |
| `placeholder` | String | No | '' | Input placeholder text. |
| `auto-size` | Object | No | \{ minRows:1, maxRows:6 \} | Set minimum and maximum display rows for input. |
| `read-only` | Boolean | No | false | Whether input is read-only. |
| `disabled` | Boolean | No | false | Whether input is disabled. |
| `submitBtnDisabled` | Boolean \| undefined | No | undefined | Built-in send button disabled state. (Note usage scenarios) |
| `loading` | Boolean | No | false | Whether to show loading state. When `true`, input shows loading animation. |
| `clearable` | Boolean | No | false | Whether input content can be cleared. Shows default clear button |
| `allowSpeech` | Boolean | No | false | Whether to allow voice input. Default shows built-in voice recognition button, built-in browser voice recognition API |
| `submitType` | String | No | 'enter' | Submission method, supports `'shiftEnter'` (submit with `Shift + Enter`), `'cmdOrCtrlEnter'` (submit with `Command + Enter` or `Ctrl + Enter`), `'altEnter'` (submit with `Alt + Enter`). |
| `headerAnimationTimer` | Number | No | 300 | Custom header display duration for input, unit `ms`. |
| `inputWidth` | String | No | '100%' | Input width. |
| `variant` | String | No | 'default' | Input variant type, supports `'default'`, `'updown'`. |
| `showUpdown` | Boolean | No | true | When variant is `updown`, whether to show built-in styles. |
| `inputStyle` | Object | No | \{\} | Input styles. |
| `triggerStrings` | string[] | No | [] | Trigger directive `string array`. |
| `triggerPopoverVisible` | Boolean | No | false | Whether trigger directive `popover` is visible. Need to use `v-model:triggerPopoverVisible` for control. |
| `triggerPopoverWidth` | String | No | 'fit-content' | Trigger directive `popover` width. Can use percentage and other CSS units. |
| `triggerPopoverLeft` | String | No | '0px' | Trigger directive `popover` left margin. Can use percentage and other CSS units. |
| `triggerPopoverOffset` | Number | No | 8 | Trigger directive `popover` spacing. Can only be number type, unit px |
| `triggerPopoverPlacement` | String | No | 'top-start' | Trigger directive `popover` position. Values: `'top'` \| `'top-start'` \| `'top-end'` \| `'bottom'` \| `'bottom-start'` \| `'bottom-end'` \| `'left'` \| `'left-start'` \| `'left-end'` \| `'right'` \| `'right-start'` \| `'right-end'` |

## Events

| Event Name | Description | Callback Parameters |
| ---------- | ----------- | ------------------- |
| `submit` | Event triggered when built-in `submit button` is submitted. | None |
| `cancel` | Event triggered when built-in `loading button` is clicked. | None |
| `recordingChange` | Event triggered when built-in voice recognition state changes. | None |
| `select` | Triggered when trigger field is pressed | `option: MentionOption` |
| `search` | Triggered when user selects an option | `searchValue: string, prefix: string` |

## Ref Instance Methods

| Property Name | Type | Description |
| ------------- | ---- | ----------- |
| `openHeader` | Function | Open input custom header. |
| `closeHeader` | Function | Close input custom header. |
| `clear` | Function | Clear input content. |
| `blur` | Function | Remove input focus. |
| `focus` | Function | Focus input. Default `focus('all')` focuses entire text, `focus('start')` focuses text beginning, `focus('end')` focuses text end. |
| `submit` | Function | Submit input content. |
| `cancel` | Function | Cancel loading state. |
| `startRecognition` | Function | Start voice recognition. |
| `stopRecognition` | Function | Stop voice recognition. |

## Slots

| Slot Name | Parameters | Type | Description |
| --------- | ---------- | ---- | ----------- |
| `#header` | - | Slot | For customizing input header content. |
| `#prefix` | - | Slot | For customizing input prefix content. |
| `#action-list` | - | Slot | For customizing input action list content. |
| `#footer` | - | Slot | For customizing input footer content. |

## Features

1. **Focus Control**: Supports setting focus to text beginning, end, or selecting entire text, can also remove focus.
2. **Custom Content**: Provides header, prefix, action list, and other slots, allowing users to customize these parts.
3. **Submission Function**: Supports submitting input content with `Shift + Enter`, can execute custom operations after submission.
4. **Loading State**: Can display loading state, simulating submission processing.
5. **Voice Input**: Supports voice input functionality, improving input convenience.
6. **Clear Function**: Input can clear content, convenient for users to re-enter.
