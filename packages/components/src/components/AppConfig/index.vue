<script setup lang="ts">
import type { AppConfigProps } from './types'
import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from './constants'

const props = withDefaults(defineProps<AppConfigProps>(), {
})

provide<AppConfigProps>(APP_CONFIG_PROVIDE_KEY, {
  mdPlugins: props.mdPlugins ?? defaultAppConfig.mdPlugins,
  highlight: props.highlight ?? defaultAppConfig.highlight,
})
</script>

<template>
  <slot />
</template>
