import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const [jobs, setJobs] = useState([
    {"id": 1, "title": "Software Engineer", "description": "We are looking for a software engineer."},
    {"id": 2, "title": "Data Analyst", "description": "We are looking for a data analyst."},
    {"id": 3, "title": "Product Manager", "description": "We are looking for a product manager."},
  ]); // Initialize with sample data

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [jobsResponse, coursesResponse] = await Promise.all([
  //         fetch("http://127.0.0.1:8000/base/job_opportunity_list/", {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authTokens")).access}`,
  //           },
  //         }),
  //         // fetch("api/courses/"),
  //       ]);

  //       if (!jobsResponse.ok) {
  //         throw new Error('Failed to fetch jobs.');
  //       }

  //       const jobsData = await jobsResponse.json();
  //       setJobs(jobsData); // Update with real API data

  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message || 'An error occurred.');
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <button className="px-9 py-3 mb-5 bg-blue-300 text-black font-bold rounded-full" onClick={() => navigate("/candidate/test")}>
        Give Self Assessment Test
      </button>
      
      <h1 className="text-3xl font-bold mb-6">Recommended Jobs</h1>
      <div>
        {jobs.map((job) => (
          <div key={job.id} className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-400">{job.description}</p>
            </div>
            <div>
              <button className="bg-blue-600 px-4 py-2 rounded mr-2">Apply</button>
              <button className="bg-red-600 px-4 py-2 rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
