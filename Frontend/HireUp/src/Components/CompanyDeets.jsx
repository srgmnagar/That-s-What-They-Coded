import React from 'react'
import React, { useState, useEffect } from 'react';
import { Building2, Globe, Briefcase, PenSquare } from 'lucide-react';

function CompanyDeets() {
    
    const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    company: "",
    company_website: "",
    company_description: "",
    industry: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/recruiter-profile");
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recruiter-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {isEditing ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Edit Company Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Website</label>
              <input
                type="url"
                value={profile.company_website}
                onChange={(e) => setProfile({ ...profile, company_website: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={profile.industry}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Description</label>
              <textarea
                value={profile.company_description}
                onChange={(e) => setProfile({ ...profile, company_description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Company Profile</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              <PenSquare className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <Building2 className="w-6 h-6 text-purple-600 mr-4" />
              <div>
                <h3 className="text-lg font-medium">{profile.company}</h3>
                <p className="text-gray-600">{profile.industry}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Globe className="w-6 h-6 text-purple-600 mr-4" />
              <a href={profile.company_website} className="text-purple-600 hover:underline">
                {profile.company_website}
              </a>
            </div>
            <div className="flex items-start">
              <Briefcase className="w-6 h-6 text-purple-600 mr-4" />
              <p className="text-gray-700">{profile.company_description}</p>
            </div>
          </div>
        </>
      )}
    </div>

  )
}

export default CompanyDeets
