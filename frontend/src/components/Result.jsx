import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Result = () => {
  const { room } = useParams();  // Get the room ID from URL
  const location = useLocation();  // Access location object
  const { resultMessage } = location.state || {};  // Access the resultMessage passed via navigate
  const navigate = useNavigate();  // Get the navigate function for routing

  const handleBackToHome = () => {
    navigate("/subjects");  // Navigate to the '/subjects' route
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">Result for Room: {room}</h1>
        <p className="text-lg">{resultMessage || "No result available."}</p>

        {/* Back to Home button */}
        <button
          className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
