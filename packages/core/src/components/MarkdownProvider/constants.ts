import type { InitShikiOptions } from '../XMarkdownCore/shared';

export const MARKDOWN_PROVIDER_KEY = Symbol(
  'vue-element-plus-x-markdown-provider'
);

export const shikiThemeDefault: InitShikiOptions['themes'] = {
  light: 'vitesse-light',
  dark: 'vitesse-dark'
};
