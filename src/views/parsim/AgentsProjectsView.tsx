import React from 'react'
import {
  CBadge,
  CButton,
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
import { cilApplications, cilCheck, cilPlus, cilSpeedometer } from '@coreui/icons'

const AgentsProjectsView: React.FC = () => {
  const agents = [
    {
      name: 'Customer Support Copilot',
      project: 'fintech-core-support',
      model: 'Claude 3.5 Sonnet',
      windowLimit: '200k tokens',
      avgTokensBefore: '84.2k',
      avgTokensAfter: '32.1k',
      savingsPct: 61.9,
      status: 'Active',
      costSaved: '$4,120 /mo',
    },
    {
      name: 'Code Reviewer CI Bot',
      project: 'developer-tooling',
      model: 'GPT-4o',
      windowLimit: '128k tokens',
      avgTokensBefore: '68.5k',
      avgTokensAfter: '28.4k',
      savingsPct: 58.5,
      status: 'Active',
      costSaved: '$3,480 /mo',
    },
    {
      name: 'RAG Research Synthesizer',
      project: 'enterprise-knowledge-base',
      model: 'Llama 3.3 70B',
      windowLimit: '128k tokens',
      avgTokensBefore: '92.0k',
      avgTokensAfter: '44.8k',
      savingsPct: 51.3,
      status: 'Active',
      costSaved: '$2,190 /mo',
    },
    {
      name: 'SQL Query Assistant',
      project: 'data-analytics-bi',
      model: 'Claude 3.5 Haiku',
      windowLimit: '32k tokens',
      avgTokensBefore: '24.1k',
      avgTokensAfter: '8.4k',
      savingsPct: 65.1,
      status: 'Active',
      costSaved: '$1,860 /mo',
    },
    {
      name: 'Sales Inbound Qualifier',
      project: 'crm-automation',
      model: 'GPT-4o mini',
      windowLimit: '16k tokens',
      avgTokensBefore: '12.4k',
      avgTokensAfter: '6.2k',
      savingsPct: 50.0,
      status: 'Active',
      costSaved: '$1,200 /mo',
    },
  ]

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fs-3 fw-bold mb-1">
            Agents &amp; AI Projects
            <CBadge color="primary" className="ms-2 fs-6">
              5 Connected
            </CBadge>
          </h2>
          <p className="text-body-secondary mb-0">
            Manage deployed AI agents, monitor individual context loads, and configure per-agent limits
          </p>
        </div>
        <CButton color="primary">
          <CIcon icon={cilPlus} className="me-1" /> Connect New Agent
        </CButton>
      </div>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Configured AI Agents &amp; Context Pipelines</strong>
        </CCardHeader>
        <CCardBody>
          <CTable responsive align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Agent Name &amp; Project</CTableHeaderCell>
                <CTableHeaderCell>Base LLM Model</CTableHeaderCell>
                <CTableHeaderCell>Context Load (Before &rarr; After)</CTableHeaderCell>
                <CTableHeaderCell>Reduction Ratio</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Estimated Spend Saved</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {agents.map((agent, i) => (
                <CTableRow key={i}>
                  <CTableDataCell>
                    <div className="fw-bold">{agent.name}</div>
                    <div className="small text-body-secondary">{agent.project}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="dark">{agent.model}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>{agent.avgTokensBefore}</span>
                      <span className="fw-bold text-primary">&rarr; {agent.avgTokensAfter}</span>
                    </div>
                    <CProgress thin color="primary" value={agent.savingsPct} />
                  </CTableDataCell>
                  <CTableDataCell className="fw-bold text-success">
                    -{agent.savingsPct}%
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="success">{agent.status}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell className="fw-bold text-success">
                    {agent.costSaved}
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

export default AgentsProjectsView
