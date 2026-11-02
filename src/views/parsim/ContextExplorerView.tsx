/**
 * ContextExplorerView Component
 */

import React, { useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
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
import { cilCode } from '@coreui/icons'

interface ContextItem {
  type: string
  source: string
  originalTokens: number
  optimizedTokens: number
  status: 'compressed' | 'pruned' | 'preserved' | 'evicted'
  description: string
  savingPct: number
}

const ContextExplorerView: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('support-copilot')
  const [selectedSession, setSelectedSession] = useState('sess-9821')

  const contextItems: ContextItem[] = [
    {
      type: 'Tool Outputs',
      source: 'database_query_results.json',
      originalTokens: 38400,
      optimizedTokens: 3200,
      status: 'pruned',
      description: 'Extracted relevant columns, stripped NULLs',
      savingPct: 91.6,
    },
    {
      type: 'Conversation History',
      source: 'Turns 1–18',
      originalTokens: 24800,
      optimizedTokens: 7100,
      status: 'compressed',
      description: 'Summarized older turns, kept key constraints',
      savingPct: 71.3,
    },
    {
      type: 'Documents',
      source: 'api_documentation_v3.pdf',
      originalTokens: 19500,
      optimizedTokens: 5800,
      status: 'compressed',
      description: 'Extracted relevant endpoints only',
      savingPct: 70.2,
    },
    {
      type: 'Retrieved Info',
      source: 'vector_search (k=10)',
      originalTokens: 14200,
      optimizedTokens: 4100,
      status: 'pruned',
      description: 'Removed low-relevance & duplicate chunks',
      savingPct: 71.1,
    },
    {
      type: 'Intermediate Reasoning',
      source: 'step_3_scratchpad',
      originalTokens: 9800,
      optimizedTokens: 0,
      status: 'evicted',
      description: 'Full CoT removed after validation',
      savingPct: 100,
    },
    {
      type: 'Agent State',
      source: 'runtime_memory',
      originalTokens: 2400,
      optimizedTokens: 2400,
      status: 'preserved',
      description: 'Session IDs and active permissions',
      savingPct: 0,
    },
  ]

  const totalRaw = contextItems.reduce((acc, i) => acc + i.originalTokens, 0)
  const totalOptimized = contextItems.reduce((acc, i) => acc + i.optimizedTokens, 0)
  const totalSaved = totalRaw - totalOptimized
  const overallRate = ((totalSaved / totalRaw) * 100).toFixed(1)

  const statusColor = {
    pruned: 'warning',
    compressed: 'info',
    evicted: 'danger',
    preserved: 'success',
  } as const

  return (
    <>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fs-3 fw-bold mb-1">Context Explorer</h2>
          <p className="text-body-secondary mb-0">Inspect what was kept, compressed, or removed</p>
        </div>

        <div className="d-flex gap-2">
          <CFormSelect
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="w-auto"
            size="sm"
          >
            <option value="support-copilot">Customer Support Copilot</option>
            <option value="code-review">Code Reviewer Agent</option>
            <option value="research-agent">Research Agent</option>
            <option value="sql-agent">SQL Agent</option>
          </CFormSelect>

          <CFormSelect
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-auto"
            size="sm"
          >
            <option value="sess-9821">Session #9821</option>
            <option value="sess-9820">Session #9820</option>
            <option value="sess-9819">Session #9819</option>
          </CFormSelect>
        </div>
      </div>

      {/* Summary */}
      <CCard className="border-0 shadow-sm mb-4">
        <CCardBody>
          <CRow className="align-items-center g-3">
            <CCol md={4}>
              <div className="small text-body-secondary">Optimized / Raw</div>
              <div className="fs-3 fw-bold">
                {(totalOptimized / 1000).toFixed(1)}k
                <span className="fs-6 fw-normal text-body-secondary">
                  {' '}
                  / {(totalRaw / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="small text-success mt-1">{overallRate}% reduction</div>
            </CCol>

            <CCol md={5}>
              <CProgress height={12} className="rounded-pill mb-2">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${(totalOptimized / totalRaw) * 100}%` }}
                />
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${(totalSaved / totalRaw) * 100}%` }}
                />
              </CProgress>
              <div className="d-flex justify-content-between small text-body-secondary">
                <span>Sent to model</span>
                <span>{totalSaved.toLocaleString()} tokens saved</span>
              </div>
            </CCol>

            <CCol md={3} className="text-md-end">
              <CButton color="primary" size="sm">
                <CIcon icon={cilCode} className="me-1" />
                View Raw
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Breakdown Table */}
      <CCard className="border-0 shadow-sm">
        <CCardHeader className="bg-transparent d-flex justify-content-between align-items-center">
          <strong>Context Breakdown</strong>
          <CBadge color="secondary">{contextItems.length} items</CBadge>
        </CCardHeader>
        <CCardBody className="p-0">
          <CTable responsive align="middle" className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="ps-4">Type</CTableHeaderCell>
                <CTableHeaderCell>Source</CTableHeaderCell>
                <CTableHeaderCell>Raw</CTableHeaderCell>
                <CTableHeaderCell>Sent</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
                <CTableHeaderCell className="pe-4">Saved</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {contextItems.map((item, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell className="ps-4 fw-semibold">{item.type}</CTableDataCell>
                  <CTableDataCell>
                    <div className="fw-medium">{item.source}</div>
                    <div className="small text-body-secondary">{item.description}</div>
                  </CTableDataCell>
                  <CTableDataCell>{item.originalTokens.toLocaleString()}</CTableDataCell>
                  <CTableDataCell className="fw-semibold">
                    {item.optimizedTokens.toLocaleString()}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={statusColor[item.status]} className="text-uppercase">
                      {item.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="pe-4 fw-semibold text-success">
                    {item.savingPct > 0 ? `-${item.savingPct}%` : '—'}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ContextExplorerView
