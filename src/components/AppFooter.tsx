/**
 * AppFooter Component
 */

import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter: React.FC = () => {
  return (
    <CFooter className="px-4 border-top">
      <div>
        <span className="fw-semibold text-warning">Parsim</span>
        <span className="ms-1 text-body-secondary">&copy; 2026</span>
      </div>
      <div className="ms-auto d-none d-md-block">
        <span className="text-body-secondary small">Context Optimization for AI Agents</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
