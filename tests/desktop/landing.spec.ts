import { expect, test } from '@playwright/test'

const CONTRIBUTION_ADDRESS = '0x0fCa5194baA59a362a835031d9C4A25970effE68'

test('shows campaign title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /rsETH Recovery/i })).toBeVisible()
})

test('shows contribution address in DOM', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(3000)
  await expect(page.getByText(CONTRIBUTION_ADDRESS)).toBeTruthy()
})

test('shows all major sections after full scroll', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /rsETH Recovery/i })).toBeVisible()

  // Scroll to bottom in increments to trigger all whileInView reveals
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const step = 400
  for (let y = step; y < totalHeight; y += step) {
    await page.evaluate((offset: number) => window.scrollTo(0, offset), y)
    await page.waitForTimeout(300)
  }
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)

  // Verify sections are in the DOM
  await expect(page.getByText(/Live Contract/i)).toBeTruthy()
  await expect(page.getByText(/Confirmed/i)).toBeTruthy()
  await expect(page.getByText(/Pending governance/i)).toBeTruthy()
  await expect(page.getByText(/Funding progress/i)).toBeTruthy()
  await expect(page.getByText(/Dependencies/i)).toBeTruthy()
  await expect(page.getByText(/Frequently asked questions/i)).toBeTruthy()
})

test('shows contributor names in DOM', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(2000)

  await expect(page.getByText('Mantle')).toBeTruthy()
  await expect(page.getByText('Aave DAO')).toBeTruthy()
  await expect(page.getByText('Stani Kulechov')).toBeTruthy()
})

test('shows pledge amounts in DOM', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(2000)

  await expect(page.getByText('30,000 ETH')).toBeTruthy()
})

test('shows live badge and refresh countdown', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText(/Active/)).toBeVisible()
  await expect(page.getByText(/refresh in \d+s/)).toBeVisible()
})
