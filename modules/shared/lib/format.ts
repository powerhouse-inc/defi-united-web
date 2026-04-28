/**
 * Format a numeric string (typically an ETH-denominated pledge amount) for
 * display. Falls back to `0` when the value is missing or unparseable.
 */
export function formatEthAmount(value: string | null | undefined, opts?: { decimals?: number }) {
  if (value == null || value === '') return '0'
  const n = Number(value)
  if (!Number.isFinite(n)) return value
  const decimals = opts?.decimals ?? (n >= 1000 ? 0 : n >= 10 ? 1 : 2)
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}

/**
 * Format a USD numeric string (whole dollars) as a compact display value:
 * `234246575` → `234.25M`, `1567000000` → `1.57B`, `523` → `523`.
 * Returns null when the input is missing — caller should hide the figure
 * rather than show a placeholder.
 */
export function formatUsdShort(value: string | null | undefined): string | null {
  if (value == null || value === '') return null
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return Math.round(n).toLocaleString()
}

export function formatPercent(value: number | null | undefined, fractionDigits = 1) {
  if (value == null) return '0%'
  return `${(value * 1).toFixed(fractionDigits)}%`
}

export function shortenAddress(address: string | null | undefined, leading = 6, trailing = 4) {
  if (!address) return ''
  if (address.length <= leading + trailing + 2) return address
  return `${address.slice(0, leading)}…${address.slice(-trailing)}`
}

export function formatDateTime(input: string | null | undefined) {
  if (!input) return ''
  try {
    const d = new Date(input)
    if (Number.isNaN(d.getTime())) return input
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return input
  }
}
