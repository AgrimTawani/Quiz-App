import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Result = () => {
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 py-12">
      {/* Confetti component */}
      <Confetti width={width} height={height} />

      <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full relative z-10">
        <p className="text-2xl font-semibold text-green-600 mb-6">You Win!</p>
        <p className="text-lg text-gray-700 mb-8">Congratulations on your success! Keep it up!</p>
        <button
          className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transform transition-all duration-200 hover:scale-105"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
