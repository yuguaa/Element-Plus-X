import type { TVueMarkdownProps } from '@components/MarkdownCore';
import type { InitShikiOptions } from './shiki';

export type MarkdownProps = {
  allowHtml?: boolean;
  enableLatex?: boolean;
  enableBreaks?: boolean;
  codeXRender?: unknown;
  codeXSlot?: unknown;
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
