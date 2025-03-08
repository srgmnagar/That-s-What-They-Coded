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
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add Test Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Test Title</label>
            <input
              type="text"
              value={testDetails.title}
              onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={testDetails.description}
              onChange={(e) => setTestDetails({ ...testDetails, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Test Type</label>
            <select
              value={testDetails.test_type}
              onChange={(e) => setTestDetails({ ...testDetails, test_type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="job">Job</option>
              <option value="self_assessment">Self Assessment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time Limit (Minutes)</label>
            <input
              type="number"
              value={testDetails.time_limit_minutes}
              onChange={(e) => setTestDetails({ ...testDetails, time_limit_minutes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={testDetails.is_auto_generated}
              onChange={(e) => setTestDetails({ ...testDetails, is_auto_generated: e.target.checked })}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="ml-2 text-sm text-gray-700">Auto-generate Questions</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default AddJobDeets;
