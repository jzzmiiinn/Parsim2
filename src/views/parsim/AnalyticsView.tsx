/**
 * AnalyticsView Component
 */

import React, { useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
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
import { cilArrowBottom, cilArrowTop, cilCloudDownload } from '@coreui/icons'
import { CChartLine, CChartDoughnut } from '@coreui/react-chartjs'

const AnalyticsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Day' | 'Month' | 'Year'>('Month')

  const dataConfig = {
    Day: {
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      raw: [420, 210, 180, 890, 1420, 1680, 1310, 780],
      optimized: [240, 120, 110, 510, 810, 960, 750, 450],
    },
    Month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      raw: [32.4, 38.6, 42.1, 29.7],
      optimized: [18.9, 22.4, 25.1, 18.0],
    },
    Year: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      raw: [310, 420, 540, 680],
      optimized: [185, 245, 315, 395],
    },
  }[timeframe]

  return (
    <>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fs-3 fw-bold mb-1">
            Analytics
            <CBadge color="secondary" className="ms-2 fs-6">
              Demo
            </CBadge>
          </h2>
          <p className="text-body-secondary mb-0">Token usage and cost savings overview</p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <CButtonGroup>
            {(['Day', 'Month', 'Year'] as const).map((t) => (
              <CButton
                key={t}
                color={timeframe === t ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => setTimeframe(t)}
              >
                {t}
              </CButton>
            ))}
          </CButtonGroup>
          <CButton color="outline-secondary" size="sm">
            <CIcon icon={cilCloudDownload} className="me-1" />
            Export
          </CButton>
        </div>
      </div>

      {/* KPI Cards */}
      <CRow className="g-3 mb-4">
        <CCol sm={6} lg={3}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardBody>
              <div className="text-body-secondary small">Total Ingested</div>
              <div className="fs-3 fw-bold mt-1">142.8M</div>
              <div className="small text-danger mt-1">
                <CIcon icon={cilArrowTop} size="sm" /> +18.4%
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardBody>
              <div className="text-body-secondary small">Tokens Saved</div>
              <div className="fs-3 fw-bold mt-1">58.4M</div>
              <div className="small text-success mt-1">
                <CIcon icon={cilArrowTop} size="sm" /> +42.1%
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardBody>
              <div className="text-body-secondary small">Cost Avoided</div>
              <div className="fs-3 fw-bold mt-1">$12,850</div>
              <div className="small text-success mt-1">
                <CIcon icon={cilArrowBottom} size="sm" /> 41.1%
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardBody>
              <div className="text-body-secondary small">Avg Latency</div>
              <div className="fs-3 fw-bold mt-1">420 ms</div>
              <div className="small text-success mt-1">
                <CIcon icon={cilArrowBottom} size="sm" /> -285 ms
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Charts */}
      <CRow className="g-4 mb-4">
        <CCol lg={8}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardHeader className="bg-transparent">
              <strong>Raw vs Optimized Tokens</strong>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: 300 }}>
                <CChartLine
                  data={{
                    labels: dataConfig.labels,
                    datasets: [
                      {
                        label: 'Raw',
                        borderColor: '#94a3b8',
                        borderDash: [5, 5],
                        data: dataConfig.raw,
                        fill: false,
                      },
                      {
                        label: 'Optimized',
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.12)',
                        data: dataConfig.optimized,
                        fill: true,
                        tension: 0.3,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top' } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardHeader className="bg-transparent">
              <strong>Context Sources</strong>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: 200 }}>
                <CChartDoughnut
                  data={{
                    labels: ['History', 'Tools', 'Documents', 'RAG', 'Reasoning', 'State'],
                    datasets: [
                      {
                        backgroundColor: [
                          '#f97316',
                          '#3b82f6',
                          '#10b981',
                          '#f59e0b',
                          '#8b5cf6',
                          '#64748b',
                        ],
                        data: [32, 26, 18, 12, 8, 4],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>

              <div className="mt-3 small">
                <div className="d-flex justify-content-between py-1">
                  <span>Conversation History</span>
                  <span className="fw-semibold">32%</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Tool Outputs</span>
                  <span className="fw-semibold">26%</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Documents + RAG</span>
                  <span className="fw-semibold">30%</span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Model Table */}
      <CCard className="border-0 shadow-sm">
        <CCardHeader className="bg-transparent">
          <strong>Optimization by Model</strong>
        </CCardHeader>
        <CCardBody className="p-0">
          <CTable responsive align="middle" className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="ps-4">Model</CTableHeaderCell>
                <CTableHeaderCell>Ingested</CTableHeaderCell>
                <CTableHeaderCell>Optimized</CTableHeaderCell>
                <CTableHeaderCell>Saved</CTableHeaderCell>
                <CTableHeaderCell>Reduction</CTableHeaderCell>
                <CTableHeaderCell className="pe-4">Spend Saved</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell className="ps-4 fw-semibold">Claude 3.5 Sonnet</CTableDataCell>
                <CTableDataCell>68.4M</CTableDataCell>
                <CTableDataCell>38.2M</CTableDataCell>
                <CTableDataCell className="text-success">30.2M</CTableDataCell>
                <CTableDataCell>
                  <CProgress thin color="warning" value={44} className="mb-1" />
                  <span className="small">44%</span>
                </CTableDataCell>
                <CTableDataCell className="pe-4 fw-semibold text-success">$9,060</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="ps-4 fw-semibold">GPT-4o</CTableDataCell>
                <CTableDataCell>48.2M</CTableDataCell>
                <CTableDataCell>29.6M</CTableDataCell>
                <CTableDataCell className="text-success">18.6M</CTableDataCell>
                <CTableDataCell>
                  <CProgress thin color="warning" value={39} className="mb-1" />
                  <span className="small">39%</span>
                </CTableDataCell>
                <CTableDataCell className="pe-4 fw-semibold text-success">$4,650</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="ps-4 fw-semibold">Llama 3.3 70B</CTableDataCell>
                <CTableDataCell>18.6M</CTableDataCell>
                <CTableDataCell>9.1M</CTableDataCell>
                <CTableDataCell className="text-success">9.5M</CTableDataCell>
                <CTableDataCell>
                  <CProgress thin color="warning" value={51} className="mb-1" />
                  <span className="small">51%</span>
                </CTableDataCell>
                <CTableDataCell className="pe-4 fw-semibold text-success">$1,425</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AnalyticsView
