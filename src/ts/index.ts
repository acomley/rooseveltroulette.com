import 'alpinejs'

import { drinks, Drink } from './data'

declare global {
  interface Window {
    init: typeof init
  }
}

function init() {
  const drink = drinks[0]
  return {
    ...drink,
    spin() {
      console.log('spin')
      const next = drinks[1]
      this.category = next.category
      this.description = next.description
      this.img = next.img
      this.name = next.name
    },
  }
}

window.init = init
