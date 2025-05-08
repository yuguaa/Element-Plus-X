import type { AppConfigProps } from './types'

export const APP_CONFIG_PROVIDE_KEY = Symbol('vue-element-plus-x-config')

export const defaultAppConfig: AppConfigProps = {
  mdPlugins: [],
  highlight: void 0,
}
