import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ocean-bg flex items-center justify-center text-center px-6">
          <div className="space-y-4">
            <div className="text-6xl">🌊</div>
            <h1 className="text-2xl font-semibold text-ocean-text-primary">Something went wrong</h1>
            <p className="text-ocean-text-muted">The ocean is a little rough right now.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg bg-ocean-accent text-ocean-bg font-medium hover:opacity-90 transition-opacity"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
