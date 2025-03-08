import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../../Components/AuthProvider";

function C_Login() {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let api_link = "http://127.0.0.1:8000/";
  const navigate = useNavigate();

  let loginUser = async (username, password) => {
    let response = await fetch(api_link + "base/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status === 200) {
      let data = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/candidate/resumeupload");
    } else {
      alert("Something went wrong");
      console.log(response);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
    setUsername(""); // Reset fields after login attempt
    setPassword("");
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at center, rgb(57 43 106) 0%, #100C24 100%)",
        backdropFilter: "blur(50px)",
      }}
      className="h-screen bg-[#100C24] flex justify-center items-center"
    >
      <main className="text-white">
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
              type="username"
              id="username"
              name="username"
              placeholder="Username"
              value={username} // ✅ Fixed
              onChange={(e) => setUsername(e.target.value)}
              className="peer w-full px-4 py-3 bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={password} // ✅ Fixed
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 py-3 bg-transparent border border-[#ffffff6e] text-white placeholder-[#CACACA] focus:outline-none focus:border-[#ffffff] transition-colors"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="flex justify-center items-center m-auto py-2 font-Sora px-14 rounded-lg bg-[#7242C3] hover:scale-105 hover:bg-[#8752e2] transition-all text-white font-medium duration-200"
          >
            Sign In
          </button>

          <div className="text-center font-light font-Sora text-[#c2c2c2]">
            Don't have an account?{" "}
            <Link
              to="/recruiter/signup"
              className="font-semibold text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default C_Login;
