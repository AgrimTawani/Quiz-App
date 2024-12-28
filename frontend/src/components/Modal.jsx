import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    localStorage.setItem('username', username);
    navigate('/subjects');
  };

  return (
    <div className="min-h-screen bg-quiz bg flex flex-col items-center justify-center px-4">
      <div className="bg-white bg-opacity-85 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to QuizBattle!
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              minLength={3}
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Start Playing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;