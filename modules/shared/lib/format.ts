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
