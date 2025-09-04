import React, { useState, useEffect, useContext } from "react";
import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    authService.getProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch profile data. Please log in again.");
        setLoading(false);
        logout(); // Log out on API failure
      });
  }, [logout]);

  const handleLogout = () => {
    logout();
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{profile.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{profile.email}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;