/**
 * OptimizationRulesView Component
 */

import React, { useState } from 'react'
import { CBadge, CButton, CCard, CCardBody, CCol, CFormCheck, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

interface Rule {
  id: string
  name: string
  targetContext: string
  action: string
  compressionImpact: string
  monthlySaved: string
  enabled: boolean
}

const OptimizationRulesView: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 'rule-1',
      name: 'Tool Output Schema Pruner',
      targetContext: 'Tool Outputs',
      action: 'Strip nulls, redundant keys, and truncate large stack traces',
      compressionImpact: '89% saved',
      monthlySaved: '22.4M tokens',
      enabled: true,
    },
    {
      id: 'rule-2',
      name: 'Conversation Sliding Window',
      targetContext: 'Conversation History',
      action: 'Summarize turns older than 5 steps while keeping key constraints',
      compressionImpact: '64% denser',
      monthlySaved: '18.1M tokens',
      enabled: true,
    },
    {
      id: 'rule-3',
      name: 'RAG Chunk Deduplicator',
      targetContext: 'Retrieved Documents',
      action: 'Remove semantic duplicates and low-relevance passages',
      compressionImpact: '42% reduced',
      monthlySaved: '11.5M tokens',
      enabled: true,
    },
    {
      id: 'rule-4',
      name: 'Reasoning Scratchpad Evictor',
      targetContext: 'Intermediate CoT',
      action: 'Purge internal thought tokens before the next model call',
      compressionImpact: '100% removed',
      monthlySaved: '6.4M tokens',
      enabled: true,
    },
  ])

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  return (
    <>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fs-3 fw-bold mb-1">Optimization Rules</h2>
          <p className="text-body-secondary mb-0">Control how context is pruned and compressed</p>
        </div>
        <CButton color="primary">
          <CIcon icon={cilPlus} className="me-2" />
          New Rule
        </CButton>
      </div>

      {/* Rules Grid */}
      <CRow className="g-3">
        {rules.map((rule) => (
          <CCol md={6} key={rule.id}>
            <CCard className="h-100 border-0 shadow-sm">
              <CCardBody>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="fw-semibold mb-1">{rule.name}</h5>
                    <CBadge color="secondary" className="small">
                      {rule.targetContext}
                    </CBadge>
                  </div>
                  <CFormCheck
                    type="checkbox"
                    className="form-switch"
                    checked={rule.enabled}
                    onChange={() => toggleRule(rule.id)}
                  />
                </div>

                <p className="text-body-secondary small mb-3">{rule.action}</p>

                <div className="d-flex justify-content-between small pt-2 border-top">
                  <span>
                    <span className="text-body-secondary">Impact:</span>{' '}
                    <span className="fw-semibold text-warning">{rule.compressionImpact}</span>
                  </span>
                  <span>
                    <span className="text-body-secondary">Saved:</span>{' '}
                    <span className="fw-semibold text-success">{rule.monthlySaved}</span>
                  </span>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default OptimizationRulesView
