import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'

export interface MainChartProps {
  timeframe?: 'Day' | 'Month' | 'Year'
}

const MainChart: React.FC<MainChartProps> = ({ timeframe = 'Month' }) => {
  const chartRef = useRef<any>(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (chartRef.current) {
        setTimeout(() => {
          const isDark = document.documentElement.getAttribute('data-coreui-theme') === 'dark'
          const borderColor = isDark ? '#262626' : '#E5E5E5'
          const bodyColor = isDark ? '#A3A3A3' : '#737373'

          chartRef.current.options.scales.x.grid.borderColor = borderColor
          chartRef.current.options.scales.x.grid.color = borderColor
          chartRef.current.options.scales.x.ticks.color = bodyColor
          chartRef.current.options.scales.y.grid.borderColor = borderColor
          chartRef.current.options.scales.y.grid.color = borderColor
          chartRef.current.options.scales.y.ticks.color = bodyColor
          chartRef.current.options.plugins.legend.labels.color = bodyColor
          chartRef.current.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () =>
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
  }, [chartRef])

  // Realistic token analytics based on timeframe (values in millions of tokens or hourly thousands)
  const chartDatasets = {
    Day: {
      labels: [
        '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
        '12:00', '14:00', '16:00', '18:00', '20:00', '22:00',
      ],
      raw: [320, 210, 180, 290, 840, 1420, 1680, 1510, 1390, 1140, 890, 540],
      optimized: [180, 120, 110, 160, 480, 810, 960, 860, 790, 660, 520, 310],
      saved: [140, 90, 70, 130, 360, 610, 720, 650, 600, 480, 370, 230],
      unit: 'k Tokens',
      max: 2000,
    },
    Month: {
      labels: [
        'Day 1', 'Day 4', 'Day 7', 'Day 10', 'Day 13', 'Day 16',
        'Day 19', 'Day 22', 'Day 25', 'Day 28', 'Day 30',
      ],
      raw: [4.1, 4.3, 4.6, 4.8, 5.1, 5.4, 5.2, 5.5, 5.8, 6.1, 6.4],
      optimized: [2.5, 2.6, 2.7, 2.8, 3.0, 3.1, 3.0, 3.2, 3.4, 3.5, 3.7],
      saved: [1.6, 1.7, 1.9, 2.0, 2.1, 2.3, 2.2, 2.3, 2.4, 2.6, 2.7],
      unit: 'M Tokens',
      max: 8,
    },
    Year: {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
      raw: [64, 72, 85, 96, 108, 118, 126, 134, 140, 146, 152, 160],
      optimized: [39, 43, 50, 56, 62, 68, 72, 77, 80, 83, 87, 91],
      saved: [25, 29, 35, 40, 46, 50, 54, 57, 60, 63, 65, 69],
      unit: 'M Tokens',
      max: 180,
    },
  }[timeframe]

  const isDarkMode =
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-coreui-theme') === 'dark'

  const gridBorderColor = isDarkMode ? '#262626' : '#E5E5E5'
  const textLabelColor = isDarkMode ? '#A3A3A3' : '#737373'

  return (
    <div style={{ height: '320px', marginTop: '24px' }}>
      <CChartLine
        ref={chartRef}
        data={{
          labels: chartDatasets.labels,
          datasets: [
            {
              label: `Raw Accumulated Tokens (${chartDatasets.unit})`,
              backgroundColor: 'transparent',
              borderColor: textLabelColor,
              pointHoverBackgroundColor: textLabelColor,
              borderWidth: 2,
              borderDash: [5, 4],
              data: chartDatasets.raw,
              fill: false,
            },
            {
              label: `Parsim Optimized Sent (${chartDatasets.unit})`,
              backgroundColor: 'rgba(255, 106, 0, 0.12)',
              borderColor: '#FF6A00',
              pointHoverBackgroundColor: '#FF6A00',
              pointBackgroundColor: '#FF6A00',
              borderWidth: 2.5,
              data: chartDatasets.optimized,
              fill: true,
              tension: 0.35,
            },
            {
              label: `Tokens Saved / Pruned (${chartDatasets.unit})`,
              backgroundColor: 'transparent',
              borderColor: '#FF8533',
              pointHoverBackgroundColor: '#FF8533',
              borderWidth: 2,
              data: chartDatasets.saved,
              tension: 0.35,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                font: { size: 12, weight: 500 },
                color: textLabelColor,
                padding: 16,
              },
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: isDarkMode ? '#111111' : '#FFFFFF',
              titleColor: isDarkMode ? '#FFFFFF' : '#171717',
              bodyColor: isDarkMode ? '#A3A3A3' : '#737373',
              borderColor: gridBorderColor,
              borderWidth: 1,
              padding: 10,
              boxPadding: 4,
              callbacks: {
                label: (context: any) => {
                  const label = context.dataset.label || ''
                  const val = context.parsed.y
                  return ` ${label}: ${val} ${chartDatasets.unit}`
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: gridBorderColor,
                drawOnChartArea: false,
              },
              ticks: {
                color: textLabelColor,
              },
            },
            y: {
              beginAtZero: true,
              max: chartDatasets.max,
              border: {
                color: gridBorderColor,
              },
              grid: {
                color: gridBorderColor,
              },
              ticks: {
                color: textLabelColor,
                callback: (val: any) => `${val} ${timeframe === 'Day' ? 'k' : 'M'}`,
              },
            },
          },
          elements: {
            line: {
              tension: 0.35,
            },
            point: {
              radius: 2,
              hitRadius: 8,
              hoverRadius: 5,
            },
          },
        }}
      />
    </div>
  )
}

export default MainChart
