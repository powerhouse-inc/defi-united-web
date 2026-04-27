import { expect, test } from '@playwright/test'

test('navigates to campaign detail page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Detail' }).first().click()
  await expect(page).toHaveURL('/campaigns/rseth-2026-04')
  await expect(page.getByRole('heading', { name: /rsETH Recovery/i })).toBeVisible()
})

test('navigates back to home from detail page', async ({ page }) => {
  await page.goto('/campaigns/rseth-2026-04')
  await page.getByRole('link', { name: 'Campaign' }).first().click()
  await expect(page).toHaveURL('/')
})

test('active nav link is highlighted', async ({ page }) => {
  await page.goto('/')
  const campaignLink = page.getByRole('link', { name: 'Campaign' }).first()
  await expect(campaignLink).toHaveAttribute('aria-current', 'page')
})

test('active nav updates on navigation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Detail' }).first().click()
  await expect(page).toHaveURL('/campaigns/rseth-2026-04')
  const detailLink = page.getByRole('link', { name: 'Detail' }).first()
  await expect(detailLink).toHaveAttribute('aria-current', 'page')
})

test('footer links navigate correctly', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()

  // Footer campaign link goes to home
  await footer.getByRole('link', { name: 'Campaign' }).click()
  await expect(page).toHaveURL('/')
})

test('external links open in new tab', async ({ context, page }) => {
  await page.goto('/')

  // Etherscan link from ContractView
  const etherscanLink = page.getByRole('link', { name: /Etherscan/ }).first()
  const href = await etherscanLink.getAttribute('href')
  expect(href).toContain('etherscan.io')
  expect(await etherscanLink.getAttribute('target')).toBe('_blank')
})
