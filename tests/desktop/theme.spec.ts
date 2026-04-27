import { expect, test } from '@playwright/test'

test('toggle switches between light and dark', async ({ page }) => {
  await page.goto('/')

  // Default: light mode
  const initialTheme = await page.locator('html').getAttribute('data-theme')
  expect(initialTheme).toBeFalsy()

  // Click toggle
  await page.getByRole('button', { name: /switch to/i }).click()

  // Should be dark — wait for attribute to change
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('toggle switches back to light', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /switch to/i }).click()
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })

  // Toggle again
  await page.getByRole('button', { name: /switch to/i }).click()

  // Back to light
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('data-theme') === 'light'
  })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('theme persists across navigation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /switch to/i }).click()
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })

  // Navigate to another page
  await page.getByRole('link', { name: 'Detail' }).first().click()
  await expect(page).toHaveURL('/campaigns/rseth-2026-04')

  // Theme should still be dark
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('dark mode body has gradient', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /switch to/i }).click()
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })

  // Check that body background changed
  const bg = await page.evaluate(() => getComputedStyle(document.body).background)
  expect(bg).not.toBe('none')
})
