import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilCloudDownload, cilCreditCard } from '@coreui/icons'
import { CChartBar } from '@coreui/react-chartjs'

const UsageCostsView: React.FC = () => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fs-3 fw-bold mb-1">
            Usage &amp; Inference Costs
            <CBadge color="success" className="ms-2 fs-6">
              -$12,850 This Month
            </CBadge>
          </h2>
          <p className="text-body-secondary mb-0">
            Compare unoptimized baseline inference costs against Parsim optimized expenditure
          </p>
        </div>
        <CButton color="primary">
          <CIcon icon={cilCloudDownload} className="me-1" /> Download Invoice &amp; Report
        </CButton>
      </div>

      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={6} lg={4}>
          <CCard className="h-100 border-start border-start-4 border-start-danger">
            <CCardBody>
              <div className="text-body-secondary small fw-semibold">Baseline Cost (Without Parsim)</div>
              <div className="fs-2 fw-bold mt-1 text-danger">$31,270.00</div>
              <div className="small text-body-secondary mt-1">Based on raw token ingestion rates</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={4}>
          <CCard className="h-100 border-start border-start-4 border-start-primary">
            <CCardBody>
              <div className="text-body-secondary small fw-semibold">Actual Model Spend (With Parsim)</div>
              <div className="fs-2 fw-bold mt-1 text-primary">$18,420.00</div>
              <div className="small text-success mt-1">
                <CIcon icon={cilArrowBottom} /> 41.1% net inference reduction
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={4}>
          <CCard className="h-100 border-start border-start-4 border-start-success">
            <CCardBody>
              <div className="text-body-secondary small fw-semibold">Net Dollars Saved</div>
              <div className="fs-2 fw-bold mt-1 text-success">$12,850.00</div>
              <div className="small text-body-secondary mt-1">Parsim Platform ROI: 26.2x</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Monthly Cost Comparison (Last 6 Months)</strong>
        </CCardHeader>
        <CCardBody>
          <div style={{ height: '300px' }}>
            <CChartBar
              data={{
                labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [
                  {
                    label: 'Without Parsim (Unoptimized $)',
                    backgroundColor: '#cbd5e1',
                    data: [18400, 22100, 25800, 28400, 29900, 31270],
                  },
                  {
                    label: 'Actual Spend With Parsim ($)',
                    backgroundColor: '#ff6600',
                    data: [11200, 13400, 15100, 16900, 17800, 18420],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                },
              }}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default UsageCostsView
