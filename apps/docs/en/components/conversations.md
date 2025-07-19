# Conversations Session Management Component 📱

## Introduction

`Conversations` is a session management component developed based on Vue 3 and Element Plus, supporting grouped display, menu interaction, scroll loading, custom styling, and other functions. Suitable for message lists, file management, task grouping, and other scenarios, it meets diverse business requirements through flexible configuration and slot extensions.

## Code Examples

### Basic Usage

<demo src="../../components/conversations/demos/base.vue"></demo>

### Time Grouping and Sticky Effect

<demo src="../../components/conversations/demos/time-grouping.vue"></demo>

### Custom Group Sorting

<demo src="../../components/conversations/demos/custom-group-sort.vue"></demo>

### Built-in Dropdown Menu

<demo src="../../components/conversations/demos/built-in-menu.vue"></demo>

### Custom Menu Interaction

<demo src="../../components/conversations/demos/custom-menu.vue"></demo>

### Lazy Loading Function

<demo src="../../components/conversations/demos/lazy-loading.vue"></demo>

### Custom Styles and Group Titles

<demo src="../../components/conversations/demos/absolute-custom.vue"></demo>

## Properties

| Property Name          | Type                          | Required | Default   | Description                                                                              |
| ---------------------- | ----------------------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| `items`                | `ConversationItem<T>[]`       | No       | `[]`      | Session item data list, containing fields like `label`, `group`, `disabled`              |
| `groupable`            | `boolean \| GroupableOptions` | No       | `false`   | Whether to enable grouping, passing object can customize group sorting (`sort` function) |
| `showBuiltInMenu`      | `boolean`                     | No       | `false`   | Whether to show built-in menu (rename, delete)                                           |
| `loadMore`             | `() => void`                  | No       | -         | Lazy loading callback function, triggered when scrolling to bottom                       |
| `loadMoreLoading`      | `boolean`                     | No       | `false`   | Load more state, controls loading animation display                                      |
| `showToTopBtn`         | `boolean`                     | No       | `false`   | Whether to show back to top button                                                       |
| `labelKey`             | `string`                      | No       | `'label'` | Session item label field name                                                            |
| `rowKey`               | `string`                      | No       | `'id'`    | Session item unique identifier field name                                                |
| `itemsStyle`           | `CSSProperties`               | No       | `{}`      | Default style for session items                                                          |
| `itemsHoverStyle`      | `CSSProperties`               | No       | `{}`      | Hover style for session items                                                            |
| `itemsActiveStyle`     | `CSSProperties`               | No       | `{}`      | Active style for session items                                                           |
| `itemsMenuOpenedStyle` | `CSSProperties`               | No       | `{}`      | Style when session item menu is opened                                                   |

## Slots

| Slot Name      | Parameters                                                | Description                                                                                                              |
| -------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `#groupTitle`  | `{ group: GroupItem }`                                    | Custom group title, supports adding icons or special styles                                                              |
| `#label`       | `{ item: ConversationItem<T> }`                           | Custom session item label content, supports text overflow handling or rich text                                          |
| `#more-filled` | `{ item, isHovered, isActive, isMenuOpened, isDisabled }` | Additional content on the right side of session items, displays status indicators (e.g., disabled markers, action icons) |
| `#menu`        | `{ item: ConversationItem<T> }`                           | Custom menu content, supports buttons, icons, or complex interactive components                                          |
| `#header`      | -                                                         | Container header slot, used to add search bars, filter buttons, and other custom content                                 |
| `#footer`      | -                                                         | Container footer slot, used to add pagination, statistics, and other custom content                                      |

## Events

| Event          | Parameters                                                         | Description                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@menuCommand` | `(command: ConversationMenuCommand, item: ConversationItem): void` | Menu command callback, supports rename, delete, and other operations. If you choose custom menu, this method becomes invalid, you need to handle menu click logic yourself. |
| `:loadMore`    | --                                                                 | Bind lazy loading callback, triggered when scrolling to bottom                                                                                                              |

## Features

1. **Flexible Group Management**

- Automatically groups based on `group` field, ungrouped items are unified under "Ungrouped" title
- Supports custom group sorting (through `groupable.sort` function), enabling business logic customization
- Group title sticky display, maintains navigation visibility during scrolling

2. **Rich Interaction Support**

- Built-in basic menu (rename, delete), supports listening to command callbacks through `@menu-command`
- Custom menu slots, easily extend sharing, editing, and other complex operations
- Independent configuration of session item state styles (default, hover, active, menu opened), clear visual feedback

3. **Performance Optimization**

- Lazy loading function: Automatically loads more data when scrolling to bottom, reducing initial rendering pressure
- Virtual scrolling (planned): Supports ultra-large list scenarios, improves memory usage efficiency

4. **Highly Customizable**

- Full style properties: Customize session item appearance through `itemsStyle` series properties
- Deep slot extensions: Labels, group titles, menu content can all be completely customized through slots
- Responsive design: Supports adaptive width and scrollbar hiding, adapts to different container sizes
