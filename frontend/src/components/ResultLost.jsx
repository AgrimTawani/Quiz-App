/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";  // Import the snowfall library

const ResultLost = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBackToHome = () => {
    navigate("/subjects");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 py-12">
      {/* Rain effect using react-snowfall */}
      <Snowfall 
        snowflakeCount={1000} 
        style={{ position: "absolute", top: 0, left: 0 }} 
      />

      <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full relative z-10 text-center">
        {/* Sad Face Emoji */}
        <div className="text-6xl mb-6">
          <span role="img" aria-label="Sad Face">😞</span>
        </div>
        <p className="text-2xl font-semibold text-red-600 mb-6">You Lost!</p>
        <p className="text-lg text-gray-700 mb-8">Don't worry, try again!</p>
        <button
          className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transform transition-all duration-200 hover:scale-105"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultLost;
