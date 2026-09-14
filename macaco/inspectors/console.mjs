// Console inspector: listens to the browser permanently. console.error,
// uncaught exceptions and unhandled promise rejections are all recorded with
// the step they happened in.
export function attachConsole(page, bus) {
  page.on('console', (msg) => {
    const type = msg.type()
    if (type !== 'error' && type !== 'warning') return
    const text = msg.text()
    // Resource failures are reported (better) by the network inspector.
    if (/Failed to load resource/i.test(text)) return
    const isRejection = /Uncaught \(in promise\)|unhandledrejection/i.test(text)
    bus.emit({
      category: isRejection ? 'promise-rejection' : type === 'error' ? 'console-error' : 'console-warning',
      message: text.slice(0, 1200),
      location: msg.location()?.url || '',
    })
  })
  page.on('pageerror', (error) => {
    bus.emit({ category: 'js-exception', message: `${error.name}: ${error.message}`.slice(0, 1200), stack: (error.stack || '').slice(0, 2000) })
  })
  page.on('crash', () => bus.emit({ category: 'page-crash', message: 'The browser tab crashed' }))
}
