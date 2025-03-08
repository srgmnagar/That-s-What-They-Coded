import React from 'react'
import CompanyDeets from '../../Components/CompanyDeets'


export default function CompanyProfile() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-8 flex p-5">
      <Nav />
      <div className="w-96 mx-auto  ">
          
        <CompanyDeets />
        <div className="mt-8">
          {/* <JobForm /> */}
        </div>
      </div>
    </div>
    </div>
  )
}
