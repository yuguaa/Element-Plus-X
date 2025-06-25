<script lang="ts">
import { defineComponent, h, toValue } from 'vue';
import { CodeBlock, Line, Mermaid } from '../index';
import { useMarkdownContext } from '../MarkdownProvider';

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const context = useMarkdownContext();
    const { codeBlockRender, mermaidConfig } = toValue(context);
    return (): ReturnType<typeof h> | null => {
      if (props.raw.inline) {
        if (codeBlockRender && codeBlockRender.inline) {
          const renderer = codeBlockRender.inline;
          if (typeof renderer === 'function') {
            return renderer(props);
          }
          return h(renderer, props);
        }
        return h(Line, props);
      }
      const { language } = props.raw;
      if (codeBlockRender && codeBlockRender[language]) {
        const renderer = codeBlockRender[language];
        if (typeof renderer === 'function') {
          return renderer(props);
        }
        return h(renderer, props);
      }
      if (language === 'mermaid') {
        // 如果有 mermaidConfig，传递给 Mermaid 组件
        const mermaidProps = {
          ...props,
          ...(mermaidConfig && { toolbarConfig: mermaidConfig })
        };
        return h(Mermaid, mermaidProps);
      }
      return h(CodeBlock, props);
    };
  }
});
</script>
