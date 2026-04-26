import React, { Component } from 'react';
import { trackEvent } from '../utils/analytics';

/**
 * Catches render errors and shows a 
 * graceful fallback UI.
 */
class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ElectIQ render error:', error, info)
    trackEvent('App', 'RenderError', error.message)
  }

  render() {
    if (!this.state.hasError) 
      return this.props.children

    return (
      <div role="alert" 
        className="min-h-screen bg-base 
          flex flex-col items-center 
          justify-center p-8 text-center">
        <span className="text-5xl mb-4">🗳️</span>
        <h1 className="font-display text-2xl 
          font-bold text-dark mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-muted 
          mb-8 max-w-sm">
          ElectIQ encountered an unexpected error. 
          Please refresh to continue.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-saffron text-white 
            font-semibold text-sm rounded-xl 
            px-8 py-3 hover:bg-orange-700 
            transition-colors duration-150"
        >
          Refresh Page
        </button>
      </div>
    )
  }
}

export default ErrorBoundary;
