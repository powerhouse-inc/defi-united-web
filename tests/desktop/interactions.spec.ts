import { expect, test } from '@playwright/test'

test('FAQ accordion opens and closes', async ({ page }) => {
  await page.goto('/')

  await page.evaluate(() => window.scrollTo(0, 3000))
  await page.waitForTimeout(1500)

  const firstTrigger = page.getByRole('button', { name: /What is DeFi United/i })
  await expect(firstTrigger).toBeVisible()

  await firstTrigger.click()
  await expect(page.getByText(/A coordinated industry response/i)).toBeVisible()

  await firstTrigger.click()
  await expect(page.getByText(/A coordinated industry response/i)).not.toBeVisible()
})

test('FAQ only one item open at a time', async ({ page }) => {
  await page.goto('/')

  await page.evaluate(() => window.scrollTo(0, 3000))
  await page.waitForTimeout(1500)

  await page.getByRole('button', { name: /What is DeFi United/i }).click()
  const firstOpen = await page.getByText(/A coordinated industry response/i).isVisible()
  expect(firstOpen).toBeTruthy()

  // Click second item — first should close
  await page.getByRole('button', { name: /Are pledges binding/i }).click()

  // First item's answer should be gone
  await expect(page.getByText(/A coordinated industry response/i)).not.toBeVisible()
  // Second item's answer should be visible
  await expect(page.getByText(/non-binding until/i)).toBeVisible()
})

test('copy button shows copied state', async ({ page }) => {
  const context = page.context()
  await context.grantPermissions(['clipboard-write'])

  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, 400))
  await page.waitForTimeout(1000)

  const copyBtn = page.getByRole('button', { name: /Copy address/i }).first()
  await expect(copyBtn).toBeVisible()
  await copyBtn.click()

  await expect(page.getByText('Copied').first()).toBeVisible({ timeout: 3000 })
})

test('contributor links navigate to detail page', async ({ page }) => {
  await page.goto('/')

  const mantleLink = page.getByRole('link', { name: 'Mantle' }).first()
  await mantleLink.click()

  await expect(page).toHaveURL(/\/contributors\//)
})

test('dependency tiles are clickable', async ({ page }) => {
  await page.goto('/')

  await page.evaluate(() => window.scrollTo(0, 1400))
  await page.waitForTimeout(1500)

  const refLink = page.getByRole('link', { name: /Open reference/i }).first()
  const href = await refLink.getAttribute('href')
  expect(href).toBeTruthy()
  expect(href).not.toBe('')
})

test('contract view has explorer links', async ({ page }) => {
  await page.goto('/')

  await page.evaluate(() => window.scrollTo(0, 300))
  await page.waitForTimeout(1000)

  const etherscanLink = page.getByRole('link', { name: /Etherscan/ }).first()
  await expect(etherscanLink).toBeVisible()
  expect(await etherscanLink.getAttribute('href')).toContain('etherscan.io')
})
