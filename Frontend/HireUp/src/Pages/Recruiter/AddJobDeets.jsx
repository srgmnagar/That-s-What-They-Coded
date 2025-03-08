// 
import React, { useState } from 'react';
import { PenSquare, Briefcase, MapPin, DollarSign, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Components/Nav';

function AddJobDeets() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    remote: false,
    job_type: "",
    salary_min: "",
    salary_max: "",
    required_skills: "",
    preferred_skills: "",
    experience_years: 0,
    categories: [],
    application_deadline: "",
  });

  const navigate = useNavigate()
  const api_link = "http://127.0.0.1:8000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredSkillsArray = jobDetails.required_skills.split(',').map(skill => skill.trim());
    const preferredSkillsArray = jobDetails.preferred_skills.split(',').map(skill => skill.trim());

    try {
      const response = await fetch(api_link + "base/job_opportunity_detail/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authTokens")).access}`,
        },
        body: JSON.stringify({
          ...jobDetails,
          required_skills: requiredSkillsArray,
          preferred_skills: preferredSkillsArray,
        }),
      });
      if (response.ok) {
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      console.error("Error adding job details:", error);
    }
  };

  return (
    <div className='flex p-5 '>
      <Nav />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add Job Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={jobDetails.title}
            onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            value={jobDetails.description}
            onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            value={jobDetails.company}
            onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={jobDetails.location}
            onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-2">Remote</label>
          <input
            type="checkbox"
            checked={jobDetails.remote}
            onChange={(e) => setJobDetails({ ...jobDetails, remote: e.target.checked })}
            className="focus:ring-purple-500 h-4 w-4 border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            value={jobDetails.job_type}
            onChange={(e) => setJobDetails({ ...jobDetails, job_type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary Range</label>
          <div className="flex space-x-4">
            <input
              type="number"
              value={jobDetails.salary_min}
              onChange={(e) => setJobDetails({ ...jobDetails, salary_min: e.target.value })}
              placeholder="Min Salary"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
            <input
              type="number"
              value={jobDetails.salary_max}
              onChange={(e) => setJobDetails({ ...jobDetails, salary_max: e.target.value })}
              placeholder="Max Salary"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="number"
            value={jobDetails.experience_years}
            onChange={(e) => setJobDetails({ ...jobDetails, experience_years: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
          <input
            type="date"
            value={jobDetails.application_deadline}
            onChange={(e) => setJobDetails({ ...jobDetails, application_deadline: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <input
            type="text"
            value={jobDetails.required_skills}
            onChange={(e) => setJobDetails({ ...jobDetails, required_skills: e.target.value })}
            placeholder="Comma-separated skills"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Skills</label>
          <input
            type="text"
            value={jobDetails.preferred_skills}
            onChange={(e) => setJobDetails({ ...jobDetails, preferred_skills: e.target.value })}
            placeholder="Comma-separated skills"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
    </div>
    
  );
}

export default AddJobDeets;
