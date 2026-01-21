import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const StudentDashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        
        {/* Icon */}
        <div className="text-6xl mb-4">🚀</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Student Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6">
          We’re building something awesome for you
        </p>

        {/* Coming Soon */}
        <div className="text-xl font-semibold text-indigo-600 mb-4">
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6">
          The student dashboard is currently under development.  
          You’ll soon be able to track courses, assignments, progress, and more.
        </p>

        {/* Loader */}
        <div className="flex justify-center mb-6">
          <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce mx-1"></div>
          <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce mx-1 delay-150"></div>
          <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce mx-1 delay-300"></div>
        </div>

        {/* Button */}
        <button
          disabled
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium opacity-70 cursor-not-allowed"
        >
          Launching Soon
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
