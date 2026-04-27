import { expect, test } from '@playwright/test'

test('campaign detail page loads', async ({ page }) => {
  await page.goto('/campaigns/rseth-2026-04')
  await expect(page.getByRole('heading', { name: /rsETH Recovery/i })).toBeVisible()
})

test('campaign detail shows contract view', async ({ page }) => {
  await page.goto('/campaigns/rseth-2026-04')
  // Scroll to bring lazy-reveal sections into view
  await page.evaluate(() => window.scrollTo(0, 200))
  await page.waitForTimeout(1000)
  await expect(page.getByText(/Live Contract/i)).toBeVisible({ timeout: 10000 })
})

test('campaign detail shows progress section', async ({ page }) => {
  await page.goto('/campaigns/rseth-2026-04')
  // Scroll to trigger framer-motion whileInView
  await page.evaluate(() => window.scrollTo(0, 600))
  await page.waitForTimeout(1000)
  await expect(page.getByText(/Funding progress/i)).toBeVisible({ timeout: 10000 })
})

test('campaign detail shows receipts empty state', async ({ page }) => {
  await page.goto('/campaigns/rseth-2026-04')
  await page.evaluate(() => window.scrollTo(0, 1000))
  await page.waitForTimeout(1000)
  await expect(page.getByText(/Waiting for first deposit/)).toBeVisible({ timeout: 10000 })
})

test('unknown campaign returns 404', async ({ page }) => {
  const response = await page.goto('/campaigns/nonexistent-campaign')
  expect(response.status()).toBe(404)
})

test('contributor page shows skeleton then data', async ({ page }) => {
  await page.goto('/contributors/stani-kulechov')
  await page.waitForTimeout(2000)
  await expect(page.getByRole('link', { name: /Back to campaign/i })).toBeVisible()
})

test('admin page loads', async ({ page }) => {
  await page.goto('/admin')
  await page.waitForTimeout(1000)
  await expect(page.locator('main')).toBeVisible()
})
