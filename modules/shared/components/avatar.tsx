'use client'

import { useState } from 'react'

// Violet-spectrum palette — harmonizes with the dashboard theme
const COLORS = [
  { bg: 'linear-gradient(135deg, #8e5cff, #6936dc)', text: '#ffffff' },
  { bg: 'linear-gradient(135deg, #e63e9d, #b32475)', text: '#ffffff' },
  { bg: 'linear-gradient(135deg, #5bc2e7, #2e8db0)', text: '#ffffff' },
  { bg: 'linear-gradient(135deg, #36d399, #1f9e6f)', text: '#0a0a14' },
  { bg: 'linear-gradient(135deg, #f5b544, #c98a14)', text: '#0a0a14' },
  { bg: 'linear-gradient(135deg, #b284ff, #8e5cff)', text: '#ffffff' },
  { bg: 'linear-gradient(135deg, #ff8ec7, #e63e9d)', text: '#ffffff' },
  { bg: 'linear-gradient(135deg, #6e7390, #4d5169)', text: '#ffffff' },
]

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function getInitials(name: string): string {
  return name.trim().replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
}

function extractDomain(url: string): string | null {
  try {
    const u = new URL(url)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function getFaviconUrl(url: string): string | null {
  const domain = extractDomain(url)
  if (!domain) return null
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

interface AvatarProps {
  name: string
  websiteUrl?: string | null
  size?: number
}

export function Avatar({ name, websiteUrl, size = 32 }: AvatarProps) {
  const [error, setError] = useState(false)
  const faviconUrl = websiteUrl ? getFaviconUrl(websiteUrl) : null
  const showImage = faviconUrl && !error
  const color = COLORS[hashName(name) % COLORS.length]
  const initials = getInitials(name)

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-[--color-border]"
      style={{
        background: showImage ? undefined : color.bg,
      }}
      title={name}
    >
      {showImage ? (
        <img
          src={faviconUrl}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          className="h-8 w-8 rounded-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span
          className="select-none text-[11px] font-semibold"
          style={{ color: color.text }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}
