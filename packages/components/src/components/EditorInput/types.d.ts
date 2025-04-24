export interface EditorInputProps {
  modelValue?: string
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  rows?: number
  autosize?: boolean | { minRows?: number, maxRows?: number }
  inputStyle?: StyleValue
  validateEvent?: boolean
  submitType?: 'enter' | 'shiftEnter'
}
