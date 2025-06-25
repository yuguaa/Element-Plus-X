<script lang="ts">
import { defineComponent, h } from 'vue';
import { CodeBlock, Line, Mermaid } from '../index';
import { useMarkdownContext } from '../MarkdownProvider';

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const context = useMarkdownContext();
    const { codeBlockRender } = toValue(context);
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
        return h(Mermaid, props);
      }
      return h(CodeBlock, props, { ...slots });
    };
  }
});
</script>
