<script lang="ts">
import { defineComponent, h } from 'vue';
import { CodeBlock, Mermaid } from '../index';
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
    const { codeXRender, customAttrs } = toValue(context);
    return (): ReturnType<typeof h> | null => {
      if (props.raw.inline) {
        if (codeXRender && codeXRender.inline) {
          const renderer = codeXRender.inline;
          if (typeof renderer === 'function') {
            return renderer(props);
          }
          return h(renderer, props);
        }
        const codeAttrs =
          typeof customAttrs?.code === 'function'
            ? customAttrs.code(props.raw)
            : customAttrs?.code || {};
        return h('code', { ...codeAttrs }, props.raw.content);
      }
      const { language } = props.raw;
      if (codeXRender && codeXRender[language]) {
        const renderer = codeXRender[language];
        if (typeof renderer === 'function') {
          return renderer(props);
        }
        return h(renderer, props);
      }
      if (language === 'mermaid') {
        return h(Mermaid, props);
      }
      return h(CodeBlock, props);
    };
  }
});
</script>
