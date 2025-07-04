import type { TVueMarkdownProps } from '@components/MarkdownCore';
import type { CodeBlockHeaderExpose } from '@components/MarkdownCore/components/CodeBlock/shiki-header';
import type { InitShikiOptions } from './shikiHighlighter';

export type MarkdownProps = {
  allowHtml?: boolean;
  enableLatex?: boolean;
  enableBreaks?: boolean;
  codeXRender?: Record<string, any>;
  codeXSlot?: CodeBlockHeaderExpose & Record<string, any>;
  codeHighlightTheme?: BuiltinTheme | null;
  remarkPluginsAhead?: PluggableList;
  rehypePluginsAhead?: PluggableList;
  mermaidConfig?: Partial<MermaidToolbarConfig>;
} & Partial<Pick<InitShikiOptions, 'langs' | 'themes'>> &
  Pick<
    TVueMarkdownProps,
    | 'markdown'
    | 'customAttrs'
    | 'remarkPlugins'
    | 'rehypePlugins'
    | 'sanitize'
    | 'sanitizeOptions'
    | 'rehypeOptions'
  >;

export type MarkdownProviderProps = Omit<MarkdownProps, 'markdown'> &
  Partial<Pick<MarkdownProps, 'markdown'>>;
