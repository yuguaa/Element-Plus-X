import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from './constants'

export function useAppConfig() {
  return inject(APP_CONFIG_PROVIDE_KEY, defaultAppConfig)
}
