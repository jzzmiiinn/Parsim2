/**
 * AppSidebarNav Component
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CNavLink, CSidebarNav, useColorModes } from '@coreui/react'
import { NavItem, NavBadge } from '../_nav'

export interface AppSidebarNavProps {
  items: NavItem[]
  onNavigate?: () => void
}

export const AppSidebarNav: React.FC<AppSidebarNavProps> = ({ items, onNavigate }) => {
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const isDark = colorMode === 'dark'

  const renderLinkContent = (
    name?: string,
    icon?: React.ReactNode,
    badge?: NavBadge,
    indent = false,
  ) => (
    <>
      {icon ? (
        icon
      ) : indent ? (
        <span className="nav-icon">
          <span className="nav-icon-bullet" />
        </span>
      ) : null}
      {name}
      {badge && (
        <span className={`ms-auto badge rounded-pill bg-${badge.color || 'secondary'}`}>
          {badge.text}
        </span>
      )}
    </>
  )

  const renderItem = (item: NavItem, index: number, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component

    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink })}
            {...(rest.href && { target: '_blank', rel: 'noopener noreferrer' })}
            {...rest}
            onClick={onNavigate}
            style={{
              color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
            }}
          >
            {renderLinkContent(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          renderLinkContent(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const renderGroup = (item: NavItem, index: number) => {
    const { component, name, icon, items: childItems, ...rest } = item
    const Component = component

    return (
      <Component compact as="div" key={index} toggler={renderLinkContent(name, icon)} {...rest}>
        {childItems?.map((child, childIndex) =>
          child.items ? renderGroup(child, childIndex) : renderItem(child, childIndex, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav
      as={SimpleBar as any}
      style={{
        backgroundColor: isDark ? '#0c0c0c' : '#ffffff',
      }}
    >
      {items?.map((item, index) =>
        item.items ? renderGroup(item, index) : renderItem(item, index),
      )}
    </CSidebarNav>
  )
}
