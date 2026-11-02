import React from 'react'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCode, cilFilter, cilLayers } from '@coreui/icons'

export interface DashboardBrandProps {
  className?: string
}

const DashboardBrand: React.FC<DashboardBrandProps> = (props) => {
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="parsim-pillar-card"
          icon={<CIcon icon={cilCode} height={48} className="my-3 text-white" />}
          values={[
            { title: 'cache hit rate', value: '89.4%' },
            { title: 'tokens saved', value: '22.4M' },
          ]}
          style={
            {
              '--cui-card-cap-bg': '#FF6A00',
            } as React.CSSProperties
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="parsim-pillar-card"
          icon={<CIcon icon={cilLayers} height={48} className="my-3 text-white" />}
          values={[
            { title: 'compression ratio', value: '2.8x' },
            { title: 'dialogue saved', value: '18.1M' },
          ]}
          style={
            {
              '--cui-card-cap-bg': '#FF6A00',
            } as React.CSSProperties
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsD
          className="parsim-pillar-card"
          icon={<CIcon icon={cilFilter} height={48} className="my-3 text-white" />}
          values={[
            { title: 'redundancy pruned', value: '99.8%' },
            { title: 'evicted tokens', value: '17.9M' },
          ]}
          style={
            {
              '--cui-card-cap-bg': '#FF6A00',
            } as React.CSSProperties
          }
        />
      </CCol>
    </CRow>
  )
}

export default DashboardBrand
