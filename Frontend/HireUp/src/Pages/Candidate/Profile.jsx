import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, FileText, Github, Linkedin, Briefcase, GraduationCap, Code, Clock, Save, X } from 'lucide-react';
import CandidateNav from '../../Components/CandidateNav';

function Profile() {
  const navigate = useNavigate();
  const api_link = "http://127.0.0.1:8000/"
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    resume: null,
    skills: [],
    years_of_experience: 0,
    education: '',
    current_position: '',
    linkedin_profile: '',
    github_profile: ''
  });

  const [editData, setEditData] = useState({
    resume: null,
    skills: [],
    years_of_experience: 0,
    education: '',
    current_position: '',
    linkedin_profile: '',
    github_profile: ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(api_link + 'base/candidate_profile_detail/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authTokens.access}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      
      // Ensure skills is always an array
      const sanitizedData = {
        ...data,
        skills: Array.isArray(data.skills) ? data.skills : []
      };
      
      setProfileData(sanitizedData);
      setEditData(sanitizedData);
      setLoading(false);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError('Failed to load profile data');
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error('No authentication token found');
      }
      
      // Ensure skills is an array before sending
      const dataToSend = {
        ...editData,
        skills: Array.isArray(editData.skills) ? editData.skills : []
      };
      
      const response = await fetch(api_link + 'base/candidate_profile_detail/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(dataToSend), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      const updatedData = await response.json();
      
      // Ensure skills is always an array in the response
      const sanitizedData = {
        ...updatedData,
        skills: Array.isArray(updatedData.skills) ? updatedData.skills : []
      };
      
      setProfileData(sanitizedData);
      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error("Profile update error:", err);
      setError('Failed to update profile');
    }
  };
  
  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)'
  }} className='min-h-screen py-8 flex p-5'>
      <CandidateNav  />
      
      <div className="max-w-4xl mx-auto">

        <div className="bg-[#f0c8ff] w-[600px] shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Candidate Profile</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[white/10] rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {/* Resume Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
              </div>
              <button
                onClick={() => navigate('/candidate/resumeupload')}
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Scan Resume
              </button>
            </div>

            {/* Current Position */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="text-purple-600" size={20} />
                <h3 className="text-lg font-medium text-gray-700">Current Position</h3>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.current_position || ""}
                  onChange={(e) => setEditData({...editData, current_position: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600">{profileData.current_position || 'Not specified'}</p>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="text-purple-600" size={20} />
                <h3 className="text-lg font-medium text-gray-700">Years of Experience</h3>
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={editData.years_of_experience || 0}
                  onChange={(e) => setEditData({...editData, years_of_experience: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600">{profileData.years_of_experience || 0} years</p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-purple-600" size={20} />
                <h3 className="text-lg font-medium text-gray-700">Education</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={editData.education || ""}
                  onChange={(e) => setEditData({...editData, education: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600">{profileData.education || 'Not specified'}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="text-purple-600" size={20} />
                <h3 className="text-lg font-medium text-gray-700">Skills</h3>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={Array.isArray(editData.skills) ? editData.skills.join(', ') : ""}
                  onChange={(e) => setEditData({...editData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Separate skills with commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(profileData.skills) && profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">No skills specified</p>
                  )}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Linkedin className="text-purple-600" size={20} />
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.linkedin_profile || ""}
                    onChange={(e) => setEditData({...editData, linkedin_profile: e.target.value})}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="LinkedIn URL"
                  />
                ) : (
                  profileData.linkedin_profile ? (
                    <a href={profileData.linkedin_profile} target="_blank" rel="noopener noreferrer" 
                      className="text-purple-600 hover:text-purple-700">
                      LinkedIn Profile
                    </a>
                  ) : (
                    <span className="text-gray-600">Not specified</span>
                  )
                )}
              </div>
              <div className="flex items-center gap-4">
                <Github className="text-purple-600" size={20} />
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.github_profile || ""}
                    onChange={(e) => setEditData({...editData, github_profile: e.target.value})}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="GitHub URL"
                  />
                ) : (
                  profileData.github_profile ? (
                    <a href={profileData.github_profile} target="_blank" rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700">
                      GitHub Profile
                    </a>
                  ) : (
                    <span className="text-gray-600">Not specified</span>
                  )
                )}
              </div>
            </div>
          </div>
  
      </div>
    </div>

    </div>
  )
}

export default Profile;