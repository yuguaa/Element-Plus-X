<script lang="ts">
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers';
import { codeToHtml } from 'shiki';
import { defineComponent, h, ref, toValue, watch } from 'vue';
import { SHIKI_SUPPORT_LANGS, shikiThemeDefault } from '../../shared';
import { useMarkdownContext } from '../MarkdownProvider';
import {
  controlEle,
  copyCode,
  expand,
  isDark,
  languageEle,
  toggleExpand,
  toggleTheme
} from './shiki-header';
// import '../../../../assets/style/shiki.scss';
import '../../style/shiki.scss';

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const context = useMarkdownContext();
    const { codeXSlot, customAttrs } = toValue(context);
    const renderLines = ref<string[]>([]);
    const firstRender = ref(true);
    const preStyle = ref<any | null>(null);
    const preClass = ref<string | null>(null);
    const themes = computed(() => context.value.themes);
    const codeAttrs =
      typeof customAttrs?.code === 'function'
        ? customAttrs.code(props.raw)
        : customAttrs?.code || {};
    const shikiTransformers = [
      transformerNotationDiff(),
      transformerNotationErrorLevel(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight()
    ];
    // 生成高亮HTML
    const generateHtml = async () => {
      let { language, content } = props.raw;
      if (!SHIKI_SUPPORT_LANGS.includes(language)) {
        language = 'text';
      }
      const html = await codeToHtml(content, {
        lang: language,
        themes: themes?.value ?? {
          ...shikiThemeDefault
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
    const render = (slotName: string) => {
      if (!codeXSlot) {
        return h('span', {}, '');
      }
      const slotFn = codeXSlot[slotName];
      if (typeof slotFn === 'function') {
        return slotFn({
          ...props,
          renderLines: renderLines.value,
          isDark,
          toggleExpand,
          toggleTheme,
          copyCode
        });
      }
      return h(slotFn, {
        ...props,
        renderLines: renderLines.value,
        isDark,
        toggleExpand,
        toggleTheme,
        copyCode
      });
    };
    return () =>
      h(
        'div',
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
            (codeXSlot?.codeHeader && render('codeHeader')) ?? [
              (codeXSlot?.codeHeaderLanguage && render('codeHeaderLanguage')) ??
                languageEle(props.raw.language),
              (codeXSlot?.codeHeaderControl && render('codeHeaderControl')) ??
                // controlEle(renderLines.value)
                controlEle(() => {})
            ]
          ),
          h(
            'code',
            {
              class: `language-${props.raw.language}`,
              style: {
                display: 'flex',
                flexDirection: 'column'
              },
              ...codeAttrs
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
