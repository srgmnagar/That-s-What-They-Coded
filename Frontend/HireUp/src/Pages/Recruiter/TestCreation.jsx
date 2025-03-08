// import React from 'react'
// import { useState } from 'react';
// import Nav from '../../Components/Nav'

// function TestCreation() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     test_type: "job", // Default value
//     time_limit_minutes: "",
//     is_auto_generated: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://127.0.0.1:8000/test_detail/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create test.");
//       }

//       const data = await response.json();
//       alert("Test created successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error creating test.");
//     }
//   };


//   return (
//     <div style={{
//       background: 'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)'
//     }} className='flex p-5 h-screen'>
//       <Nav />
//       <div>
//       <div className="p-5">
//       <h2 className="text-xl font-bold mb-4">Create a Test</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <select
//           name="test_type"
//           value={formData.test_type}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         >
//           <option value="job">Job</option>
//           <option value="self_assessment">Self Assessment</option>
//         </select>
//         <input
//           type="number"
//           name="time_limit_minutes"
//           placeholder="Time Limit (minutes)"
//           value={formData.time_limit_minutes}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="is_auto_generated"
//             checked={formData.is_auto_generated}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           Auto-generated
//         </label>
//         <button type="submit" className="p-2 bg-blue-500 text-white rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//       </div>
//     </div>
//   )
// }

// export default TestCreation


import React, { useState } from 'react';
import Nav from '../../Components/Nav';

function TestCreation() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    test_type: "job", // Default value
    time_limit_minutes: "",
    is_auto_generated: false,
    job: null, // Add job field
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/base/test_detail/", {
        method: "PUT",
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
      alert("Test created successfully!");
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
            name="title"
            placeholder="Test Title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Test Description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <select
            name="test_type"
            value={formData.test_type}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="job">Job</option>
          </select>
          <input
            type="number"
            name="time_limit_minutes"
            placeholder="Time Limit (minutes)"
            value={formData.time_limit_minutes}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_auto_generated"
              checked={formData.is_auto_generated}
              onChange={handleChange}
              className="mr-2"
            />
            Auto-generated
          </label>

          

          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TestCreation;

