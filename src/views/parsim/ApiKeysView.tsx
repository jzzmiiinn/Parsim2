/**
 * ApiKeysView Component
 */

import React, { useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCopy, cilPlus } from '@coreui/icons'

const ApiKeysView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fs-3 fw-bold mb-1">API Keys</h2>
          <p className="text-body-secondary mb-0">Manage keys for the Parsim proxy</p>
        </div>
        <CButton color="primary">
          <CIcon icon={cilPlus} className="me-2" />
          Generate New Key
        </CButton>
      </div>

      {/* Keys Table */}
      <CCard className="border-0 shadow-sm mb-4">
        <CCardHeader className="bg-transparent">
          <strong>Active Keys</strong>
        </CCardHeader>
        <CCardBody className="p-0">
          <CTable responsive align="middle" className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="ps-4">Name</CTableHeaderCell>
                <CTableHeaderCell>Key</CTableHeaderCell>
                <CTableHeaderCell>Environment</CTableHeaderCell>
                <CTableHeaderCell>Rate Limit</CTableHeaderCell>
                <CTableHeaderCell>Last Active</CTableHeaderCell>
                <CTableHeaderCell className="pe-4">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell className="ps-4 fw-semibold">
                  Production Support Proxy
                </CTableDataCell>
                <CTableDataCell>
                  <code className="small">parsim_live_89f029...7b21</code>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success">Production</CBadge>
                </CTableDataCell>
                <CTableDataCell>5,000 req/min</CTableDataCell>
                <CTableDataCell>Just now</CTableDataCell>
                <CTableDataCell className="pe-4">
                  <CButton
                    size="sm"
                    color="outline-secondary"
                    onClick={() => copyToClipboard('parsim_live_89f029a1b94e7b21', 'k1')}
                  >
                    <CIcon icon={cilCopy} className="me-1" />
                    {copied === 'k1' ? 'Copied' : 'Copy'}
                  </CButton>
                </CTableDataCell>
              </CTableRow>

              <CTableRow>
                <CTableDataCell className="ps-4 fw-semibold">Staging CI / Sandbox</CTableDataCell>
                <CTableDataCell>
                  <code className="small">parsim_test_41c098...9a04</code>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="warning">Staging</CBadge>
                </CTableDataCell>
                <CTableDataCell>1,000 req/min</CTableDataCell>
                <CTableDataCell>12 min ago</CTableDataCell>
                <CTableDataCell className="pe-4">
                  <CButton
                    size="sm"
                    color="outline-secondary"
                    onClick={() => copyToClipboard('parsim_test_41c098b2c4e9a04', 'k2')}
                  >
                    <CIcon icon={cilCopy} className="me-1" />
                    {copied === 'k2' ? 'Copied' : 'Copy'}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Integration Example */}
      <CCard className="border-0 shadow-sm">
        <CCardHeader className="bg-transparent">
          <strong>Integration Example</strong>
        </CCardHeader>
        <CCardBody>
          <pre
            className="p-3 rounded mb-0 small font-monospace"
            style={{
              backgroundColor: '#111',
              color: '#e5e5e5',
              overflowX: 'auto',
            }}
          >
            {`from parsim import ParsimClient
from anthropic import Anthropic

client = Anthropic()
parsim = ParsimClient(api_key="parsim_live_...")

response = parsim.messages.create(
    client=client,
    model="claude-3-5-sonnet-20241022",
    messages=large_agent_conversation_history,
    tools=database_and_api_tools,
)`}
          </pre>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ApiKeysView
