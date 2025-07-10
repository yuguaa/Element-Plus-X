// vite.config.ts
import vueJsx from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Unocss from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/unplugin-auto-import/dist/vite.js";
import ElementPlus from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/unplugin-element-plus/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/vite-plugin-eslint/dist/index.mjs";
import { tsxAutoProps } from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/vite-plugin-tsx-auto-props/dist/index.js";
import vitepressDemo from "file:///E:/%E6%A1%8C%E9%9D%A2%E6%96%87%E4%BB%B6/githubb/Element-Plus-X/node_modules/vite-plugin-vitepress-demo/dist/index.js";

// scripts/vue-element-plus-x-resolver.ts
function tovUIResolver() {
  return {
    type: "component",
    resolve(name) {
      if (name.startsWith("El") || name.startsWith("el")) {
        return {
          name,
          from: "element-plus"
        };
      }
      if (name === "ClientOnly") {
        return null;
      }
      return {
        name,
        from: "vue-element-plus-x"
      };
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    AutoImport({
      imports: ["vue"],
      ignore: ["h", "ClientOnly"],
      resolvers: [ElementPlusResolver({
        exclude: /ElButtonGroup/
        // 忽略自动导入 ElButtonGroup
      })]
    }),
    Components({
      resolvers: [
        tovUIResolver(),
        ElementPlusResolver()
      ]
    }),
    tsxAutoProps(),
    vitepressDemo({
      // 我们让他自动搜索，我们所有项目中的demos下的vue文件
      // glob: ['**/demos/*.vue'],
    }),
    vueJsx(),
    Unocss(),
    // eslint-disable-next-line ts/no-unsafe-call
    eslintPlugin({
      include: ["packages/**/*.js", "packages/**/*.vue", "packages/**/*.ts"],
      // 根据你的项目结构调整路径
      exclude: [
        "**/node_modules/**",
        "**/.gitignore",
        "**/dist/**",
        "**/cache/**"
      ]
    }),
    ElementPlus({})
  ],
  // 我们使用vite中给我们提供的resolve配置项中的alias来实现一个重命名。
  resolve: {
    alias: [
      // {
      //   // 我们复制我们的utils中的配置，直接修改一下
      //   find: /^vue-element-plus-x/,
      //   // 然后再把utils替换成vue-element-plus-x，这样我们就完成了配置
      //   replacement: path.resolve(baseUrl, 'packages/vue-element-plus-x/src'),
      // },
      // {
      //   // 我们通过正则表达式去匹配以@vue-element-plus-x/utils的导入配置
      //   find: /^@vue-element-plus-x\/utils/,
      //   // 然后我们把路径替换成绝对路径地址
      //   replacement: path.resolve(baseUrl, 'packages/utils/src'),
      // },
      // {
      //   // 我们通过正则表达式去匹配以@vue-element-plus-x/icons
      //   find: /^@vue-element-plus-x\/icons/,
      //   // 然后我们把路径替换成绝对路径地址
      //   replacement: path.resolve(baseUrl, 'packages/icons/src'),
      // },
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy92dWUtZWxlbWVudC1wbHVzLXgtcmVzb2x2ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTY4NENcdTk3NjJcdTY1ODdcdTRFRjZcXFxcZ2l0aHViYlxcXFxFbGVtZW50LVBsdXMtWFxcXFxhcHBzXFxcXGRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFx1Njg0Q1x1OTc2Mlx1NjU4N1x1NEVGNlxcXFxnaXRodWJiXFxcXEVsZW1lbnQtUGx1cy1YXFxcXGFwcHNcXFxcZG9jc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovJUU2JUExJThDJUU5JTlEJUEyJUU2JTk2JTg3JUU0JUJCJUI2L2dpdGh1YmIvRWxlbWVudC1QbHVzLVgvYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4sIFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbi8vIGltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuLy8gaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBFbGVtZW50UGx1cyBmcm9tICd1bnBsdWdpbi1lbGVtZW50LXBsdXMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXHJcbmltcG9ydCB7IHRzeEF1dG9Qcm9wcyB9IGZyb20gJ3ZpdGUtcGx1Z2luLXRzeC1hdXRvLXByb3BzJ1xyXG4vLyBcdTVCRkNcdTUxNjVkZW1vXHU2M0QyXHU0RUY2XHJcbmltcG9ydCB2aXRlcHJlc3NEZW1vIGZyb20gJ3ZpdGUtcGx1Z2luLXZpdGVwcmVzcy1kZW1vJ1xyXG5pbXBvcnQgeyB0b3ZVSVJlc29sdmVyIH0gZnJvbSAnLi9zY3JpcHRzL3Z1ZS1lbGVtZW50LXBsdXMteC1yZXNvbHZlcidcclxuXHJcbi8vIFx1OEJGQlx1NTNENlx1NjIxMVx1NEVFQ1x1NUY1M1x1NTI0RFx1NzY4NFx1NjgzOVx1NzZFRVx1NUY1NVxyXG4vLyBjb25zdCBiYXNlVXJsID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogW1widnVlXCJdLFxyXG4gICAgICBpZ25vcmU6IFsnaCcsICdDbGllbnRPbmx5J10sXHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoe1xyXG4gICAgICAgIGV4Y2x1ZGU6IC9FbEJ1dHRvbkdyb3VwLyAvLyBcdTVGRkRcdTc1NjVcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxCdXR0b25Hcm91cFxyXG4gICAgICB9KV0sXHJcbiAgICB9KSBhcyBQbHVnaW5PcHRpb24sXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgdG92VUlSZXNvbHZlcigpLFxyXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcclxuICAgICAgXSxcclxuICAgIH0pIGFzIFBsdWdpbk9wdGlvbixcclxuICAgIHRzeEF1dG9Qcm9wcygpLFxyXG4gICAgdml0ZXByZXNzRGVtbyh7XHJcbiAgICAgIC8vIFx1NjIxMVx1NEVFQ1x1OEJBOVx1NEVENlx1ODFFQVx1NTJBOFx1NjQxQ1x1N0QyMlx1RkYwQ1x1NjIxMVx1NEVFQ1x1NjI0MFx1NjcwOVx1OTg3OVx1NzZFRVx1NEUyRFx1NzY4NGRlbW9zXHU0RTBCXHU3Njg0dnVlXHU2NTg3XHU0RUY2XHJcbiAgICAgIC8vIGdsb2I6IFsnKiovZGVtb3MvKi52dWUnXSxcclxuICAgIH0pIGFzIFBsdWdpbk9wdGlvbixcclxuXHJcbiAgICB2dWVKc3goKSBhcyBQbHVnaW5PcHRpb24sXHJcbiAgICBVbm9jc3MoKSBhcyBQbHVnaW5PcHRpb24sXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdHMvbm8tdW5zYWZlLWNhbGxcclxuICAgIGVzbGludFBsdWdpbih7XHJcbiAgICAgIGluY2x1ZGU6IFsncGFja2FnZXMvKiovKi5qcycsICdwYWNrYWdlcy8qKi8qLnZ1ZScsICdwYWNrYWdlcy8qKi8qLnRzJ10sIC8vIFx1NjgzOVx1NjM2RVx1NEY2MFx1NzY4NFx1OTg3OVx1NzZFRVx1N0VEM1x1Njc4NFx1OEMwM1x1NjU3NFx1OERFRlx1NUY4NFxyXG4gICAgICBleGNsdWRlOiBbXHJcbiAgICAgICAgJyoqL25vZGVfbW9kdWxlcy8qKicsXHJcbiAgICAgICAgJyoqLy5naXRpZ25vcmUnLFxyXG4gICAgICAgICcqKi9kaXN0LyoqJyxcclxuICAgICAgICAnKiovY2FjaGUvKionLFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICBFbGVtZW50UGx1cyh7fSkgYXMgUGx1Z2luT3B0aW9uLFxyXG4gIF0gYXMgUGx1Z2luW10sXHJcbiAgLy8gXHU2MjExXHU0RUVDXHU0RjdGXHU3NTI4dml0ZVx1NEUyRFx1N0VEOVx1NjIxMVx1NEVFQ1x1NjNEMFx1NEY5Qlx1NzY4NHJlc29sdmVcdTkxNERcdTdGNkVcdTk4NzlcdTRFMkRcdTc2ODRhbGlhc1x1Njc2NVx1NUI5RVx1NzNCMFx1NEUwMFx1NEUyQVx1OTFDRFx1NTQ3RFx1NTQwRFx1MzAwMlxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiBbXHJcbiAgICAgIC8vIHtcclxuICAgICAgLy8gICAvLyBcdTYyMTFcdTRFRUNcdTU5MERcdTUyMzZcdTYyMTFcdTRFRUNcdTc2ODR1dGlsc1x1NEUyRFx1NzY4NFx1OTE0RFx1N0Y2RVx1RkYwQ1x1NzZGNFx1NjNBNVx1NEZFRVx1NjUzOVx1NEUwMFx1NEUwQlxyXG4gICAgICAvLyAgIGZpbmQ6IC9ednVlLWVsZW1lbnQtcGx1cy14LyxcclxuICAgICAgLy8gICAvLyBcdTcxMzZcdTU0MEVcdTUxOERcdTYyOEF1dGlsc1x1NjZGRlx1NjM2Mlx1NjIxMHZ1ZS1lbGVtZW50LXBsdXMteFx1RkYwQ1x1OEZEOVx1NjgzN1x1NjIxMVx1NEVFQ1x1NUMzMVx1NUI4Q1x1NjIxMFx1NEU4Nlx1OTE0RFx1N0Y2RVxyXG4gICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoYmFzZVVybCwgJ3BhY2thZ2VzL3Z1ZS1lbGVtZW50LXBsdXMteC9zcmMnKSxcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIC8vIFx1NjIxMVx1NEVFQ1x1OTAxQVx1OEZDN1x1NkI2M1x1NTIxOVx1ODg2OFx1OEZCRVx1NUYwRlx1NTNCQlx1NTMzOVx1OTE0RFx1NEVFNUB2dWUtZWxlbWVudC1wbHVzLXgvdXRpbHNcdTc2ODRcdTVCRkNcdTUxNjVcdTkxNERcdTdGNkVcclxuICAgICAgLy8gICBmaW5kOiAvXkB2dWUtZWxlbWVudC1wbHVzLXhcXC91dGlscy8sXHJcbiAgICAgIC8vICAgLy8gXHU3MTM2XHU1NDBFXHU2MjExXHU0RUVDXHU2MjhBXHU4REVGXHU1Rjg0XHU2NkZGXHU2MzYyXHU2MjEwXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHU1NzMwXHU1NzQwXHJcbiAgICAgIC8vICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShiYXNlVXJsLCAncGFja2FnZXMvdXRpbHMvc3JjJyksXHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIC8vIHtcclxuICAgICAgLy8gICAvLyBcdTYyMTFcdTRFRUNcdTkwMUFcdThGQzdcdTZCNjNcdTUyMTlcdTg4NjhcdThGQkVcdTVGMEZcdTUzQkJcdTUzMzlcdTkxNERcdTRFRTVAdnVlLWVsZW1lbnQtcGx1cy14L2ljb25zXHJcbiAgICAgIC8vICAgZmluZDogL15AdnVlLWVsZW1lbnQtcGx1cy14XFwvaWNvbnMvLFxyXG4gICAgICAvLyAgIC8vIFx1NzEzNlx1NTQwRVx1NjIxMVx1NEVFQ1x1NjI4QVx1OERFRlx1NUY4NFx1NjZGRlx1NjM2Mlx1NjIxMFx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1NTczMFx1NTc0MFxyXG4gICAgICAvLyAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoYmFzZVVybCwgJ3BhY2thZ2VzL2ljb25zL3NyYycpLFxyXG4gICAgICAvLyB9LFxyXG4gICAgXSxcclxuICB9LFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFx1Njg0Q1x1OTc2Mlx1NjU4N1x1NEVGNlxcXFxnaXRodWJiXFxcXEVsZW1lbnQtUGx1cy1YXFxcXGFwcHNcXFxcZG9jc1xcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxcdTY4NENcdTk3NjJcdTY1ODdcdTRFRjZcXFxcZ2l0aHViYlxcXFxFbGVtZW50LVBsdXMtWFxcXFxhcHBzXFxcXGRvY3NcXFxcc2NyaXB0c1xcXFx2dWUtZWxlbWVudC1wbHVzLXgtcmVzb2x2ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LyVFNiVBMSU4QyVFOSU5RCVBMiVFNiU5NiU4NyVFNCVCQiVCNi9naXRodWJiL0VsZW1lbnQtUGx1cy1YL2FwcHMvZG9jcy9zY3JpcHRzL3Z1ZS1lbGVtZW50LXBsdXMteC1yZXNvbHZlci50c1wiO2ltcG9ydCB0eXBlIHsgQ29tcG9uZW50UmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG92VUlSZXNvbHZlcigpOiBDb21wb25lbnRSZXNvbHZlciB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6ICdjb21wb25lbnQnLFxyXG4gICAgcmVzb2x2ZShuYW1lKSB7XHJcbiAgICAgIC8vIC8vIFx1NTkyN1x1NUJCNlx1NTNFRlx1NEVFNVx1NzcwQlx1NTIzMFx1NjIxMVx1NEVFQ1x1OEZEOVx1OTFDQ1x1NjI1M1x1NTM3MFx1NTFGQVx1Njc2NVx1NzY4NFx1NjYyRiBUQnV0dG9uXHVGRjBDXHU2MjQwXHU0RUU1XHU2MjExXHU0RUVDXHU1QzMxXHU1M0VGXHU0RUU1XHU1MjI0XHU2NUFEXHU0RTAwXHU0RTBCXHU2NjJGXHU0RTBEXHU2NjJGXHU2MjExXHU0RUVDXHU3Njg0XHU0RUU1VFx1NUYwMFx1NTkzNFx1NzY4NFx1N0VDNFx1NEVGNlxyXG4gICAgICAvLyBpZiAobmFtZSA9PT0gJ1RCdXR0b24nKSB7XHJcbiAgICAgIC8vICAgLy8gXHU1OTgyXHU2NzlDXHU2NjJGXHU0RUU1VFx1NUYwMFx1NTkzNFx1NzY4NFx1N0VDNFx1NEVGNlx1RkYwQ1x1NjIxMVx1NEVFQ1x1OTcwMFx1ODk4MVx1ODFFQVx1NTJBOFx1NTJBMFx1OEY3RFx1OEZEQlx1Njc2NVx1MzAwMlxyXG4gICAgICAvLyAgIHJldHVybiB7XHJcbiAgICAgIC8vICAgICAvLyBcdTU2RTBcdTRFM0FcdTYyMTFcdTRFRUNcdTUxOERcdTVCRkNcdTUxRkFcdTc2ODRcdTY1RjZcdTUwMTlcdTVFNzZcdTZDQTFcdTY3MDlcdTUyMzBcdTU5MDRcdTUyNERcdTdGMDBUXHU2MjQwXHU0RUU1XHU2MjExXHU0RUVDXHU4OTgxXHU1MjIwXHU5NjY0XHU2Mzg5XHU1MjREXHU3RjAwXHJcbiAgICAgIC8vICAgICBuYW1lOiBuYW1lLnNsaWNlKDEpLFxyXG4gICAgICAvLyAgICAgZnJvbTogJ2VsZW1lbnQtcGx1cy14JyxcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ0VsJykgfHwgbmFtZS5zdGFydHNXaXRoKCdlbCcpKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICBmcm9tOiAnZWxlbWVudC1wbHVzJyxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBcdTc5RkJcdTk2NjQgQ2xpZW50T25seSBcdTdFQzRcdTRFRjZcclxuICAgICAgaWYgKG5hbWUgPT09ICdDbGllbnRPbmx5Jykge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZnJvbTogJ3Z1ZS1lbGVtZW50LXBsdXMteCcsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxtQkFBbUI7OztBQ1huQixTQUFTLGdCQUFtQztBQUNqRCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLE1BQU07QUFXWixVQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxXQUFXLElBQUksR0FBRztBQUNsRCxlQUFPO0FBQUEsVUFDTDtBQUFBLFVBQ0EsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBR0EsVUFBSSxTQUFTLGNBQWM7QUFDekIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QURmQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsS0FBSztBQUFBLE1BQ2YsUUFBUSxDQUFDLEtBQUssWUFBWTtBQUFBLE1BQzFCLFdBQVcsQ0FBQyxvQkFBb0I7QUFBQSxRQUM5QixTQUFTO0FBQUE7QUFBQSxNQUNYLENBQUMsQ0FBQztBQUFBLElBQ0osQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBLFFBQ1QsY0FBYztBQUFBLFFBQ2Qsb0JBQW9CO0FBQUEsTUFDdEI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGFBQWE7QUFBQSxJQUNiLGNBQWM7QUFBQTtBQUFBO0FBQUEsSUFHZCxDQUFDO0FBQUEsSUFFRCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxJQUVQLGFBQWE7QUFBQSxNQUNYLFNBQVMsQ0FBQyxvQkFBb0IscUJBQXFCLGtCQUFrQjtBQUFBO0FBQUEsTUFDckUsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxZQUFZLENBQUMsQ0FBQztBQUFBLEVBQ2hCO0FBQUE7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQW1CUDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
