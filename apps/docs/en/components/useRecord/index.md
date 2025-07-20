# useRecord 🌴

## Introduction

This is a hook function that automatically calls the browser's built-in API for speech-to-text conversion, allowing users to quickly use speech-to-text functionality, and returns events such as start, end, error, and loading state. It's convenient for developers to integrate and use, implementing custom voice button styles.

Combining the `sender` input component and the useRecord hook function, you can implement custom voice button styles very well.

## Code Demo

<demo src="./demos/use.vue"></demo>

## config Configuration

| Parameter | Description                        | Type                                      |
| --------- | ---------------------------------- | ----------------------------------------- |
| onEnd     | Callback function when speech ends | `(res: speech conversion result) => void` |

## Return Hook

| Property Name | Description                           | Type                         |
| ------------- | ------------------------------------- | ---------------------------- |
| start         | Trigger start speech                  | `(event:MouseEvent) => void` |
| stop          | Trigger stop speech                   | `(event:MouseEvent) => void` |
| loading       | Whether currently recording speech    | `boolean`                    |
| value         | Real-time text from speech conversion | `string`                     |
