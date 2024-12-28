import React from "react";

const SideBar = ({ questions, currentQuestionIndex, handleQuestionClick }) => {
  return (
    <div className="w-[18%] bg-gray-100 bg-opacity-85 shadow-2xl rounded-lg p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">~~~ Questions ~~~</h3>
      <ul className="space-y-2">
        {questions.map((q, index) => (
          <li
            key={q.id}
            className={`p-2 rounded-lg cursor-pointer ${
              index === currentQuestionIndex
                ? "bg-blue-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleQuestionClick(index)}
          >
            Question {q.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
