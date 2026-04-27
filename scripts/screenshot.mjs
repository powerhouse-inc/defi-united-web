import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:3002'
const out = process.argv[3] ?? '/tmp/landing.png'

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
await page.goto(url, { waitUntil: 'networkidle' })
// Give framer-motion initial reveals time to settle so the screenshot is clean.
await page.waitForTimeout(900)
await page.screenshot({ path: out, fullPage: false })
console.log(`screenshot → ${out}`)
await browser.close()
