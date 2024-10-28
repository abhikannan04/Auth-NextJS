"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "Unknown", id: null });
  
  // Logout function
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      router.push("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  // Fetch user details
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me"); // Adjust endpoint as needed
      
      setUserData({
        name: res.data.data.username || "Unknown",
        id: res.data.data._id || null
      });
    } catch (err) {
      console.log("Error fetching user details:", err);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* User Details */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{userData.name}</h1>
        <p className="text-gray-600 mb-4">Welcome to your profile page!</p>

        {userData.id ? (
          <h2 className="text-blue-500">
            <Link href={`/profile/${userData.name}`}>View Profile ID: {userData.id}</Link>
          </h2>
        ) : (
          <p className="text-gray-500">No user ID available</p>
        )}

        {/* Edit Profile Button */}
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition ease-in-out duration-200">
          Edit Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-4 mx-5 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-200"
        >
          Logout
        </button>

        {/* Fetch User Details Button */}
        <button
          onClick={getUserDetails}
          className="mt-4 mx-5 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-200"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
