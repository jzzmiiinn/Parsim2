/**
 * AppHeader Component
 */

import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CContainer,
  CFormInput,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilList, cilMenu, cilMoon, cilSun, cilSearch } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { RootState } from '../store'

interface SearchItem {
  title: string
  category: string
  badgeVariant: 'orange' | 'neutral'
  link: string
}

const recentSearchesData: SearchItem[] = [
  {
    title: 'Customer Support Copilot Context Stream',
    category: 'Agent Explorer',
    badgeVariant: 'orange',
    link: '#/context-explorer',
  },
  {
    title: 'Rule: Tool Output Schema Pruning & Truncation',
    category: 'Optimization Rules',
    badgeVariant: 'neutral',
    link: '#/optimization-rules',
  },
  {
    title: 'Monthly Inference Cost & Dollar Savings',
    category: 'Usage & Costs',
    badgeVariant: 'orange',
    link: '#/usage-costs',
  },
  {
    title: 'API Secret Keys & Proxy Base URL',
    category: 'Developer API',
    badgeVariant: 'neutral',
    link: '#/api-keys',
  },
  {
    title: 'Token Reduction Curve (Claude 3.5 Sonnet)',
    category: 'Analytics',
    badgeVariant: 'orange',
    link: '#/analytics',
  },
  {
    title: 'Zero-Data Retention & Security Settings',
    category: 'Settings',
    badgeVariant: 'neutral',
    link: '#/settings',
  },
]

const AppHeader: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow)

  const isDark = colorMode === 'dark'

  const applyTheme = (mode: string) => {
    setColorMode(mode)
    try {
      localStorage.setItem('parsim-theme', mode)
      localStorage.setItem('coreui-free-react-admin-template-theme', mode)
    } catch {
      // ignore
    }
    dispatch({ type: 'set', theme: mode })
    document.documentElement.setAttribute('data-coreui-theme', mode)
    document.documentElement.dispatchEvent(new Event('ColorSchemeChange'))
  }

  const toggleTheme = () => {
    applyTheme(isDark ? 'light' : 'dark')
  }

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current?.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchVisible(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredSearches = recentSearchesData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <CHeader
      position="sticky"
      className="mb-4 p-0"
      ref={headerRef}
      style={{
        backgroundColor: isDark ? '#0c0c0c' : '#ffffff',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <CContainer className="px-4 d-flex align-items-center" fluid style={{ minHeight: 60 }}>
        {/* Left */}
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            className="p-2 rounded-2"
            style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)' }}
            aria-label="Toggle sidebar"
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>

          <button
            onClick={() => setSearchVisible(true)}
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
              minWidth: 220,
            }}
            aria-label="Open search"
          >
            <CIcon icon={cilSearch} size="sm" />
            <span className="d-none d-md-inline small">Search...</span>
            <kbd
              className="d-none d-lg-inline ms-auto px-1.5 py-0 rounded"
              style={{
                border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)',
                fontSize: 11,
                background: 'transparent',
              }}
            >
              ⌘K
            </kbd>
          </button>

          <div className="d-none d-md-flex align-items-center gap-2 ms-1">
            <span
              className="rounded-circle"
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#22c55e',
                boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.25)',
              }}
            />
            <span
              className="small"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
            >
              Proxy Active
            </span>
          </div>
        </div>

        {/* Right */}
        <CHeaderNav className="align-items-center gap-1 ms-auto">
          <CNavItem>
            <CNavLink
              href="#/analytics"
              className="px-2"
              style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
              title="Context Alerts"
            >
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink
              href="#/context-explorer"
              className="px-2"
              style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
              title="Active Streams"
            >
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>

          <div
            className="mx-2"
            style={{
              width: 1,
              height: 20,
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          />

          <CButton
            color="transparent"
            className="p-2 border-0 d-flex align-items-center justify-content-center"
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            style={{ width: 40, height: 40 }}
          >
            {isDark ? (
              <CIcon icon={cilSun} size="lg" style={{ color: '#f97316' }} />
            ) : (
              <CIcon icon={cilMoon} size="lg" style={{ color: 'rgba(0,0,0,0.7)' }} />
            )}
          </CButton>
        </CHeaderNav>
      </CContainer>

      <CContainer
        className="px-4"
        fluid
        style={{
          borderTop: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <AppBreadcrumb />
      </CContainer>

      {/* Search Modal */}
      <CModal
        visible={searchVisible}
        onClose={() => {
          setSearchVisible(false)
          setSearchQuery('')
        }}
        alignment="center"
        size="lg"
      >
        <CModalHeader className="border-0 pb-0">
          <CModalTitle className="w-100">
            <CFormInput
              type="search"
              placeholder="Search agents, rules, context streams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="border-0 shadow-none fs-5"
              style={{ background: 'transparent' }}
            />
          </CModalTitle>
        </CModalHeader>

        <CModalBody className="pt-0">
          <p className="text-body-secondary small mb-3">
            {searchQuery ? 'Matching results' : 'Recent items'}
          </p>

          <CListGroup flush>
            {filteredSearches.length > 0 ? (
              filteredSearches.map((item, idx) => (
                <CListGroupItem
                  key={idx}
                  as="a"
                  href={item.link}
                  onClick={() => setSearchVisible(false)}
                  className="d-flex justify-content-between align-items-center text-decoration-none py-3 px-2 border-0 rounded-3"
                >
                  <div>
                    <div className="fw-semibold">{item.title}</div>
                    <div className="small text-body-secondary">{item.category}</div>
                  </div>
                  <span
                    className={`badge rounded-pill px-2.5 py-1 ${
                      item.badgeVariant === 'orange'
                        ? 'bg-warning text-dark'
                        : 'bg-secondary-subtle text-body-secondary'
                    }`}
                  >
                    Go
                  </span>
                </CListGroupItem>
              ))
            ) : (
              <div className="text-center py-5 text-body-secondary small">
                No matching items found
              </div>
            )}
          </CListGroup>
        </CModalBody>
      </CModal>
    </CHeader>
  )
}

export default AppHeader
