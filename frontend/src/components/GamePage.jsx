import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useSocket from '../hooks/useSocket';
import SideBar from "./SideBar";

const questions = [
  { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { id: 2, question: "What is 5 + 3?", options: ["5", "8", "9", "7"], answer: "8" },
  { id: 3, question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], answer: "Shakespeare" },
  { id: 4, question: "What is the boiling point of water?", options: ["100°C", "90°C", "80°C", "70°C"], answer: "100°C" },
  { id: 5, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { id: 6, question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Shark", "Giraffe"], answer: "Blue Whale" },
  { id: 7, question: "Which language is primarily spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], answer: "Portuguese" },
  { id: 8, question: "What is the currency of Japan?", options: ["Dollar", "Yen", "Euro", "Won"], answer: "Yen" },
  { id: 9, question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "H2"], answer: "H2O" },
  { id: 10, question: "Which continent is the Sahara Desert located on?", options: ["Asia", "Africa", "Europe", "Australia"], answer: "Africa" },
];

const GamePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const { room } = useParams();
  const socket = useSocket(room);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption("");
  };

  useEffect(() => {
    if (socket) {
      socket.emit("game_start", "Hi from GamePage"
      );
    }
  }, [socket]);

  return (
    <div className="min-h-screen h-screen bg-quiz py-12 px-4 flex">
      {/* Sidebar Component */}
      <SideBar
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        handleQuestionClick={handleQuestionClick}
      />

      {/* Main Content */}
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
