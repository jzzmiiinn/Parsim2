import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const AnalyticsView = React.lazy(() => import('./views/parsim/AnalyticsView'))
const ContextExplorerView = React.lazy(() => import('./views/parsim/ContextExplorerView'))
const OptimizationRulesView = React.lazy(() => import('./views/parsim/OptimizationRulesView'))
const AgentsProjectsView = React.lazy(() => import('./views/parsim/AgentsProjectsView'))
const UsageCostsView = React.lazy(() => import('./views/parsim/UsageCostsView'))
const ApiKeysView = React.lazy(() => import('./views/parsim/ApiKeysView'))
const SettingsView = React.lazy(() => import('./views/parsim/SettingsView'))

export interface RouteConfig {
  path: string
  name: string
  element?: React.ComponentType<any>
}

export const routes: RouteConfig[] = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Overview', element: Dashboard },
  { path: '/overview', name: 'Overview', element: Dashboard },
  { path: '/analytics', name: 'Analytics', element: AnalyticsView },
  { path: '/context-explorer', name: 'Context Explorer', element: ContextExplorerView },
  { path: '/optimization-rules', name: 'Optimization Rules', element: OptimizationRulesView },
  { path: '/agents-projects', name: 'Agents & Projects', element: AgentsProjectsView },
  { path: '/usage-costs', name: 'Usage & Costs', element: UsageCostsView },
  { path: '/api-keys', name: 'API Keys', element: ApiKeysView },
  { path: '/settings', name: 'Settings', element: SettingsView },
]

export default routes
