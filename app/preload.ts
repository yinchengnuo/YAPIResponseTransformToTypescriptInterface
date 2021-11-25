import PACKAGE from '../package.json'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    version: string
  }
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('PRELOADJS:DOMContentLoaded')
})

window.version = PACKAGE.version

export {}
