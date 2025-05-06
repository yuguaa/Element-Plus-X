export interface UseSendProps {
  onAbort?: () => void
  sendHandler?: (...args: any[]) => void
  abortHandler?: () => void
  finishHandler?: () => void
}

type OnError = (eventSource: EventSource, event: Event) => void

type BaseFetchOptions = Omit<RequestInit, 'headers' | 'signal'> & {
  headers?: HeadersInit | Headers
}

type Transformer<T> = (message: string) => T

interface BaseSSEProps<T = string> {
  baseURL?: string
  type?: SSEType
  onFinish?: (data: T[]) => void
  onAbort?: (data: T[]) => void
  transformer?: Transformer<T>
  onMessage?: (message: T) => void
}

interface SSEWithFetchProps {
  baseOptions?: BaseFetchOptions
  onError?: (e: unknown) => void
}

interface SSEWithSSEProps {
  baseOptions?: EventSourceInit
  onError?: OnError
  onOpen?: () => void
}

type SSEType = 'fetch' | 'sse' | 'sip'

export type SSEProps<T> = BaseSSEProps<T> & (SSEWithSSEProps | SSEWithFetchProps)

export class XRequest<T> {
  #instance: EventSource | null = null
  #transformer?: Transformer<T>
  #baseURL: string
  #baseOptions?: EventSourceInit | BaseFetchOptions
  #onAbort?: BaseSSEProps<T>['onAbort']
  #onMessage?: BaseSSEProps<T>['onMessage']
  #onError?: SSEWithSSEProps['onError'] | SSEWithFetchProps['onError']
  #onOpen?: () => void
  #type: SSEType = 'sse'
  #controller: AbortController | null = null
  #onFinish?: BaseSSEProps<T>['onFinish']
  #messages: T[] = []
  constructor({ baseURL, onAbort, onMessage, onError, baseOptions, transformer, type, onFinish, ...props }: SSEProps<T> = {}) {
    this.#baseURL = baseURL ?? ''
    this.#baseOptions = baseOptions ?? {}
    onAbort && (this.#onAbort = onAbort)
    onMessage && (this.#onMessage = onMessage)
    onError && (this.#onError = onError)
    onFinish && (this.#onFinish = onFinish);
    (props as SSEWithSSEProps).onOpen && (this.#onOpen = (props as SSEWithSSEProps).onOpen)
    transformer && (this.#transformer = transformer)
    type && (this.#type = type)
    this.abort = this.abort.bind(this)
    this.send = this.send.bind(this)
  }

  #sendWithFetch(url: string, options: BaseFetchOptions = {}) {
    this.#controller = new AbortController()
    const signal = this.#controller.signal
    const fetchOptions = {
      ...options,
      signal,
    } as RequestInit
    return fetch(this.#baseURL + url, fetchOptions).then(res => res.body).then(async (body) => {
      if (!body)
        return Promise.reject(new Error('Response body is null in stream mode'))
      const reader = body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (streamDone) {
          this.#onFinish?.(this.#messages)
          return
        };
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          const chunkUse = chunk.startsWith('data: ') ? chunk.slice(6) : chunk
          try {
            const res = this.#transformer ? (this.#transformer as Transformer<T>)(chunkUse) : chunkUse as T
            this.#messages.push(res)
            this.#onMessage?.(res)
          }
          catch (error) {
            (this.#onError as SSEWithFetchProps['onError'])?.(error)
            this.#controller?.abort()
            return Promise.reject(error)
          }
        }
      }
    }).catch((err) => {
      if (err.name === 'AbortError') {
        this.#onAbort?.(this.#messages)
        return
      }
      (this.#onError as SSEWithFetchProps['onError'])?.(err)
      this.#controller?.abort()
    })
  }

  #sendWithSSE(url: string, options: EventSourceInit = {}) {
    const es = new EventSource(this.#baseURL + url, { ...this.#baseOptions, ...options })
    es.onmessage = (e) => {
      const res = this.#transformer ? this.#transformer(e.data) : e as MessageEvent<T>
      this.#onMessage?.(res as T)
    }
    es.onopen = () => {
      this.#onOpen?.()
    }
    es.onerror = (ev: Event) => {
      if (es.readyState === EventSource.CLOSED) {
        this.#onFinish?.(this.#messages)
      }
      else {
        this.#onError?.(es, ev)
      }
      this.abort()
    }
    this.#instance = es
    return es
  }

  public send(url: string, options: EventSourceInit | BaseFetchOptions = {}) {
    switch (this.#type) {
      case 'fetch':
        this.#sendWithFetch(url, options as BaseFetchOptions)
        break
      default:
        this.#sendWithSSE(url, options as EventSourceInit)
    }
    return this
  }

  public abort() {
    this.#instance?.close?.()
    this.#instance = null
    this.#controller?.abort()
    this.#controller = null
    this.#onAbort?.(this.#messages)
    this.#messages = []
  }
}

/**
 * @description A utility function for handling the request status of send operation management, supporting optional abort functionality, as well as Promise and Server-Sent Events (SSE).
 * @description 一个用于处理发送操作管理请求状态的实用函数，支持可选的中止功能，同时支持 Promise 和 SSE（服务端事件）。
 *
 * @typedef {object} WithAbortProps
 * @property {(signal: AbortSignal) => Promise<any>} promise - A function that returns a promise and accepts an `AbortSignal` for cancellation.
 * @property {(signal: AbortSignal) => Promise<any>} promise - 一个返回 Promise 的函数，接受一个用于取消的 `AbortSignal`。
 *
 * @typedef {object} WithSSEProps
 * @property {EventSource} eventSource - An `EventSource` instance for handling Server-Sent Events.
 * @property {EventSource} eventSource - 用于处理服务端事件的 `EventSource` 实例。
 *
 * @typedef {object} UseSendProps
 * @property {WithAbortProps | WithSSEProps} props - Either `WithAbortProps` or `WithSSEProps`, depending on the use case.
 * @property {WithAbortProps | WithSSEProps} props - 根据使用场景，传入 `WithAbortProps` 或 `WithSSEProps`。
 * @property {() => void} [onAbort] - Optional callback triggered when the operation is aborted.
 * @property {() => void} [onAbort] - 可选的回调函数，在操作被中止时触发。
 * @property {(...args: any[]) => void} [sendHandler] - Optional handler function invoked before sending starts.
 * @property {(...args: any[]) => void} [sendHandler] - 可选的处理函数，在发送开始前调用。
 *
 * @param {UseSendProps} props - Configuration options for the `useSend` function.
 * @param {UseSendProps} props - `useSend` 函数的配置选项。
 *
 * @returns {object} - Returns an object containing utility methods and state.
 * @returns {object} - 返回一个包含实用方法和状态的对象。
 *
 * @property {Ref<boolean>} loading - A reactive reference indicating whether a send operation is in progress.
 * @property {Ref<boolean>} loading - 一个响应式引用，指示是否正在执行发送操作。
 *
 * @property {Promise<any> | undefined} promise - The promise returned by the `promise` function, if provided.
 * @property {Promise<any> | undefined} promise - 如果提供了 `promise` 函数，则返回的 Promise。
 *
 * @property {() => void} abort - A function to abort the ongoing operation, either by aborting the promise or closing the EventSource.
 * @property {() => void} abort - 一个用于中止当前操作的函数，可以中止 Promise 或关闭 EventSource。
 *
 * @property {(...args: any[]) => void} send - A function to initiate the send operation, invoking the `sendHandler` if provided.
 * @property {(...args: any[]) => void} send - 一个用于启动发送操作的函数，如果提供了 `sendHandler` 则会调用。
 */
export function useSend(
  { onAbort, sendHandler, abortHandler }: UseSendProps = {} as UseSendProps,
) {
  const loading = ref<boolean>(false)

  const handleSend = (...args: any[]) => {
    if (loading.value)
      return
    sendHandler?.(...args)
    loading.value = true
  }

  const handleAbort = () => {
    loading.value = false
    abortHandler?.()
    onAbort?.()
  }

  const handleFinish = () => {
    loading.value = false
  }

  return {
    loading,
    abort: handleAbort,
    send: handleSend,
    finish: handleFinish,
  }
}
