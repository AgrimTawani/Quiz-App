/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useRef } from 'react';

const Subjects = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [error, setError] = useState(null);


  const subjects = [
    { id: 'math', name: 'Mathematics', color: 'bg-blue-100 hover:bg-blue-200' },
    { id: 'science', name: 'Science', color: 'bg-green-100 hover:bg-green-200' },
    { id: 'literature', name: 'Literature', color: 'bg-yellow-100 hover:bg-yellow-200' },
    { id: 'gk', name: 'General Knowledge', color: 'bg-purple-100 hover:bg-purple-200' },
    { id: 'music', name: 'Music', color: 'bg-pink-100 hover:bg-pink-200' },
    { id: 'art', name: 'Art', color: 'bg-orange-100 hover:bg-orange-200' },
  ];

  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    navigate('/');
  }, [navigate]);


  const handleSubjectClick = useCallback(async (subject) => {
    if (!username) {
      navigate('/');
      return;
    }
    
    sessionStorage.setItem('subjectId', subject.id);
    
    navigate(`/waiting/${subject.id}`);
  }, [username, navigate]);

  

  return (
    <div className="min-h-screen h-screen bg-quiz py-12 px-4">
      <div className="max-w-3xl bg-white shadow-2xl bg-opacity-85 rounded-2xl p-9 h-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {username}!
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 hover:rounded-xl transform transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <h2 className="text-xl text-gray-600 mb-6 text-left">
          Choose Your Subject
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject)}
              className={`${subject.color} p-6 rounded-lg shadow-sm cursor-pointer
                transform transition-all duration-200 hover:scale-105`}
            >
              <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-600">
                Test your knowledge in {subject.name.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;