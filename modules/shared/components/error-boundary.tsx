'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[--color-danger-border] bg-[--color-danger-soft]">
            <span className="text-3xl">⚠</span>
          </div>
          <h2 className="mt-6 text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 max-w-md text-sm text-[--color-ink-muted]">
            The page encountered an unexpected error. This is usually temporary — try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #8e5cff 0%, #e63e9d 100%)' }}
          >
            Refresh page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error ? (
            <details className="mt-6 w-full max-w-lg text-left">
              <summary className="cursor-pointer text-xs font-medium text-[--color-ink-soft]">
                Error details
              </summary>
              <pre className="mt-2 max-h-60 overflow-auto rounded-xl border border-[--color-border] bg-[--color-border-soft] p-4 text-xs text-[--color-ink-muted]">
                {this.state.error.stack}
              </pre>
            </details>
          ) : null}
        </div>
      )
    }

    return this.props.children
  }
}
