<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { APP_CONFIG_PROVIDE_KEY, DEFAULT_APP_CONFIG } from './constants';

const props = withDefaults(defineProps<ConfigProviderProps>(), {});

provide<ConfigProviderProps>(APP_CONFIG_PROVIDE_KEY, {
  md: props.md ?? DEFAULT_APP_CONFIG.md,
  mdPlugins: props.mdPlugins ?? DEFAULT_APP_CONFIG.mdPlugins
});
</script>

<template>
  <slot />
</template>

<style scoped lang="scss" src="./style.scss"></style>
