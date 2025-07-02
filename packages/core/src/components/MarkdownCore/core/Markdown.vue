<script setup lang="ts">
import type { Root } from 'hast';
import type { Options as TRehypeOptions } from 'mdast-util-to-hast';
import type { PluggableList } from 'unified';
import type { CustomAttrs, SanitizeOptions } from './types';
import { useMarkdownContext } from '@components/MarkdownProvider/hooks';
import { render } from './hast-to-vnode';
import { useMarkdownProcessor } from './useProcessor';

interface MarkdownProps {
  markdown: string;
  customAttrs?: CustomAttrs;
  remarkPlugins?: PluggableList;
  rehypePlugins?: PluggableList;
  rehypeOptions?: Omit<TRehypeOptions, 'file'>;
  sanitize?: boolean;
  sanitizeOptions?: SanitizeOptions;
}

const props = defineProps<MarkdownProps>();

const context = useMarkdownContext();

const markdown = computed(() => {
  return props.markdown ?? context.markdown;
});
const customAttrs = computed(() => {
  return {
    ...(context.customAttrs ?? {}),
    ...(props.customAttrs ?? {})
  };
});
const remarkPlugins = computed(() => {
  return [...(context.remarkPlugins ?? []), ...(props.remarkPlugins ?? [])];
});
const rehypePlugins = computed(() => {
  return [...(context.rehypePlugins ?? []), ...(props.rehypePlugins ?? [])];
});
const rehypeOptions = computed(() => {
  return {
    ...(context.rehypeOptions ?? {}),
    ...(props.rehypeOptions ?? {})
  };
});
const sanitize = computed(() => {
  return props.sanitize ?? context.sanitize;
});
const sanitizeOptions = computed(() => {
  return {
    ...(context.sanitizeOptions ?? {}),
    ...(props.sanitizeOptions ?? {})
  };
});

const { processor } = useMarkdownProcessor({
  remarkPlugins,
  rehypePlugins,
  rehypeOptions,
  sanitize,
  sanitizeOptions
});

const attrs = useAttrs();
const slots = useSlots();

const renderMarkdown = computed(() => {
  const mdast = processor.value.parse(markdown.value);
  const hast = processor.value.runSync(mdast) as Root;
  return render(hast, attrs, slots, customAttrs.value);
});
</script>

<template>
  <div v-html="renderMarkdown" />
</template>
