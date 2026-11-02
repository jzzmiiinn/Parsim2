/**
 * Dashboard Component
 */

import React, { useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilCloudDownload,
  cilCode,
  cilDescription,
  cilMemory,
  cilStorage,
  cilUser,
} from '@coreui/icons'

import DashboardMetrics from './DashboardMetrics'
import MainChart from './MainChart'

interface ProgressMetricItem {
  title: string
  value: string
  percent: number
}

interface ContextSourceItem {
  title: string
  icon: any
  percent: number
  tokens: string
}

interface AgentWorkloadItem {
  agentName: string
  model: string
  avgTokensRaw: string
  avgTokensOptimized: string
  savingsPercent: number
  costSaved: string
  lastActivity: string
  status: 'active' | 'optimizing' | 'idle'
}

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Day' | 'Month' | 'Year'>('Month')

  const progressMetrics: ProgressMetricItem[] = {
    Day: [
      { title: 'Tokens Processed', value: '11.8M', percent: 84 },
      { title: 'Tokens Saved', value: '4.8M', percent: 41 },
      { title: 'Cost Saved', value: '$1,040', percent: 42 },
      { title: 'Avg Latency', value: '390ms', percent: 72 },
    ],
    Month: [
      { title: 'Reduction Rate', value: '40.9%', percent: 41 },
      { title: 'Cost Avoided', value: '$12,850', percent: 41 },
      { title: 'Density Gain', value: '2.4x', percent: 68 },
      { title: 'Avg Latency', value: '420ms', percent: 65 },
    ],
    Year: [
      { title: 'Tokens Processed', value: '1.42B', percent: 92 },
      { title: 'Cost Avoided', value: '$148k', percent: 43 },
      { title: 'Cache Hit Rate', value: '89%', percent: 89 },
      { title: 'Density Gain', value: '2.7x', percent: 74 },
    ],
  }[timeframe]

  const contextSources: ContextSourceItem[] = [
    { title: 'Conversation History', icon: cilUser, percent: 32, tokens: '45.7M' },
    { title: 'Tool Outputs', icon: cilCode, percent: 26, tokens: '37.1M' },
    { title: 'Documents', icon: cilDescription, percent: 18, tokens: '25.7M' },
    { title: 'Retrieved Info (RAG)', icon: cilStorage, percent: 12, tokens: '17.1M' },
    { title: 'Intermediate Reasoning', icon: cilMemory, percent: 8, tokens: '11.4M' },
    { title: 'Agent State', icon: cilMemory, percent: 4, tokens: '5.7M' },
  ]

  const agentWorkloads: AgentWorkloadItem[] = [
    {
      agentName: 'Customer Support Copilot',
      model: 'Claude 3.5 Sonnet',
      avgTokensRaw: '84.2k',
      avgTokensOptimized: '32.1k',
      savingsPercent: 62,
      costSaved: '$4,120',
      lastActivity: '12s ago',
      status: 'active',
    },
    {
      agentName: 'CI Code Review Bot',
      model: 'GPT-4o',
      avgTokensRaw: '68.5k',
      avgTokensOptimized: '28.4k',
      savingsPercent: 59,
      costSaved: '$3,480',
      lastActivity: '1m ago',
      status: 'active',
    },
    {
      agentName: 'RAG Research Synthesizer',
      model: 'Llama 3.3 70B',
      avgTokensRaw: '92.0k',
      avgTokensOptimized: '44.8k',
      savingsPercent: 51,
      costSaved: '$2,190',
      lastActivity: '4m ago',
      status: 'optimizing',
    },
    {
      agentName: 'SQL Analytics Generator',
      model: 'Claude 3.5 Haiku',
      avgTokensRaw: '24.1k',
      avgTokensOptimized: '8.4k',
      savingsPercent: 65,
      costSaved: '$1,860',
      lastActivity: '18m ago',
      status: 'active',
    },
  ]

  return (
    <>
      {/* Metrics */}
      <DashboardMetrics className="mb-4" />

      {/* Main Chart */}
      <CCard className="border-0 shadow-sm mb-4">
        <CCardBody>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h4 className="mb-0 fw-bold">Token Consumption</h4>
              <div className="small text-body-secondary">
                Raw vs optimized tokens ({timeframe.toLowerCase()})
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <CButtonGroup>
                {(['Day', 'Month', 'Year'] as const).map((value) => (
                  <CButton
                    key={value}
                    color={timeframe === value ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setTimeframe(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
              <CButton color="outline-secondary" size="sm">
                <CIcon icon={cilCloudDownload} className="me-1" />
                Export
              </CButton>
            </div>
          </div>

          <MainChart timeframe={timeframe} />
        </CCardBody>

        <CCardFooter className="border-top bg-transparent">
          <CRow className="g-3 text-center">
            {progressMetrics.map((item, index) => (
              <CCol key={index} xs={6} md={3}>
                <div className="small text-body-secondary">{item.title}</div>
                <div className="fw-bold mt-1">{item.value}</div>
                <CProgress thin className="mt-2" color="warning" value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      {/* Context Sources + Agents */}
      <CRow className="g-4">
        {/* Context Sources */}
        <CCol lg={5}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardHeader className="bg-transparent">
              <strong>Context Sources</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <div className="small text-body-secondary">Optimized</div>
                  <div className="fs-5 fw-bold text-warning">84.4M</div>
                </div>
                <div className="text-end">
                  <div className="small text-body-secondary">Raw</div>
                  <div className="fs-5 fw-bold">142.8M</div>
                </div>
              </div>

              {contextSources.map((item, index) => (
                <div className="mb-3" key={index}>
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="d-flex align-items-center gap-2">
                      <CIcon icon={item.icon} size="sm" className="text-warning" />
                      {item.title}
                    </span>
                    <span className="fw-semibold">
                      {item.tokens} <span className="text-body-secondary">({item.percent}%)</span>
                    </span>
                  </div>
                  <CProgress thin color="warning" value={item.percent} />
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>

        {/* Active Agents */}
        <CCol lg={7}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardHeader className="bg-transparent d-flex justify-content-between align-items-center">
              <strong>Active Agents</strong>
              <CButton size="sm" color="outline-secondary" href="#/context-explorer">
                View all
              </CButton>
            </CCardHeader>
            <CCardBody className="p-0">
              <CTable responsive align="middle" className="mb-0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="ps-4">Agent</CTableHeaderCell>
                    <CTableHeaderCell>Model</CTableHeaderCell>
                    <CTableHeaderCell>Load → Optimized</CTableHeaderCell>
                    <CTableHeaderCell className="pe-4">Saved</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {agentWorkloads.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="ps-4">
                        <div className="fw-semibold">{item.agentName}</div>
                        <div className="small text-body-secondary">
                          <CBadge
                            color={
                              item.status === 'active'
                                ? 'success'
                                : item.status === 'optimizing'
                                  ? 'warning'
                                  : 'secondary'
                            }
                            className="me-1"
                          >
                            {item.status}
                          </CBadge>
                          {item.lastActivity}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span className="small">{item.model}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small mb-1">
                          {item.avgTokensRaw} →{' '}
                          <strong className="text-warning">{item.avgTokensOptimized}</strong>
                        </div>
                        <CProgress thin color="warning" value={item.savingsPercent} />
                      </CTableDataCell>
                      <CTableDataCell className="pe-4">
                        <div className="fw-semibold text-success">-{item.savingsPercent}%</div>
                        <div className="small text-body-secondary">{item.costSaved}/mo</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
