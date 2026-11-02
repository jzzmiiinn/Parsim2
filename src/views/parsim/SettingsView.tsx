/**
 * SettingsView Component
 */

import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoon, cilSave, cilSun } from '@coreui/icons'

const SettingsView: React.FC = () => {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const handleThemeChange = (mode: string) => {
    setColorMode(mode)
    localStorage.setItem('parsim-theme', mode)
    localStorage.setItem('coreui-free-react-admin-template-theme', mode)
    document.documentElement.setAttribute('data-coreui-theme', mode)
    document.documentElement.dispatchEvent(new Event('ColorSchemeChange'))
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fs-3 fw-bold mb-1">Settings</h2>
          <p className="text-body-secondary mb-0">Theme and privacy preferences</p>
        </div>
        <CButton color="primary">
          <CIcon icon={cilSave} className="me-2" />
          Save Changes
        </CButton>
      </div>

      <CRow className="g-4">
        {/* Theme */}
        <CCol md={6}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bg-transparent border-0 pb-0">
              <strong>Theme</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex flex-column gap-3">
                <div
                  className={`p-3 rounded-3 border d-flex align-items-center justify-content-between ${
                    colorMode === 'light'
                      ? 'border-warning bg-warning bg-opacity-10'
                      : 'border-secondary border-opacity-25'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <CIcon icon={cilSun} size="lg" className="text-warning" />
                    <div>
                      <div className="fw-semibold">Light</div>
                      <div className="small text-body-secondary">White with orange accents</div>
                    </div>
                  </div>
                  {colorMode === 'light' && (
                    <CBadge color="warning" className="text-dark">
                      Active
                    </CBadge>
                  )}
                </div>

                <div
                  className={`p-3 rounded-3 border d-flex align-items-center justify-content-between ${
                    colorMode === 'dark'
                      ? 'border-warning bg-warning bg-opacity-10'
                      : 'border-secondary border-opacity-25'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <CIcon icon={cilMoon} size="lg" />
                    <div>
                      <div className="fw-semibold">Dark</div>
                      <div className="small text-body-secondary">
                        Near-black with orange accents
                      </div>
                    </div>
                  </div>
                  {colorMode === 'dark' && (
                    <CBadge color="warning" className="text-dark">
                      Active
                    </CBadge>
                  )}
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Privacy */}
        <CCol md={6}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bg-transparent border-0 pb-0">
              <strong>Privacy</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex flex-column gap-4">
                <div>
                  <CFormCheck id="zeroRetention" label="Zero-Data Retention" defaultChecked />
                  <div className="small text-body-secondary ps-4 mt-1">
                    Discard context after each request
                  </div>
                </div>

                <div>
                  <CFormCheck id="piiMasking" label="PII & Secret Scrubbing" defaultChecked />
                  <div className="small text-body-secondary ps-4 mt-1">
                    Automatically mask sensitive data
                  </div>
                </div>

                <div>
                  <CFormLabel htmlFor="maxWindow">Max Context Window</CFormLabel>
                  <CFormInput id="maxWindow" defaultValue="128,000 tokens" />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SettingsView
