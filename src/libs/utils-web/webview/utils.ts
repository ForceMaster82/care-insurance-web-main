export const isBrowser = (): boolean => typeof window !== 'undefined'

export const isWebview = (): boolean =>
  isBrowser() &&
  Boolean((window as {ReactNativeWebView?: unknown}).ReactNativeWebView)
