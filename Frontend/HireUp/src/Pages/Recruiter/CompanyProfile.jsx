import React from 'react'
import CompanyDeets from '../../Components/CompanyDeets'

export default function CompanyProfile() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <CompanyDeets />
        <div className="mt-8">
          {/* <JobForm /> */}
        </div>
      </div>
    </div>
    </div>
  )
}
