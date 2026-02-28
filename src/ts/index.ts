import '../css/style.css'
import { type Drink, categories, findByName, randomFiltered } from './drinks'

const CATEGORY_COLORS: Record<string, string> = {
  'HOUSE CREATIONS': '#f59e0b',
  'RR CLASSIC CREATIONS': '#d97706',
  'EARLY YEARS (PRE-1880)': '#eab308',
  'TURN OF THE CENTURY (1880-1919)': '#22c55e',
  'PROHIBITION (1920-1933)': '#ef4444',
  'POST VOLSTEAD (1933-1950S)': '#a78bfa',
  'TIKI (1930S-1970S)': '#2dd4bf',
  'DARK AGES (1950S-1990S)': '#818cf8',
  'MODERN CLASSICS (2000S-PRESENT)': '#f472b6',
}

const FALLBACK_IMG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="256" fill="#27272a"><rect width="400" height="256"/><text x="200" y="138" text-anchor="middle" fill="#52525b" font-family="system-ui" font-size="14">Image unavailable</text></svg>',
)}`

const SPIN_DURATION = 2200
const DESKTOP_CARD_COUNT = 8
const MOBILE_CARD_COUNT = 5
const MOBILE_BREAKPOINT = 768

function isMobile(): boolean {
  return window.innerWidth < MOBILE_BREAKPOINT
}

function getCardCount(): number {
  return isMobile() ? MOBILE_CARD_COUNT : DESKTOP_CARD_COUNT
}

/** Back ease-out: fast start, smooth decel, subtle overshoot, settle */
function reelEase(t: number): number {
  const c1 = 0.5
  const c3 = c1 + 1
  const u = t - 1
  return 1 + c3 * u * u * u + c1 * u * u
}

function createReelCard(drink: Drink): HTMLElement {
  const card = document.createElement('div')
  card.className = 'reel-card'

  const imgWrapper = document.createElement('div')
  imgWrapper.className = 'reel-card-image-wrapper'

  const img = document.createElement('img')
  img.className = 'reel-card-image'
  img.alt = drink.name
  img.loading = 'eager'
  img.src = drink.img
  img.onerror = () => {
    img.onerror = null
    img.src = FALLBACK_IMG
  }

  imgWrapper.appendChild(img)

  const body = document.createElement('div')
  body.className = 'reel-card-body'

  const cat = document.createElement('p')
  cat.className = 'reel-card-category'
  cat.textContent = drink.category
  cat.style.color = CATEGORY_COLORS[drink.category] ?? '#d97706'

  const name = document.createElement('p')
  name.className = 'reel-card-name'
  name.textContent = drink.name

  const attribution = document.createElement('p')
  attribution.className = 'reel-card-attribution'
  attribution.textContent = drink.attribution ?? ''

  const desc = document.createElement('p')
  desc.className = 'reel-card-description'
  desc.textContent = drink.description

  body.append(cat, name, attribution, desc)
  card.append(imgWrapper, body)

  return card
}

/** Lazy AudioContext for tick sounds */
let audioCtx: AudioContext | null = null

function playTick() {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.frequency.value = 800
  gain.gain.value = 0.06
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)
  osc.start()
  osc.stop(audioCtx.currentTime + 0.05)
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function init() {
  const button = document.getElementById('spin-button') as HTMLButtonElement
  const reelFrame = document.getElementById('reel-frame') as HTMLElement
  const reelTrack = document.getElementById('reel-track') as HTMLElement
  const emptyState = document.getElementById('empty-state') as HTMLElement
  const filter = document.getElementById('category-filter') as HTMLSelectElement
  let lastDrink: Drink | undefined
  let spinning = false
  let cardHeight = reelFrame.offsetHeight

  // Track card height via ResizeObserver
  const ro = new ResizeObserver(() => {
    cardHeight = reelFrame.offsetHeight
  })
  ro.observe(reelFrame)

  // Populate category filter
  for (const cat of categories()) {
    const opt = document.createElement('option')
    opt.value = cat
    opt.textContent = cat
    filter.appendChild(opt)
  }

  // Deep link: ?drink=NAME
  const params = new URLSearchParams(window.location.search)
  const drinkParam = params.get('drink')
  if (drinkParam) {
    const linked = findByName(drinkParam)
    if (linked) {
      emptyState.hidden = true
      reelTrack.innerHTML = ''
      const card = createReelCard(linked)
      card.style.height = `${cardHeight}px`
      reelTrack.appendChild(card)
      lastDrink = linked
    }
  }

  function spin() {
    if (spinning) return
    spinning = true
    button.disabled = true
    button.classList.add('spinning')
    emptyState.hidden = true

    // Init audio on first user gesture
    if (!audioCtx) {
      try {
        audioCtx = new AudioContext()
      } catch {
        // Audio not available
      }
    }

    const selectedCategory = filter.value || null
    const totalCards = getCardCount()
    const winner = randomFiltered(selectedCategory, lastDrink)
    lastDrink = winner

    // Build strip: (totalCards - 1) random previews + winner as last
    const strip: Drink[] = []
    for (let i = 0; i < totalCards - 1; i++) {
      strip.push(randomFiltered(selectedCategory))
    }
    strip.push(winner)

    // Preload winner image in parallel
    const winnerImgWrapper = { el: null as HTMLElement | null }
    preloadImage(winner.img).then(() => {
      if (winnerImgWrapper.el) {
        winnerImgWrapper.el.classList.remove('shimmer')
      }
    })

    // Render strip
    reelTrack.innerHTML = ''
    reelTrack.style.transform = 'translateY(0)'
    for (let i = 0; i < strip.length; i++) {
      const card = createReelCard(strip[i])
      card.style.height = `${cardHeight}px`
      if (i === strip.length - 1) {
        // Winner card — add shimmer until image loads
        const wrapper = card.querySelector('.reel-card-image-wrapper') as HTMLElement
        wrapper.classList.add('shimmer')
        winnerImgWrapper.el = wrapper
      }
      reelTrack.appendChild(card)
    }

    // Animate: scroll through (totalCards - 1) cards to land on last
    const totalDistance = (totalCards - 1) * cardHeight
    let start: number | null = null
    let lastTickIndex = -1

    function frame(ts: number) {
      if (!start) start = ts
      const elapsed = ts - start
      const t = Math.min(elapsed / SPIN_DURATION, 1)
      const eased = reelEase(t)
      const y = eased * totalDistance

      reelTrack.style.transform = `translateY(${-y}px)`

      // Tick sound on card boundary crossing
      const tickIndex = Math.floor(y / cardHeight)
      if (tickIndex > lastTickIndex) {
        lastTickIndex = tickIndex
        playTick()
      }

      if (t < 1) {
        requestAnimationFrame(frame)
      } else {
        land()
      }
    }

    requestAnimationFrame(frame)

    function land() {
      // Winner highlight
      const lastCard = reelTrack.lastElementChild as HTMLElement
      if (lastCard) lastCard.classList.add('winner')

      // Landing glow on frame
      reelFrame.classList.add('landing-glow')
      setTimeout(() => reelFrame.classList.remove('landing-glow'), 600)

      // Re-enable
      button.disabled = false
      button.classList.remove('spinning')
      spinning = false
    }
  }

  button.addEventListener('click', spin)

  // Swipe up on reel frame to spin
  let touchStartY = 0
  reelFrame.addEventListener(
    'touchstart',
    (e) => {
      touchStartY = e.touches[0].clientY
    },
    { passive: true },
  )

  reelFrame.addEventListener(
    'touchend',
    (e) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (deltaY > 50) spin()
    },
    { passive: true },
  )

}

document.addEventListener('DOMContentLoaded', init)
