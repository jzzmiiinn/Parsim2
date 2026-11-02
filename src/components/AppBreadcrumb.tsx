import React from 'react'
import { useLocation } from 'react-router-dom'

import { routes, RouteConfig } from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

export interface BreadcrumbItemData {
  pathname: string
  name: string
  active: boolean
}

const AppBreadcrumb: React.FC = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname: string, routesList: RouteConfig[]): string | false => {
    const currentRoute = routesList.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location: string): BreadcrumbItemData[] => {
    const breadcrumbs: BreadcrumbItemData[] = []
    location.split('/').reduce((prev: string, curr: string, index: number, array: string[]) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      if (routeName) {
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        })
      }
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
