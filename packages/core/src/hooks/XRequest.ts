type OnError = (eventSource: EventSource, event: Event) => void;

type BaseFetchOptions = Omit<RequestInit, 'headers' | 'signal'> & {
  headers?: HeadersInit | Headers;
};

type Transformer<T> = (message: string) => T;

interface BaseSSEProps<T = string> {
  baseURL?: string;
  type?: SSEType;
  onFinish?: (data: T[]) => void;
  onAbort?: (data: T[]) => void;
  transformer?: Transformer<T>;
  onMessage?: (message: T) => void;
}

interface SSEWithFetchProps {
  baseOptions?: BaseFetchOptions;
  onError?: (e: unknown) => void;
}

interface SSEWithSSEProps {
  baseOptions?: EventSourceInit;
  onError?: OnError;
  onOpen?: () => void;
}

type SSEType = 'fetch' | 'sse' | 'sip';

/**
 * @deprecated 已经废弃, 请使用 hook-fetch 代替
 * @deprecated This class has been deprecated, please use hook-fetch instead.
 *
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch 官方文档}
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch Document}
 */
export type SSEProps<T> = BaseSSEProps<T> &
  (SSEWithSSEProps | SSEWithFetchProps);

/**
 * @deprecated 已经废弃, 请使用 hook-fetch 代替
 * @deprecated This class has been deprecated, please use hook-fetch instead.
 *
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch 官方文档}
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch Document}
 */
export class XRequest<T> {
  #instance: EventSource | null = null;
  #transformer?: Transformer<T>;
  #baseURL: string;
  #baseOptions?: EventSourceInit | BaseFetchOptions;
  #onAbort?: BaseSSEProps<T>['onAbort'];
  #onMessage?: BaseSSEProps<T>['onMessage'];
  #onError?: SSEWithSSEProps['onError'] | SSEWithFetchProps['onError'];
  #onOpen?: () => void;
  #type: SSEType = 'sse';
  #controller: AbortController | null = null;
  #onFinish?: BaseSSEProps<T>['onFinish'];
  #messages: T[] = [];
  constructor({
    baseURL,
    onAbort,
    onMessage,
    onError,
    baseOptions,
    transformer,
    type,
    onFinish,
    ...props
  }: SSEProps<T> = {}) {
    this.#baseURL = baseURL ?? '';
    this.#baseOptions = baseOptions ?? {};
    onAbort && (this.#onAbort = onAbort);
    onMessage && (this.#onMessage = onMessage);
    onError && (this.#onError = onError);
    onFinish && (this.#onFinish = onFinish);
    (props as SSEWithSSEProps).onOpen &&
    (this.#onOpen = (props as SSEWithSSEProps).onOpen);
    transformer && (this.#transformer = transformer);
    type && (this.#type = type);
    this.abort = this.abort.bind(this);
    this.send = this.send.bind(this);
  }

  #sendWithFetch(url: string, options: BaseFetchOptions = {}) {
    this.#controller = new AbortController();
    const signal = this.#controller.signal;
    const fetchOptions = {
      ...options,
      signal
    } as RequestInit;
    return fetch(this.#baseURL + url, fetchOptions)
      .then(res => res.body)
      .then(async body => {
        if (!body) {
          return Promise.reject(
            new Error('Response body is null in stream mode')
          );
        }
        const reader = body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (streamDone) {
            this.#onFinish?.(this.#messages);
            return;
          }
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const chunkUse = chunk.startsWith('data: ')
              ? chunk.slice(6)
              : chunk;
            try {
              const res = this.#transformer
                ? (this.#transformer as Transformer<T>)(chunkUse)
                : (chunkUse as T);
              this.#messages.push(res);
              this.#onMessage?.(res);
            }
            catch (error) {
              (this.#onError as SSEWithFetchProps['onError'])?.(error);
              this.#controller?.abort();
              return Promise.reject(error);
            }
          }
        }
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          this.#onAbort?.(this.#messages);
          return;
        }
        (this.#onError as SSEWithFetchProps['onError'])?.(err);
        this.#controller?.abort();
      });
  }

  #sendWithSSE(url: string, options: EventSourceInit = {}) {
    const es = new EventSource(this.#baseURL + url, {
      ...this.#baseOptions,
      ...options
    });
    es.onmessage = e => {
      const res = this.#transformer
        ? this.#transformer(e.data)
        : (e as MessageEvent<T>);
      this.#onMessage?.(res as T);
    };
    es.onopen = () => {
      this.#onOpen?.();
    };
    es.onerror = (ev: Event) => {
      if (es.readyState === EventSource.CLOSED) {
        this.#onFinish?.(this.#messages);
      }
      else {
        this.#onError?.(es, ev);
      }
      this.abort();
    };
    this.#instance = es;
    return es;
  }

  public send(url: string, options: EventSourceInit | BaseFetchOptions = {}) {
    switch (this.#type) {
      case 'fetch':
        this.#sendWithFetch(url, options as BaseFetchOptions);
        break;
      default:
        this.#sendWithSSE(url, options as EventSourceInit);
    }
    return this;
  }

  public abort() {
    this.#instance?.close?.();
    this.#instance = null;
    this.#controller?.abort();
    this.#controller = null;
    this.#onAbort?.(this.#messages);
    this.#messages = [];
  }
}
