export interface SenderProps {
  placeholder?: string
  autoSize?: {
    minRows: number
    maxRows: number
  }
  readOnly?: boolean
  disabled?: boolean
  loading?: boolean
  clearable?: boolean
  allowSpeech?: boolean
  submitType?: 'enter' | 'shiftEnter'
  headerAnimationTimer?: number
  inputWidth?: string
}
