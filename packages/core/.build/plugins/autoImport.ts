import type { PluginOption } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

const plugins: PluginOption[] = [
  AutoImport({
    imports: ['vue'],
    ignore: ['h'],
    resolvers: [ElementPlusResolver()],
    eslintrc: {
      enabled: true
    },
    dts: 'src/auto-import.d.ts'
  }) as PluginOption,
  Components({
    resolvers: [ElementPlusResolver()]
  }) as PluginOption
];

export default plugins;
