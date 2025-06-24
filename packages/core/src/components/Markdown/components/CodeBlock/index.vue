<script lang="ts">
import type { InitShikiOptions } from '../../shared/shikiHighlighter';
import { MARKDOWN_SHIKI_HIGHLIGHTER_THEME_KEY } from '@components/Markdown/shared';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers';
import { codeToHtml } from 'shiki';
import { defineComponent, h, ref, watch } from 'vue'; // 引入vue相关API
import { copyBtnEle, handleCopyClick, languageEle } from './shiki-header';
import '../../../../assets/style/shiki.scss';

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const renderLines = ref<string[]>([]);
    const preStyle = ref<any | null>(null);
    const preClass = ref<string | null>(null);
    const theme = inject<ComputedRef<InitShikiOptions['themes']>>(
      MARKDOWN_SHIKI_HIGHLIGHTER_THEME_KEY
    );
    const shikiTransformers = [
      transformerNotationDiff(),
      transformerNotationErrorLevel(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight()
    ];
    // 生成高亮HTML
    const generateHtml = async () => {
      const { language, content } = props.raw;

      const html = await codeToHtml(content, {
        lang: language,
        themes: theme?.value ?? {
          light: 'vitesse-light',
          dark: 'vitesse-dark'
        },
        transformers: shikiTransformers,
        defaultColor: 'light'
      });
      const parse = new DOMParser();
      const doc = parse.parseFromString(html, 'text/html');
      const preElement = doc.querySelector('pre');
      preStyle.value = preElement?.getAttribute('style');
      const preClassNames = preElement?.className;
      preClass.value = preClassNames ?? '';
      const codeElement = doc.querySelector('pre code');
      if (codeElement) {
        const lines = codeElement.querySelectorAll('.line'); // 获取所有代码行
        renderLines.value = Array.from(lines).map(line => line.outerHTML); // 存储每行HTML
      }
    };

    watch(
      () => props.raw.content,
      async content => {
        if (content) {
          await generateHtml();
          document.addEventListener('click', handleCopyClick);
        }
      },
      { immediate: true }
    );

    // 在组件卸载时释放资源
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleCopyClick);
    });

    return () =>
      h(
        'pre',
        {
          class: preClass.value,
          style: preStyle.value,
          key: props.raw.key
        },
        [
          h(
            'div',
            {
              class: `markdown-language-header-div el-card is-always-shadow`
            },
            [languageEle(props.raw.language), copyBtnEle(renderLines.value)]
          ),
          h(
            'code',
            {
              class: `language-${props.raw.language}`,
              style: {
                display: 'flex',
                flexDirection: 'column'
              }
            },
            renderLines.value.map((line, index) =>
              h('span', {
                key: index,
                innerHTML: line
              })
            )
          )
        ]
      );
  }
});
</script>
