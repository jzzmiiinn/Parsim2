/**
 * AppSidebar Component
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
  CAvatar,
  CCloseButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavTitle,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChevronBottom,
  cilSpeedometer,
  cilList,
  cilSettings,
  cilChart,
  cilCode,
  cilBolt,
} from '@coreui/icons'

import darkLogo from 'src/assets/dark-logo.jpg'
import lightLogo from 'src/assets/light-logo.jpg'
import { RootState } from '../store'

const AppSidebar: React.FC = () => {
  const dispatch = useDispatch()
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const unfoldable = useSelector((state: RootState) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow)

  const isDark = colorMode === 'dark' || colorMode === 'auto'
  const brandLogo = isDark ? darkLogo : lightLogo

  const closeSidebarOnMobile = () => {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      dispatch({ type: 'set', sidebarShow: false })
    }
  }

  // Force dark styles
  const darkStyles = {
    sidebar: {
      backgroundColor: '#0c0c0c',
      borderColor: 'rgba(255,255,255,0.08)',
      color: '#ffffff',
    },
    text: {
      color: 'rgba(255,255,255,0.85)',
    },
    muted: {
      color: 'rgba(255,255,255,0.4)',
    },
    border: {
      borderColor: 'rgba(255,255,255,0.08)',
    },
  }

  const lightStyles = {
    sidebar: {
      backgroundColor: '#ffffff',
      borderColor: 'rgba(0,0,0,0.08)',
      color: '#111111',
    },
    text: {
      color: 'rgba(0,0,0,0.85)',
    },
    muted: {
      color: 'rgba(0,0,0,0.45)',
    },
    border: {
      borderColor: 'rgba(0,0,0,0.08)',
    },
  }

  const theme = isDark ? darkStyles : lightStyles

  return (
    <CSidebar
      className="parsim-sidebar border-end"
      colorScheme={isDark ? 'dark' : 'light'}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => dispatch({ type: 'set', sidebarShow: visible })}
      style={theme.sidebar}
    >
      {/* Brand */}
      <CSidebarHeader
        className="border-bottom d-flex align-items-center justify-content-between px-3"
        style={{
          ...theme.border,
          minHeight: 64,
          backgroundColor: theme.sidebar.backgroundColor,
        }}
      >
        <CSidebarBrand href="#/dashboard" className="d-flex align-items-center">
          <img
            className="sidebar-brand-full"
            src={brandLogo}
            alt="Parsim"
            style={{ height: 36, maxWidth: 150, objectFit: 'contain' }}
          />
          <img
            className="sidebar-brand-narrow"
            src={brandLogo}
            alt=""
            aria-hidden="true"
            style={{ height: 36, maxWidth: 40, objectFit: 'contain' }}
          />
        </CSidebarBrand>

        <div className="d-flex align-items-center gap-1">
          <CSidebarToggler
            className="d-none d-lg-flex p-1 rounded-2"
            onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
            style={theme.muted}
          />
          <CCloseButton
            className="d-lg-none"
            dark={isDark}
            onClick={() => dispatch({ type: 'set', sidebarShow: false })}
          />
        </div>
      </CSidebarHeader>

      {/* Navigation */}
      <CSidebarNav className="px-2 pt-3" style={{ backgroundColor: theme.sidebar.backgroundColor }}>
        <CNavTitle
          className="text-uppercase small"
          style={{
            ...theme.muted,
            fontSize: 11,
            letterSpacing: '0.05em',
          }}
        >
          Main
        </CNavTitle>

        <CNavItem>
          <NavLink
            to="/dashboard"
            className="nav-link"
            onClick={closeSidebarOnMobile}
            style={theme.text}
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            Dashboard
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/context-explorer"
            className="nav-link"
            onClick={closeSidebarOnMobile}
            style={theme.text}
          >
            <CIcon customClassName="nav-icon" icon={cilList} />
            Context Explorer
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/optimization-rules"
            className="nav-link"
            onClick={closeSidebarOnMobile}
            style={theme.text}
          >
            <CIcon customClassName="nav-icon" icon={cilBolt} />
            Optimization Rules
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/analytics"
            className="nav-link"
            onClick={closeSidebarOnMobile}
            style={theme.text}
          >
            <CIcon customClassName="nav-icon" icon={cilChart} />
            Analytics
          </NavLink>
        </CNavItem>

        <CNavTitle
          className="text-uppercase small mt-3"
          style={{
            ...theme.muted,
            fontSize: 11,
            letterSpacing: '0.05em',
          }}
        >
          Developer
        </CNavTitle>

        <CNavItem>
          <NavLink
            to="/api-keys"
            className="nav-link"
            onClick={closeSidebarOnMobile}
            style={theme.text}
          >
            <CIcon customClassName="nav-icon" icon={cilCode} />
            API Keys
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/settings"
            className="nav-link"
            onClick={closeSidebarOnMobile}
            style={theme.text}
          >
            <CIcon customClassName="nav-icon" icon={cilSettings} />
            Settings
          </NavLink>
        </CNavItem>
      </CSidebarNav>

      {/* Profile */}
      <CSidebarFooter
        className="border-top px-3 pb-3 pt-2"
        style={{
          ...theme.border,
          backgroundColor: theme.sidebar.backgroundColor,
        }}
      >
        <CDropdown placement="top-end">
          <CDropdownToggle
            className="d-flex align-items-center gap-2 w-100 text-start border-0 rounded-3 px-2 py-2"
            caret={false}
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            }}
          >
            <CAvatar
              size="sm"
              style={{
                background: 'linear-gradient(135deg, #f97316, #c2410c)',
                color: 'white',
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              PU
            </CAvatar>
            <div className="flex-grow-1 overflow-hidden text-start">
              <div
                className="fw-medium text-truncate"
                style={{
                  fontSize: 13.5,
                  color: isDark ? '#ffffff' : '#111111',
                }}
              >
                Parsim User
              </div>
              <div style={{ fontSize: 11.5, ...theme.muted }}>Developer</div>
            </div>
            <CIcon icon={cilChevronBottom} size="sm" style={theme.muted} />
          </CDropdownToggle>

          <CDropdownMenu
            className="border-0 shadow-lg"
            style={{
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <CDropdownItem href="#/settings">Account settings</CDropdownItem>
            <CDropdownDivider style={theme.border} />
            <CDropdownItem href="#/api-keys">API keys</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
