import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';


function R_Login() {
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
            Welcome, Candidate
          </h1>
          <p className="text-lg sm:text-2xl font-extralight font-Sora text-white mb-8">
            Enter your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-[85%] mx-auto">

          

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

          <button
            type="submit"
            className="flex justify-center items-center m-auto py-2 font-Sora px-14 rounded-lg bg-[#7242C3] hover:scale-105 hover:bg-[#8752e2] transition-all text-white font-medium duration-200"
          >
            Sign Up
          </button>

          <div className="text-center font-light font-Sora text-[#c2c2c2]">
            Don't have an account?{' '}
            <Navigate to='/recruiter/signup' className="font-semibold text-white transition-colors">
              Log In
            </Navigate >
          </div>
        </form>
            
        </main>
    </div>
  )
}

export default R_Login
