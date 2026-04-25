import { expect, test } from '@playwright/test'

const CONTRIBUTION_ADDRESS = '0x0fCa5194baA59a362a835031d9C4A25970effE68'

test('landing page renders the contribution address', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(CONTRIBUTION_ADDRESS)).toBeVisible()
  await expect(page.getByRole('heading', { name: /rsETH Recovery/i })).toBeVisible()
})
