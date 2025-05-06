/// <reference types="dom-speech-recognition" />

declare interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  onstart: () => void
  onend: () => void
  onerror: (event: SpeechRecognitionError) => void
  start: () => void
  stop: () => void
}

declare interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

declare interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

declare interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  length: number
  isFinal: boolean
}

declare interface SpeechRecognitionAlternative {
  confidence: number
  transcript: string
}

declare interface SpeechRecognitionError {
  error: string
  message: string
}

declare const webkitSpeechRecognition: {
  new (): SpeechRecognition
  prototype: SpeechRecognition
}
