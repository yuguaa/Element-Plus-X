# FilesCard Component 📇

## Introduction

The `FilesCard` component is a flexible file display component that supports visual presentation of various file types (images, documents, archives, etc.), including file icons, names, descriptions, status, and other information. It also provides rich customization options and interactive features, suitable for file management, upload preview, and other scenarios.

## Code Demo

### Basic Usage

<demo src="./demos/base.vue"></demo>

### Status Settings

<demo src="./demos/status.vue"></demo>

### Show Delete Icon

<demo src="./demos/delete-icon.vue"></demo>

### Image File Display

<demo src="./demos/image-preview.vue"></demo>

### Custom Styles and Interactions

<demo src="./demos/custom-style.vue"></demo>

### Custom Built-in File Colors

<demo src="./demos/custom-color.vue"></demo>

## Properties

| Property Name    | Type                               | Required | Default           | Description                                                                                       |
| ---------------- | ---------------------------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `uid`            | `string \| number`                 | No       | `undefined`       | File unique identifier                                                                            |
| `name`           | `string`                           | No       | `undefined`       | File name (supports automatic suffix parsing for icon matching)                                   |
| `fileSize`       | `number`                           | No       | `undefined`       | File size (in bytes, automatically converted to readable format)                                  |
| `fileType`       | `string`                           | No       | `undefined`       | File type (higher priority than `name` suffix parsing, e.g., `'image'`, `'document'`)             |
| `description`    | `string`                           | No       | `undefined`       | Description text (supports dynamic generation of file type and size information)                  |
| `url`            | `string`                           | No       | `undefined`       | File access URL (can be used for image file preview)                                              |
| `thumbUrl`       | `string`                           | No       | `undefined`       | Image thumbnail URL                                                                               |
| `imgFile`        | `File \| Blob`                     | No       | `undefined`       | Image file stream (automatically parsed to preview URL, only for temporary display before upload) |
| `iconSize`       | `string`                           | No       | `'42px'`          | Icon/image size                                                                                   |
| `iconColor`      | `string`                           | No       | `undefined`       | Icon color for non-image files (supports custom color values)                                     |
| `showDelIcon`    | `boolean`                          | No       | `false`           | Whether to show hover delete icon                                                                 |
| `maxWidth`       | `string`                           | No       | `'236px'`         | Card maximum width                                                                                |
| `style`          | `CSSProperties`                    | No       | `undefined`       | Card custom styles                                                                                |
| `hoverStyle`     | `CSSProperties`                    | No       | `undefined`       | Card custom styles on hover                                                                       |
| `imgVariant`     | `'rectangle' \| 'square'`          | No       | `'rectangle'`     | Image card shape (rectangle/square)                                                               |
| `imgPreview`     | `boolean`                          | No       | `true`            | Whether to enable image preview functionality                                                     |
| `imgPreviewMask` | `boolean`                          | No       | `true`            | Whether to show image preview overlay mask                                                        |
| `status`         | `'uploading' \| 'done' \| 'error'` | No       | `undefined`       | File status (controls progress bar, error tips, and other visual feedback)                        |
| `percent`        | `number`                           | No       | `0`               | Upload progress percentage (used with `status="uploading"`)                                       |
| `errorTip`       | `string`                           | No       | `'Upload failed'` | Custom error state tip text                                                                       |

## Slots

| Slot Name                | Slot Parameters                            | Description                                                                        |
| ------------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `#icon`                  | `{ item: FilesCardProps }`                 | Custom icon area (higher priority than automatically parsed built-in icons)        |
| `#content`               | `{ item: FilesCardProps }`                 | Custom content area (overrides default name and description display)               |
| `#name-prefix`           | `{ item: FilesCardProps, prefix, suffix }` | File name prefix customization (for truncation scenarios)                          |
| `#name-suffix`           | `{ item: FilesCardProps, prefix, suffix }` | File name suffix customization (for truncation scenarios)                          |
| `#description`           | `{ item: FilesCardProps, prefix, suffix }` | Description text customization (overrides default generated description)           |
| `#image-preview-actions` | `{ item: FilesCardProps, prefix, suffix }` | Image preview overlay content (shown on hover, must be used with `imgPreviewMask`) |
| `#del-icon`              | `{ item: FilesCardProps }`                 | Custom delete icon (defaults to Element Plus's `CircleCloseFilled` icon)           |

## Events

| Event Name      | Callback Parameters | Description                                                                 |
| --------------- | ------------------- | --------------------------------------------------------------------------- |
| `delete`        | `{ ...props }`      | Triggered when delete button is clicked, passes complete card properties    |
| `image-preview` | `{ ...props }`      | Called when image preview function is triggered (clicking image or overlay) |

## Features

1. **Automatic File Type Recognition** Automatically matches built-in icons based on file name suffix (supports common formats like `.pdf`, `.png`, `.zip`, etc.), shows generic file icon when no match is found.
2. **Multi-state Visualization** Supports three states: `uploading` (with progress bar), `done` (completed), `error` (failed, with custom tips), automatic state style switching.
3. **Enhanced Image File Support** Supports image preview functionality (based on Element Plus image preview component), provides square/rectangle variants, supports direct parsing of local image file streams through `imgFile`.
4. **Highly Customizable** Custom icon colors, sizes, card styles, and hover effects, flexible content extension through slots (like file name truncation display, status overlay).
5. **Responsive Design** Supports controlling card maximum width through `maxWidth`, adapts to different layout scenarios, automatic file description truncation to prevent overflow.
