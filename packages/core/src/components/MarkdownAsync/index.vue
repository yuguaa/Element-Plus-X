<script lang="ts" setup>
import type { MarkdownProps } from '../MarkdownCore/shared/types';
import { MarkdownRendererAsync } from '../MarkdownCore';
import { useMarkdownContext } from '../MarkdownCore/components/MarkdownProvider';
import { DEFAULT_PROPS } from '../MarkdownCore/shared/constants';
import '../../assets/style/katex.min.css';

const props = withDefaults(defineProps<MarkdownProps>(), DEFAULT_PROPS);

const slots = useSlots();
const customComponents = useMarkdownContext();
</script>

<template>
  <div class="elx-markdown-container">
    <MarkdownRendererAsync v-bind="props">
      <template
        v-for="(slot, name) in customComponents"
        :key="name"
        #[name]="slotProps"
      >
        <component :is="slot" v-bind="slotProps" />
      </template>
      <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </MarkdownRendererAsync>
  </div>
</template>
