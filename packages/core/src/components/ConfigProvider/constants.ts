import type { Options } from 'markdown-it';
import type { ConfigProviderProps } from './types';
import MarkdownIt from 'markdown-it';

export const APP_CONFIG_PROVIDE_KEY = Symbol('vue-element-plus-x-config');

export const DEFAULT_MD_CONFIG: Options = {
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
};

export const defaultAppConfig: ConfigProviderProps = {
  mdPlugins: [],
  md: new MarkdownIt(DEFAULT_MD_CONFIG)
  // highlight: void 0,
};
