<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from './constants';

const props = withDefaults(defineProps<ConfigProviderProps>(), {});

provide<ConfigProviderProps>(APP_CONFIG_PROVIDE_KEY, {
  md: props.md ?? defaultAppConfig.md,
  mdPlugins: props.mdPlugins ?? defaultAppConfig.mdPlugins
  // highlight: props.highlight ?? defaultAppConfig.highlight,
});
</script>

<template>
  <slot />
</template>

<style scoped lang="scss" src="./style.scss"></style>
