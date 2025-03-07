import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Navigate,Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

function R_SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [post, setPost] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    let formErrors = {};
    const nameRegex = /^[A-Za-z\s]{1,20}$/;
    if (!nameRegex.test(form.firstName)) {
      formErrors.firstName =
        "Alphabetical characters only, min 1 chars, max 20 chars.";
    }
    if (!nameRegex.test(form.lastName)) {
      formErrors.lastName =
        "Alphabetical characters only, min 1 chars, max 20 chars.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      formErrors.email = "Enter a valid email format";
    }

    const passRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*?_+-])[A-Za-z\d!@#$%^&*?_+-]{8,20}$/;
    if (!passRegex.test(form.password)) {
      formErrors.password =
        "Password must be between 8-20 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {


      axios.post("https://auth-backend-138t.onrender.com/api/v1/users/register", {
        username: form.username,
        fullName: form.name,
        email: form.email,
        password: form.pass,
        phone: form.pno,
        dob: form.dob
      })
        .then((response) => {
          alert("Sign up successful");
          setPost(response.data);
          console.log(response.data);

          navigate("/recruiter/login");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              setErrors({ serverError: "Bad request, please check your input." });
            } else if (error.response.status === 409) {
              setErrors({ serverError: "Username or email already exists." });
            } else {
              setErrors({ serverError: "An unexpected error occurred. Please try again." });
            }
          } else if (error.request) {
            setErrors({ serverError: "No response from the server. Please check your connection." });
          } else {
            setErrors({ serverError: "An error occurred while processing the request." });
          }
        });
    }

  };



  return (
    <div style={{
      background: 'radial-gradient(circle at center, rgb(57 43 106) 0%, #100C24 100%)',
      backdropFilter: 'blur(50px)'
    }} className='h-screen bg-[#100C24] flex justify-center items-center'>
      <main style={{
        // background:' radial-gradient(43.45% 50% at 50% 50%, rgba(148, 109, 255, 0.45) 0%, rgba(16, 12, 36, 0.45) 100%)',
        // backdropFilter:' blur(50px)'
      }
      } className='text-white '>
        <div className="text-center">
          <h1 className="text-xl sm:text-3xl font-semibold font-Orbitron text-white mb-5">
            Welcome, Recruiter
          </h1>
          <p className="text-lg sm:text-2xl font-extralight font-Sora text-white mb-8">
            Enter your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-[85%] mx-auto">
          <div className="grid grid-cols-2 gap-4 font-Sora">
            <div>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="peer w-full px-4 py-3  bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="peer w-full px-4 py-3  bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              id="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              required
              className="peer w-full px-4 py-3  bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              placeholder="E-mail ID"
              value={form.email}
              onChange={handleChange}
              className="peer w-full px-4 py-3  bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
              required
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
              className="peer w-full px-4 py-3  bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={form.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-[#a67bd4] focus:ring-[#a67bd4] bg-[#1a1a35]"
              required
            />
            <label htmlFor="agreeToTerms" className="ml-2 font-Sora text-sm text-gray-400">
              I agree with the terms and conditions and privacy policy
            </label>
          </div>

          <button
            type="submit"
            className="flex justify-center items-center m-auto py-2 font-Sora px-14 rounded-lg bg-[#7242C3] hover:scale-105 hover:bg-[#8752e2] transition-all text-white font-medium duration-200"
          >
            Sign Up
          </button>

          <div className="text-center font-light font-Sora text-[#c2c2c2]">
            Already have an account?{' '}
            <Link to="/recruiter/login" className="font-semibold text-white transition-colors">
              Log In
            </Link>
          </div>
        </form>

      </main>
    </div>
  )
}

export default R_SignUp
