# Welcome 欢迎 🌹

## Introduction

The `Welcome` component can clearly convey to users the scope of achievable intentions and expected functionality. Using appropriate welcome recommendation components can effectively reduce user learning costs and help users quickly understand and get started smoothly.

## Code Demo

### Basic Usage

<demo src="./demos/base.vue"></demo>

### Style Variants

<demo src="./demos/variant.vue"></demo>

### Background Color

<demo src="./demos/bg.vue"></demo>

### Custom Image

<demo src="./demos/image.vue"></demo>

### Custom Subtitle

<demo src="./demos/extra.vue"></demo>

## Properties

| Property Name   | Type   | Required | Default | Description                                                            |
| --------------- | ------ | -------- | ------- | ---------------------------------------------------------------------- |
| `variant`       | string | No       | filled  | Component style variant (filled/borderless)                            |
| `direction`     | string | No       | ltr     | Text direction (ltr/rtl)                                               |
| `icon`          | string | No       | -       | Icon URL address                                                       |
| `title`         | string | No       | -       | Main title text content                                                |
| `extra`         | string | No       | -       | Subtitle text content                                                  |
| `description`   | string | No       | -       | Description text content                                               |
| `className`     | string | No       | -       | Container outer layer custom class name                                |
| `rootClassName` | string | No       | -       | Root node custom class name                                            |
| `classNames`    | object | No       | -       | Custom class names for each part ({ icon, title, extra, description }) |
| `style`         | object | No       | -       | Container outer layer custom styles                                    |
| `styles`        | object | No       | -       | Custom styles for each part ({ icon, title, extra, description })      |
| `prefixCls`     | string | No       | welcome | Component class name prefix                                            |

## Slots

| Slot Name | Parameters | Type | Description                  |
| --------- | ---------- | ---- | ---------------------------- |
| `#image`  | -          | Slot | Custom welcome image content |
| `#extra`  | -          | Slot | Custom subtitle content      |

## Features

1. Currently supports two visual styles through the `variant` property: `filled` (filled) and `borderless` (borderless)
2. Supports `direction` property to control text direction
3. Can finely control styles through `classNames` and `styles`
4. Supports `image` and `extra` slots to extend custom content
