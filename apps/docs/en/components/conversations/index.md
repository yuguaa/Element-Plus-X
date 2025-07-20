# Conversations Management Component 📱

## Introduction

`Conversations` is a conversation management component developed based on Vue 3 and Element Plus, supporting group display, menu interaction, scroll loading, custom styles, and other features. It is suitable for message lists, file management, task grouping, and other scenarios. Through flexible configuration and slot extensions, it meets diverse business needs.

## Code Demo

### Basic Usage

<demo src="./demos/base.vue"></demo>

### Time Grouping and Sticky Effect

<demo src="./demos/time-grouping.vue"></demo>

### Custom Group Sorting

<demo src="./demos/custom-group-sort.vue"></demo>

### Built-in Dropdown Menu

<demo src="./demos/built-in-menu.vue"></demo>

### Custom Menu Interaction

<demo src="./demos/custom-menu.vue"></demo>

### Lazy Loading

<demo src="./demos/lazy-loading.vue"></demo>

### Custom Styles and Group Titles

<demo src="./demos/absolute-custom.vue"></demo>

## Properties

| Property Name          | Type                          | Required | Default   | Description                                                                                               |
| ---------------------- | ----------------------------- | -------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `items`                | `ConversationItem<T>[]`       | No       | `[]`      | Conversation item data list, containing fields like `label`, `group`, `disabled`, etc.                    |
| `groupable`            | `boolean \| GroupableOptions` | No       | `false`   | Whether to enable grouping functionality, passing an object can customize group sorting (`sort` function) |
| `showBuiltInMenu`      | `boolean`                     | No       | `false`   | Whether to show built-in menu (rename, delete)                                                            |
| `loadMore`             | `() => void`                  | No       | -         | Lazy loading callback function, triggered when scrolling to bottom                                        |
| `loadMoreLoading`      | `boolean`                     | No       | `false`   | Loading more status, controls loading animation display                                                   |
| `showToTopBtn`         | `boolean`                     | No       | `false`   | Whether to show back to top button                                                                        |
| `labelKey`             | `string`                      | No       | `'label'` | Conversation item label field name                                                                        |
| `rowKey`               | `string`                      | No       | `'id'`    | Conversation item unique identifier field name                                                            |
| `itemsStyle`           | `CSSProperties`               | No       | `{}`      | Conversation item default style                                                                           |
| `itemsHoverStyle`      | `CSSProperties`               | No       | `{}`      | Conversation item hover style                                                                             |
| `itemsActiveStyle`     | `CSSProperties`               | No       | `{}`      | Conversation item active style                                                                            |
| `itemsMenuOpenedStyle` | `CSSProperties`               | No       | `{}`      | Conversation item style when menu is open                                                                 |

## Slots

| Slot Name      | Parameters                                                | Description                                                                                                               |
| -------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `#groupTitle`  | `{ group: GroupItem }`                                    | Custom group title, supports adding icons or special styles                                                               |
| `#label`       | `{ item: ConversationItem<T> }`                           | Custom conversation item label content, supports text overflow handling or rich text                                      |
| `#more-filled` | `{ item, isHovered, isActive, isMenuOpened, isDisabled }` | Additional content on the right side of conversation item, displays status indicators (e.g., disabled mark, action icons) |
| `#menu`        | `{ item: ConversationItem<T> }`                           | Custom menu content, supports buttons, icons, or complex interaction components                                           |
| `#header`      | -                                                         | Container header slot, for adding search bars, filter buttons, and other custom content                                   |
| `#footer`      | -                                                         | Container footer slot, for adding pagination, statistics, and other custom content                                        |

## Events

| Event          | Parameters                                                         | Description                                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@menuCommand` | `(command: ConversationMenuCommand, item: ConversationItem): void` | Menu command callback, supports rename, delete, and other operations. If you choose to customize the menu, this method is ineffective, and you need to handle menu click logic yourself. |
| `:loadMore`    | --                                                                 | Bind lazy loading callback, triggered when scrolling to bottom                                                                                                                           |

## Features

1. **Flexible Group Management**

- Automatically groups based on `group` field, ungrouped items are unified under "Ungrouped" title
- Supports custom group sorting (through `groupable.sort` function), implementing business logic customization
- Group titles stick to top, maintaining navigation visibility while scrolling

2. **Rich Interaction Support**

- Built-in basic menu (rename, delete), supports monitoring command callbacks through `@menu-command`
- Custom menu slots, easily extend share, edit, and other complex operations
- Independent configuration of conversation item state styles (default, hover, active, menu open), clear visual feedback

3. **Performance Optimization**

- Lazy loading: automatically loads more data when scrolling to bottom, reducing initial rendering pressure
- Virtual scrolling (planned): supports super large list scenarios, improving memory usage efficiency

4. **Highly Customizable**

- Full style properties: customize conversation item appearance through `itemsStyle` series properties
- Deep slot extension: labels, group titles, menu content can all be completely customized through slots
- Responsive design: supports adaptive width and scrollbar hiding, adapting to different container sizes
