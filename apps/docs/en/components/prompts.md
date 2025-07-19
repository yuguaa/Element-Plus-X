# Prompts Prompt Set Component 🎁

## Introduction

`Prompts` is used to display a set of predefined questions or suggestions related to the current context.

## Code Examples

### Basic Usage

<demo src="../../components/prompts/demos/base.vue"></demo>

### Disabled State

<demo src="../../components/prompts/demos/disabled.vue"></demo>

### Vertical Arrangement

<demo src="../../components/prompts/demos/vertical.vue"></demo>

### Wrappable

<demo src="../../components/prompts/demos/wrap.vue"></demo>

### Responsive Width

<demo src="../../components/prompts/demos/responsive.vue"></demo>

### Customized Styles

<demo src="../../components/prompts/demos/customized.vue"></demo>

### Nested Combination

<demo src="../../components/prompts/demos/nested.vue"></demo>

## Properties

| Property Name | Type                  | Required | Default | Description                                                                                            |
| ------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `title`       | `string`              | No       | `''`    | Main title text content of the prompt set                                                              |
| `items`       | `PromptsItemsProps[]` | No       | `[]`    | Prompt items array, each element contains label, icon, description, etc. (see structure details below) |
| `wrap`        | `boolean`             | No       | `false` | Whether to allow prompt items to wrap automatically (only effective in horizontal arrangement)         |
| `vertical`    | `boolean`             | No       | `false` | Whether to arrange prompt items vertically (layout direction is column arrangement in vertical mode)   |
| `style`       | `CSSProperties`       | No       | `{}`    | Custom styles for component container (directly applied to outermost `div.el-prompts`)                 |

**`PromptsItemsProps` Structure Description** (single prompt item properties):

```typescript
interface PromptsItemsProps {
  key: string | number; // Unique identifier (for state association)
  label?: string; // Prompt item label text
  icon?: ComponentVNode; // Prompt item icon (Vue component form)
  description?: string; // Prompt item description text
  disabled?: boolean; // Whether disabled (no interaction response when disabled)
  itemStyle?: CSSProperties; // Custom base styles for prompt item
  itemHoverStyle?: CSSProperties; // Custom styles for prompt item hover state
  itemActiveStyle?: CSSProperties; // Custom styles for prompt item active state
  children?: PromptsItemsProps[]; // Child prompt items array (for nested display)
}
```

## Slots

| Slot Name      | Parameters                    | Type   | Description                                                                                                                 |
| -------------- | ----------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| `#title`       | -                             | `Slot` | Custom prompt set title content (if `title` property is also set, slot content will override property text)                 |
| `#icon`        | `{ item: PromptsItemsProps }` | `Slot` | Custom icon content for prompt item (receives current prompt item `item` parameter, can override `item.icon`)               |
| `#label`       | `{ item: PromptsItemsProps }` | `Slot` | Custom label content for prompt item (receives current prompt item `item` parameter, can override `item.label`)             |
| `#description` | `{ item: PromptsItemsProps }` | `Slot` | Custom description content for prompt item (receives current prompt item `item` parameter, can override `item.description`) |

## Features

1. **Multi-dimensional Content Display**: Supports configuring basic information like labels, icons, descriptions through `items` property, while providing `label`/`icon`/`description` slots for highly customizable content.
2. **Flexible Layout Control**: Switch between vertical/horizontal arrangement modes through `vertical` property, control automatic wrapping capability in horizontal arrangement through `wrap` property, adapting to different scenario layout requirements.
3. **Interactive State Feedback**: Built-in hover (background color lightens) and active (background color darkens) state styles, supports custom state styles through `itemHoverStyle`/`itemActiveStyle`, improving interactive experience.
4. **Disabled State Support**: Individual prompt items can be disabled through `item.disabled` property, no click event response and gray background color in disabled state, clearly indicating non-operable.
5. **Nested Level Display**: Supports configuring child prompt items through `item.children`, component automatically recursively renders nested structure, meeting multi-level classification or related prompt display requirements.
6. **Fine-grained Style Customization**: Supports controlling overall component styles through `style` property, controlling individual prompt item base styles through `itemStyle`, supports separate state style configuration (`itemHoverStyle`/`itemActiveStyle`).
