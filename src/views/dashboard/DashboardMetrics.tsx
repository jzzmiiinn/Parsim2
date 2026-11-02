import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'

interface DashboardMetricsProps {
  className?: string
}

const periods = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']

const chartOptions = (min: number, max: number) => ({
  plugins: { legend: { display: false } },
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { min, max, display: false },
  },
  elements: {
    line: { tension: 0.4 },
    point: { radius: 0, hitRadius: 8, hoverRadius: 4 },
  },
})

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ className }) => (
  <CRow className={className} xs={{ gutter: 3 }}>
    <CCol sm={6} xl={4} xxl={3}>
      <MetricCard
        title="Tokens Processed"
        value="142.8M"
        change="+18.4% vs last period"
        trend="up"
        actions={[
          ['#/context-explorer', 'Inspect Context Streams'],
          ['#/analytics', 'Token Stream Analytics'],
          ['#/agents-projects', 'Filter by Agent'],
        ]}
      >
        <CChartLine
          data={{
            labels: periods,
            datasets: [
              {
                data: [82, 94, 110, 118, 126, 138, 142.8],
                backgroundColor: 'rgba(255, 106, 0, 0.12)',
                borderColor: '#ff6600',
                pointBackgroundColor: '#ff6600',
                fill: true,
                borderWidth: 2,
              },
            ],
          }}
          options={chartOptions(60, 155)}
        />
      </MetricCard>
    </CCol>
    <CCol sm={6} xl={4} xxl={3}>
      <MetricCard
        title="Inference Cost"
        value="$18,420"
        change="-34.2% cost reduction"
        trend="down"
        actions={[
          ['#/usage-costs', 'View Cost Breakdown'],
          ['#/usage-costs', 'Cost Projections'],
          ['#/usage-costs', 'Billing Invoices'],
        ]}
      >
        <CChartLine
          data={{
            labels: periods,
            datasets: [
              {
                data: [28.4, 26.2, 24.1, 22, 20.4, 19.1, 18.42],
                backgroundColor: 'rgba(255, 106, 0, 0.12)',
                borderColor: '#ff6600',
                pointBackgroundColor: '#ff6600',
                fill: true,
                borderWidth: 2,
              },
            ],
          }}
          options={chartOptions(16, 31)}
        />
      </MetricCard>
    </CCol>
    <CCol sm={6} xl={4} xxl={3}>
      <MetricCard
        title="Tokens Saved"
        value="58.4M"
        change="+42.1% optimized"
        trend="up"
        actions={[
          ['#/optimization-rules', 'Rule Impact Analysis'],
          ['#/context-explorer', 'Pruning Logs'],
          ['#/analytics', 'Savings Curve'],
        ]}
      >
        <CChartLine
          data={{
            labels: periods,
            datasets: [
              {
                data: [18, 24, 31, 38, 44, 52, 58.4],
                backgroundColor: 'rgba(255, 106, 0, 0.12)',
                borderColor: '#ff6600',
                pointBackgroundColor: '#ff6600',
                fill: true,
                borderWidth: 2,
              },
            ],
          }}
          options={chartOptions(12, 65)}
        />
      </MetricCard>
    </CCol>
    <CCol sm={6} xl={4} xxl={3}>
      <MetricCard
        title="Optimization Rate"
        value="40.9%"
        change="+5.8% efficiency gain"
        trend="up"
        actions={[
          ['#/optimization-rules', 'Tune Rules'],
          ['#/agents-projects', 'Agent Efficiency'],
          ['#/analytics', 'Benchmark Report'],
        ]}
      >
        <CChartBar
          data={{
            labels: Array.from({ length: 16 }, (_, index) => `Turn ${index + 1}`),
            datasets: [
              {
                data: [25, 30, 34, 31, 36, 39, 35, 38, 40, 37, 39, 42, 38, 41, 40, 40.9],
                backgroundColor: 'rgba(255, 106, 0, 0.75)',
                borderRadius: 2,
                barPercentage: 0.72,
              },
            ],
          }}
          options={{
            ...chartOptions(0, 50),
            scales: {
              x: { display: false, grid: { display: false } },
              y: { display: false, grid: { display: false } },
            },
          }}
        />
      </MetricCard>
    </CCol>
  </CRow>
)

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  actions: [string, string][]
  children: React.ReactNode
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  actions,
  children,
}) => (
  <CCard className="h-100 parsim-metric-card">
    <CCardBody className="p-3 d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span className="metric-card-label">{title}</span>
          <div className="fs-3 fw-bold metric-card-value mt-1">{value}</div>
          <div className="small text-orange mt-1 d-flex align-items-center gap-1">
            <CIcon icon={trend === 'up' ? cilArrowTop : cilArrowBottom} size="sm" />
            <span>{change}</span>
          </div>
        </div>
        <CDropdown alignment="end">
          <CDropdownToggle
            color="transparent"
            caret={false}
            className="p-1 text-secondary border-0"
            aria-label={`Options for ${title}`}
          >
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            {actions.map(([href, label]) => (
              <CDropdownItem href={href} key={label}>
                {label}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
      </div>
      <div className="mt-2" style={{ height: '64px' }}>
        {children}
      </div>
    </CCardBody>
  </CCard>
)

export default DashboardMetrics
