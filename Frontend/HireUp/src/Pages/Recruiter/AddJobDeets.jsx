import React, { useState, useEffect } from "react";
import {
  PenSquare,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";

function AddJobDeets() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    remote: false,
    job_type: "full_time",
    salary_min: "",
    salary_max: "",
    required_skills: "",
    preferred_skills: "",
    experience_years: 0,
    category_ids: [], // Changed from categories array to category_ids
    application_deadline: "",
  });

  // Add states for available categories and skills
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const api_link = "http://127.0.0.1:8000/";

  // Fetch categories and skills when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api_link}base/job_categories/`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("authTokens")).access
            }`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setAvailableCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [api_link]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Create a formatted version of job details for submission
    const jobDetailsForSubmission = {
      title: jobDetails.title,
      description: jobDetails.description,
      company: jobDetails.company,
      location: jobDetails.location,
      remote: jobDetails.remote,
      job_type: jobDetails.job_type,
      salary_min: jobDetails.salary_min,
      salary_max: jobDetails.salary_max,
      experience_years: parseInt(jobDetails.experience_years, 10),
      application_deadline: jobDetails.application_deadline
        ? new Date(jobDetails.application_deadline).toISOString().split("T")[0]
        : null,
      // Use the selected category IDs
      category_ids: jobDetails.category_ids,
      // For now, we're sending empty arrays for skills
      // In a complete implementation, you'd have similar selection UI for skills
      required_skill_ids: [], 
      preferred_skill_ids: [],
      
      // Generate a slug from the title
      slug: jobDetails.title.toLowerCase().replace(/\s+/g, "-"),
    };

    console.log("Job Details Before Submission:", jobDetailsForSubmission);

    try {
      const response = await fetch(api_link + "base/job_opportunity_detail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
        },
        body: JSON.stringify(jobDetailsForSubmission),
      });

      if (response.ok) {
        navigate("/recruiter/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error adding job details:", errorData);
        // Format error message for display
        setErrorMessage(JSON.stringify(errorData, null, 2));
      }
    } catch (error) {
      console.error("Error adding job details:", error);
      setErrorMessage("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value, 10);
    
    // If "Select a category" option (value 0) is selected, do nothing
    if (categoryId === 0) return;
    
    // Check if category is already selected
    if (!jobDetails.category_ids.includes(categoryId)) {
      setJobDetails({
        ...jobDetails,
        category_ids: [...jobDetails.category_ids, categoryId],
      });
    }
  };

  // Remove a category from selection
  const removeCategory = (categoryId) => {
    setJobDetails({
      ...jobDetails,
      category_ids: jobDetails.category_ids.filter(id => id !== categoryId),
    });
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)",
      }}
      className="min-h-screen bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500"
    >
      <div className="flex p-5 ">
        <Nav />
        <div className="w-[600px] mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Add Job Details</h2>
          
          {/* Display error message if there is one */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error:</p>
              <pre className="whitespace-pre-wrap text-sm">{errorMessage}</pre>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={jobDetails.title}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, title: e.target.value })
                }
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                value={jobDetails.description}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, description: e.target.value })
                }
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                value={jobDetails.company}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, company: e.target.value })
                }
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={jobDetails.location}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, location: e.target.value })
                }
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                Remote
              </label>
              <input
                type="checkbox"
                checked={jobDetails.remote}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, remote: e.target.checked })
                }
                className="focus:ring-purple-500 h-4 w-4 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                value={jobDetails.job_type}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, job_type: e.target.value })
                }
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary Range
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={jobDetails.salary_min}
                  onChange={(e) =>
                    setJobDetails({ ...jobDetails, salary_min: e.target.value })
                  }
                  placeholder="Min Salary"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <input
                  type="number"
                  value={jobDetails.salary_max}
                  onChange={(e) =>
                    setJobDetails({ ...jobDetails, salary_max: e.target.value })
                  }
                  placeholder="Max Salary"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience (Years)
              </label>
              <input
                type="number"
                value={jobDetails.experience_years}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    experience_years: e.target.value,
                  })
                }
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application Deadline
              </label>
              <input
                type="date"
                value={jobDetails.application_deadline}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    application_deadline: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            {/* Categories Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Categories
              </label>
              <div className="flex flex-col space-y-2">
                <select
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  defaultValue={0}
                >
                  <option value={0}>Select a category</option>
                  {availableCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                {/* Display selected categories */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {jobDetails.category_ids.map(catId => {
                    const category = availableCategories.find(c => c.id === catId);
                    return (
                      <div 
                        key={catId} 
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md flex items-center"
                      >
                        <span>{category ? category.name : `Category ${catId}`}</span>
                        <button
                          type="button"
                          onClick={() => removeCategory(catId)}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Required Skills - placeholder for now */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Note: Skills functionality is disabled in this version
              </p>
              <input
                type="text"
                value={jobDetails.required_skills}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    required_skills: e.target.value,
                  })
                }
                placeholder="Skills functionality is coming soon"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-100"
              />
            </div>
            
            {/* Preferred Skills - placeholder for now */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Skills
              </label>
              <input
                type="text"
                value={jobDetails.preferred_skills}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    preferred_skills: e.target.value,
                  })
                }
                placeholder="Skills functionality is coming soon"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-100"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400"
              >
                {isLoading ? "Submitting..." : "Add Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJobDeets;