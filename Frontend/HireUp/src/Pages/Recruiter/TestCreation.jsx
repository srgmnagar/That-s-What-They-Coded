import React, { useState } from 'react';
import Nav from '../../Components/Nav';
import { useNavigate } from 'react-router-dom';

function TestCreation() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "easy", // Default value
    num_questions: "",
  });

  let [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/base/generate_mcq/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authTokens")).access}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create test.");
      }

      const data = await response.json();
      setQuestions(data.mcqs);
      console.log(data.mcqs);

      alert("Test created successfully!");
      navigate("/recruiter/testedit");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating test.");
    }
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)',
      }}
      className="flex p-5 "
    >
      <Nav />
      <div className="bg-purple-300 p-6 rounded-lg shadow-md w-96 mx-auto ">
        <h2 className="text-xl font-bold mb-4">Create a Test</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="topic"
            placeholder="Topic (e.g., Physics)"
            value={formData.topic}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input
            type="number"
            name="num_questions"
            placeholder="Number of Questions"
            value={formData.num_questions}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";

// const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     const testData = {
//         subject,
//         difficulty,
//         num_questions,
//     };

//     const response = await fetch("http://localhost:8000/api/tests/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(testData),
//     });

//     const data = await response.json();
//     if (response.ok) {
//         navigate(`/tests/${data.id}/edit`);
//     }
// };


export default TestCreation;
