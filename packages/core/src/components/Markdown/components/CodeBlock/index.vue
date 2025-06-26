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
import { controlEle, expand, languageEle } from './shiki-header';
import '../../../../assets/style/shiki.scss';

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const renderLines = ref<string[]>([]);
    const firstRender = ref(true);
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
        transformers: shikiTransformers
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
        }
      },
      { immediate: true }
    );

    return () =>
      h(
        'pre',
        {
          class: `pre-md ${preClass.value}`,
          style: preStyle.value,
          key: props.raw.key,
          onVnodeUpdated(vnode) {
            if (renderLines.value.length > 0) {
              const ele = vnode.el as HTMLElement;
              if (ele && firstRender.value) {
                firstRender.value = false;
                setTimeout(() => {
                  expand(ele);
                }, 100);
              }
            }
          }
        },
        [
          h(
            'div',
            {
              class: `markdown-language-header-div el-card is-always-shadow`
            },
            slots.header?.({
              language: props.raw.language,
              lines: renderLines.value
            }) ?? [
              slots.headerLanguage?.({ language: props.raw.language }) ??
                languageEle(props.raw.language),
              slots.headerControl?.({ lines: renderLines.value }) ??
                controlEle(renderLines.value)
            ]
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
