import type { App } from 'vue';
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
import Theme from 'vitepress/theme';
import Layout from '../home/layout.vue';
import 'virtual:group-icons.css';

import './style.css';
import './markdown.css';
import 'virtual:uno.css';

export default {
  ...Theme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('demo', AntdTheme);
  }
};
