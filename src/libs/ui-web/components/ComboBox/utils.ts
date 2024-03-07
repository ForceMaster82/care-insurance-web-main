export const preventBrowserBack = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    const isAndroid = /(android)/i.test(window.navigator.userAgent)

    if (isAndroid) {
      window.history.pushState(null, '', window.location.href)
      // eslint-disable-next-line unicorn/prefer-add-event-listener
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href)
        callback()
      }
    }
  }
}

export const restorePreventBrowserBack = () => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    window.onpopstate = undefined
  }
}
