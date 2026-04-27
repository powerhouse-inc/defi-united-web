import { expect, test } from '@playwright/test'

test('hamburger menu opens', async ({ page }) => {
  await page.goto('/')

  // Verify hamburger is visible at mobile width
  const hamburger = page.getByRole('button', { name: 'Open menu' })
  await expect(hamburger).toBeVisible()

  // Click to open
  await hamburger.click()

  // Mobile nav panel appears with links — scope to header to avoid footer nav
  const headerNav = page.locator('header nav')
  await expect(headerNav.getByRole('link', { name: 'Detail' })).toBeVisible()
})

test('mobile nav navigates to detail page', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.locator('header nav').getByRole('link', { name: 'Detail' }).click()
  await expect(page).toHaveURL('/campaigns/rseth-2026-04')
})

test('page has no horizontal overflow', async ({ page }) => {
  await page.goto('/')

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
})

test('campaign title is visible on mobile', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /rsETH Recovery/i })).toBeVisible()
})
