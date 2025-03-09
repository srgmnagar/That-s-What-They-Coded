import React, { useEffect, useState } from "react";
import axios from "axios";

const Course = () => {
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs/")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));

    axios.get("http://127.0.0.1:8000/api/courses/")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Recommended Jobs</h1>
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

      <h1 className="text-3xl font-bold mt-8">Recommended Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-400">{course.description}</p>
            <p className="text-blue-400 text-xs mt-2">{course.level} level</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
