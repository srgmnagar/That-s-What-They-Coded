import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing';
import C_SignUp from './Pages/Candidate/C_SignUp';
import C_Login from './Pages/Candidate/C_Login';
import R_SignUp from './Pages/Recruiter/R_SignUp';
import R_Login from './Pages/Recruiter/R_Login';
import { AuthProvider } from './Components/AuthProvider';
import Dashboard from './Pages/Recruiter/Dashboard';
import ResumeUpload from './Pages/Candidate/ResumeUpload';
import Profile from './Pages/Candidate/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/candidate/signup" element={<C_SignUp />} />
            <Route path="/candidate/login" element={<C_Login />} />
            <Route path="/recruiter/signup" element={<R_SignUp />} />
            <Route path="/recruiter/login" element={<R_Login />} />
            <Route path="/recruiter/dashboard" element={<Dashboard />} />
            <Route path="/candidate/resumeupload" element={<ResumeUpload />} />
            <Route path="/candidate/profile" element={<Profile />} />
          </Routes>
        
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
