# Attachments Component 📪️

## Introduction

The `Attachments` component is a feature-rich file management component that supports file list display, upload, drag-and-drop interaction, scroll browsing, and other functionalities. It is suitable for scenarios that require handling multiple file uploads and displays (such as form attachments, file management interfaces). The component has built-in file upload buttons, drag-and-drop prompt areas, and provides flexible custom slots and style configurations.

## Code Demo

### Basic Usage

<demo src="./demos/base.vue"></demo>

### Scroll Mode

<demo src="./demos/scroll-mode.vue"></demo>

### Custom File List

<demo src="./demos/custom-list.vue"></demo>

### Drag Upload

<demo src="./demos/drag-upload.vue"></demo>

### Custom Scroll Buttons

<demo src="./demos/custom-scroll-buttons.vue"></demo>

## Properties

| Property Name    | Type                                         | Required | Default     | Description                                                                                   |
| ---------------- | -------------------------------------------- | -------- | ----------- | --------------------------------------------------------------------------------------------- |
| `items`          | `FilesCardProps[]`                           | No       | `[]`        | File list data (containing basic file information such as name, type, status, etc.)           |
| `overflow`       | `'scrollX' \| 'scrollY' \| 'wrap'`           | No       | `'scrollX'` | Scroll layout mode (horizontal scroll/vertical scroll/auto wrap)                              |
| `listStyle`      | `CSSProperties`                              | No       | `{}`        | Custom styles for the list container                                                          |
| `uploadIconSize` | `string`                                     | No       | `'64px'`    | Upload button icon size                                                                       |
| `dragTarget`     | `string \| Ref<HTMLElement> \| null`         | No       | `null`      | Drag target element (supports selector string or DOM reference, defaults to component itself) |
| `hideUpload`     | `boolean`                                    | No       | `false`     | Whether to hide the default upload button                                                     |
| `limit`          | `number`                                     | No       | `undefined` | File quantity limit (hides upload button when exceeded)                                       |
| `beforeUpload`   | `(file: File) => boolean`                    | No       | `undefined` | Upload validation function (return `false` to prevent upload)                                 |
| `httpRequest`    | `(options: { file: File }) => Promise<void>` | No       | `undefined` | Custom upload request function (must return Promise)                                          |

## Slots

| Slot Name          | Slot Parameters                                | Description                                                                                        |
| ------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `#file-list`       | `{ items: FilesCardProps[] }`                  | Custom file list content (overrides default `FilesCard` display)                                   |
| `#prev-button`     | `{ show: boolean, onScrollLeft: () => void }`  | Custom left scroll button (`scrollX` mode effective), `show` controls button display state         |
| `#next-button`     | `{ show: boolean, onScrollRight: () => void }` | Custom right scroll button (`scrollX` mode effective), `show` controls button display state        |
| `#empty-upload`    | `-`                                            | Custom upload area when file list is empty (default shows upload button with plus sign)            |
| `#no-empty-upload` | `-`                                            | Custom upload placeholder when file list is not empty (default shows upload button with plus sign) |
| `#drop-area`       | `-`                                            | Custom overlay content for drag-and-drop upload (default shows upload prompt icon and text)        |

## Events

| Event Name      | Callback Parameters                                    | Description                                                                                 |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `uploadChange`  | `(file: File, fileList: FileListProps)`                | Triggered when file selection changes (includes selected file and current file list)        |
| `uploadSuccess` | `(response: any, file: File, fileList: FileListProps)` | Triggered when file upload succeeds (returns API response, current file, and file list)     |
| `uploadError`   | `(error: any, file: File, fileList: FileListProps)`    | Triggered when file upload fails (returns error info, current file, and file list)          |
| `uploadDrop`    | `(files: File[], props: FileListProps)`                | Triggered when dragged files are dropped (includes dragged files array and component props) |
| `deleteCard`    | `(item: FilesCardProps, index: number)`                | Triggered when file card delete button is clicked (returns deleted file info and index)     |

## Support for el-upload Properties

The component internally uses the **elementplus** `el-upload` component, therefore it supports most of its upload properties, such as: `httpRequest`, `beforeUpload`, etc. For details, please refer to: [element-plus/upload](https://element-plus.org/en-US/component/upload.html)

## Features

1. **Multiple Layout Modes** Supports three layouts: `scrollX` (horizontal scroll), `scrollY` (vertical scroll), and `wrap` (auto wrap), adapting to different screen spaces and file quantities.
2. **Drag-and-Drop Upload Interaction** Built-in drag target area (customizable via `dragTarget`), displays semi-transparent overlay prompt during drag, supports folder filtering and file type validation.
3. **High Customization** Completely customize file list display through `#file-list` slot (e.g., replace with custom card component), supports custom scroll buttons and upload button styles.
4. **File Status Management** Working with `FilesCard` component, supports file upload status visualization (progress bar), completion, failure states, automatically synchronizes file list updates.
