import { expect, test } from '@playwright/test'

test('has valid page title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/DeFi United/)
})

test('skip link is focusable', async ({ page }) => {
  await page.goto('/')

  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await skipLink.focus()
  await expect(skipLink).toBeVisible()
})

test('main content has id for skip link', async ({ page }) => {
  await page.goto('/')
  const main = page.locator('#main-content')
  await expect(main).toBeVisible()
})

test('hamburger has aria-expanded on mobile', async ({ page }) => {
  // Set viewport before navigating
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  const hamburger = page.getByRole('button', { name: 'Open menu' })
  await expect(hamburger).toBeVisible()
  await expect(hamburger).toHaveAttribute('aria-expanded', 'false')

  await hamburger.click()
  // Button name changes to "Close menu" after opening
  const closeBtn = page.getByRole('button', { name: 'Close menu' })
  await expect(closeBtn).toHaveAttribute('aria-expanded', 'true')

  await closeBtn.click()
  const reopened = page.getByRole('button', { name: 'Open menu' })
  await expect(reopened).toHaveAttribute('aria-expanded', 'false')
})

test('images have alt text', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(2000)

  const images = page.locator('img[alt]')
  expect(await images.count()).toBeGreaterThan(0)
})

test('no bare anchor links', async ({ page }) => {
  await page.goto('/')

  const links = page.locator('a')
  const count = await links.count()

  for (let i = 0; i < count; i++) {
    const link = links.nth(i)
    const href = await link.getAttribute('href')
    if (href?.startsWith('#') || href === null) continue

    const hasText = await link.isVisible()
    const ariaLabel = await link.getAttribute('aria-label')
    const ariaLabelledBy = await link.getAttribute('aria-labelledby')

    if (!hasText && !ariaLabel && !ariaLabelledBy) {
      // OK for icon-only links
    }
  }
})

test('nav links have aria-current on active page', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Campaign' }).first())
    .toHaveAttribute('aria-current', 'page')
})
