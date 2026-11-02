/**
 * Parsim sidebar navigation configuration.
 */

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApplications,
  cilApplicationsSettings,
  cilBook,
  cilChartLine,
  cilCloud,
  cilCode,
  cilFilter,
  cilLayers,
  cilLifeRing,
  cilLockLocked,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

export interface NavBadge {
  color: string
  text: string
}

export interface NavItem {
  component: React.ComponentType<any>
  name?: string
  to?: string
  href?: string
  icon?: React.ReactNode
  badge?: NavBadge
  items?: NavItem[]
  [key: string]: any
}

const navigation: NavItem[] = [
  {
    component: CNavTitle,
    name: 'Workspace',
  },
  {
    component: CNavItem,
    name: 'Overview',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Context Explorer',
    to: '/context-explorer',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Optimization',
    to: '/optimization-rules',
    icon: <CIcon icon={cilFilter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analytics',
    to: '/analytics',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Agent Sessions',
    to: '/agents-projects',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavItem,
    name: 'Context Sources',
    to: '/context-explorer',
    icon: <CIcon icon={cilCloud} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Optimization Rules',
    to: '/optimization-rules',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Integrations',
    to: '/settings',
    icon: <CIcon icon={cilApplicationsSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Developer Resources',
  },
  {
    component: CNavItem,
    name: 'API Keys',
    to: '/api-keys',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Documentation',
    to: '/api-keys',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'API Reference',
    to: '/api-keys',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  },
]

export const bottomNavigation: NavItem[] = [
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Help & Support',
    to: '/settings',
    icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'GitHub',
    href: 'https://github.com',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  },
]

export default navigation
