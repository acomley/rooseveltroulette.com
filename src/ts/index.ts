import 'alpinejs'

import { random } from './drinks'

declare global {
  interface Window {
    init: typeof init
  }
}

function init() {
  return {
    drink: random(),
    spin() {
      this.drink = random()
    },
  }
}

window.init = init
