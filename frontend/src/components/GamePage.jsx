import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import SideBar from "./SideBar";

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const { room } = useParams();
  const socket = useSocket(room);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption("");
  };

  useEffect(() => {
    if (socket) {
      // Request questions when connected
      socket.emit("request_game_questions",{ room: room });

      // Listen for the questions event
      const handleGameQuestions = (data) => {
        setQuestions(data);
      };

      socket.on("game_questions", handleGameQuestions);

      return () => {
        socket.off("game_questions", handleGameQuestions);
      };
    }
  }, [socket, room]);

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen h-screen bg-quiz py-12 px-4 flex">
      <SideBar
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        handleQuestionClick={handleQuestionClick}
      />

      <div className="w-3/4 max-w-4xl bg-white shadow-2xl bg-opacity-85 rounded-2xl p-12 h-full mx-auto relative">
        <p className="text-lg text-gray-600 mb-6 text-left">
          Choose the right option: +1 point for correct answer, 0 for wrong.
          All the best!
        </p>

        <h2 className="text-4xl font-bold mt-10 mb-10 text-left">
          Q{currentQuestion.id}) {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`w-full text-left text-2xl p-8 rounded-lg shadow-md cursor-pointer ${
                selectedOption === option
                  ? ["bg-blue-300", "bg-pink-300", "bg-yellow-300", "bg-green-300"][index % 4]
                  : ["bg-blue-100 hover:bg-blue-200", "bg-pink-100 hover:bg-pink-200", "bg-yellow-100 hover:bg-yellow-200", "bg-green-100 hover:bg-green-200"][index % 4]
              }`}
            >
              <input
                type="radio"
                name="quizOption"
                value={option}
                className="mr-3"
                onChange={handleOptionChange}
                checked={selectedOption === option}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 left-6 flex justify-between items-center">
          <button
            className="text-blue-500 text-xl font-semibold"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          >
            &lt;
          </button>
          <p className="text-gray-700 text-xl">
            {currentQuestionIndex + 1}/{questions.length}
          </p>
          <button
            className="text-blue-500 text-xl font-semibold"
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
