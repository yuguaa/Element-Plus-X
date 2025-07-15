import type MarkdownIt from 'markdown-it';
import type { ComputedRef, Ref } from 'vue';

export interface TypingConfig {
  step?: number;
  interval?: number;
  suffix?: string;
  isRequestEnd?: boolean;
}
export interface TypingFogfig {
  bgColor?: string;
  width?: string;
}

type MarkdownItPlugin = (md: MarkdownIt) => void;

export interface TypewriterProps {
  content?: string;
  isMarkdown?: boolean;
  typing?: boolean | TypingConfig;
  isFog?: boolean | TypingFogfig;
  highlight?: (code: string, language: string) => string;
  mdPlugins?: MarkdownItPlugin[];
}

export interface TypewriterEmits {
  (event: 'start', instance: TypewriterInstance): void;
  (event: 'writing', instance: TypewriterInstance): void;
  (event: 'finish', instance: TypewriterInstance): void;
}

export interface TypewriterInstance {
  interrupt: () => void;
  continue: () => void;
  restart: () => void;
  destroy: () => void;
  renderedContent: ComputedRef<string>;
  isTyping: Ref<boolean>;
  progress: ComputedRef<number>;
}
