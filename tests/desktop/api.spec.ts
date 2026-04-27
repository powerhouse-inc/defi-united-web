import { expect, test } from '@playwright/test'

test('OG image endpoint returns SVG', async ({ request }) => {
  const response = await request.get('/api/og')
  expect(response.ok()).toBeTruthy()
  expect(response.headers()['content-type']).toContain('image/svg+xml')
})

test('OG image contains campaign data', async ({ request }) => {
  const response = await request.get('/api/og')
  const svg = await response.text()

  expect(svg).toContain('rsETH Recovery')
  expect(svg).toContain('DeFi United')
  // Pledged amount is formatted as "69.5k" by the OG route
  expect(svg).toContain('69.5k')
})

test('OG image is valid SVG', async ({ request }) => {
  const response = await request.get('/api/og')
  const svg = await response.text()

  expect(svg).toContain('<svg')
  expect(svg).toContain('</svg>')
  expect(svg).toContain('width="1200"')
  expect(svg).toContain('height="630"')
})

test('embed API returns campaign JSON', async ({ request }) => {
  const response = await request.get('/api/embed/campaign/rseth-2026-04')
  expect(response.ok()).toBeTruthy()

  const data = await response.json()
  expect(data.name).toBe('rsETH Recovery')
  expect(data.totalPledged).toBeTruthy()
})
