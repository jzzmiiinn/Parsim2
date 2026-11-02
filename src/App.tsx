/**
 * App Component
 *
 * Root application component that sets up routing, theme management,
 * and lazy-loaded page components with suspense boundaries.
 *
 * Features:
 * - Client-side routing with HashRouter
 * - Theme detection from URL parameters and Redux state
 * - Lazy loading for all routes with loading spinner fallback
 * - Public error routes
 * - Protected routes wrapped in DefaultLayout
 *
 * @module App
 */

import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/error-pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/error-pages/page500/Page500'))

/**
 * Main Application Component
 *
 * Manages theme initialization and client-side routes with lazy loading.
 *
 * @component
 * @returns {React.ReactElement} Application root with routing
 *
 * @example
 * // Standard usage in index.js
 * import App from './App'
 * ReactDOM.render(<App />, document.getElementById('root'))
 */
const App = () => {
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const rawTheme = urlParams.get('theme')
    const theme = rawTheme ? rawTheme.match(/^[A-Za-z0-9\s]+/)?.[0] : null
    if (theme) {
      setColorMode(theme)
      document.documentElement.setAttribute('data-coreui-theme', theme)
      return
    }

    const savedTheme =
      localStorage.getItem('parsim-theme') ||
      localStorage.getItem('coreui-free-react-admin-template-theme')
    if (savedTheme) {
      setColorMode(savedTheme)
      document.documentElement.setAttribute('data-coreui-theme', savedTheme)
      return
    }

    // Default to 'light' per Parsim design specification
    setColorMode('light')
    document.documentElement.setAttribute('data-coreui-theme', 'light')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/error-pages/404" element={<Page404 />} />
          <Route path="/error-pages/500" element={<Page500 />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
