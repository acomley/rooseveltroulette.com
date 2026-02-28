import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

interface Drink {
  attribution?: string
  description: string
  category: string
  img: string
  name: string
}

const MENU_URL = 'https://rooseveltroom.com/-beverage'
const OUTPUT = resolve(import.meta.dirname, '../src/ts/drinks.ts')

async function scrape(): Promise<Drink[]> {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  console.log(`Navigating to ${MENU_URL}...`)
  await page.goto(MENU_URL, { waitUntil: 'networkidle' })

  // Wait for dynamic content to load (SpotApps / Masonry grid)
  await page.waitForSelector('.food-item-title', { timeout: 15_000 }).catch(() => {
    console.warn('No .food-item-title elements found — menu may not be live yet.')
  })

  // Collect category tabs and click through each
  const tabs = await page.$$('.menu-category-tab, .food-menu-tab, [data-category]')

  const drinks: Drink[] = []

  async function collectFromPage() {
    const items = await page.$$('.food-item, .menu-item')
    for (const item of items) {
      const name = (await item.$eval('.food-item-title', (el) => el.textContent).catch(() => null))
        ?.trim()
        ?.toUpperCase()
      const description = (
        await item.$eval('.food-item-description', (el) => el.textContent).catch(() => null)
      )?.trim()
      const img =
        (await item.$eval('img', (el) => (el as HTMLImageElement).src).catch(() => null)) ?? ''
      const category = (
        await item.$eval('.food-item-category', (el) => el.textContent).catch(() => null)
      )
        ?.trim()
        ?.toUpperCase()

      if (name && description) {
        drinks.push({
          name,
          description,
          category: category ?? 'UNCATEGORIZED',
          img,
        })
      }
    }
  }

  if (tabs.length > 0) {
    for (const tab of tabs) {
      await tab.click()
      await page.waitForTimeout(1000)
      await collectFromPage()
    }
  } else {
    await collectFromPage()
  }

  await browser.close()
  return drinks
}

function formatDrinks(drinks: Drink[]): string {
  const lines = [
    'export interface Drink {',
    '  attribution?: string',
    '  description: string',
    '  category: string',
    '  img: string',
    '  name: string',
    '}',
    '',
    'const drinks: Drink[] = [',
  ]

  for (const drink of drinks) {
    lines.push('  {')
    if (drink.attribution) {
      lines.push(`    attribution: ${JSON.stringify(drink.attribution)},`)
    }
    lines.push('    description:')
    lines.push(`      ${JSON.stringify(drink.description)},`)
    lines.push(`    category: ${JSON.stringify(drink.category)},`)
    lines.push(`    img: ${JSON.stringify(drink.img)},`)
    lines.push(`    name: ${JSON.stringify(drink.name)},`)
    lines.push('  },')
  }

  lines.push(']')
  lines.push('')
  lines.push('export function random() {')
  lines.push('  return drinks[Math.floor(Math.random() * drinks.length)]')
  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

async function main() {
  const drinks = await scrape()

  if (drinks.length === 0) {
    console.error('No drinks found. The menu page may not be live yet.')
    console.error('The existing drinks.ts file has been left unchanged.')
    process.exit(1)
  }

  console.log(`Found ${drinks.length} drinks.`)
  const content = formatDrinks(drinks)
  writeFileSync(OUTPUT, content, 'utf-8')
  console.log(`Written to ${OUTPUT}`)
}

main()
