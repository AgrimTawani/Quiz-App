/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const WaitingScreen = () => {
  const [dots, setDots] = useState('');
  const navigate = useNavigate();
  const { subject } = useParams();
  const location = useLocation();
  const { room: initialRoom, username } = location.state || {}; 
  const [room, setRoom] = useState(initialRoom);


  // For loading dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    navigate('/subjects');
  };

  useEffect(() => {
    const subjectId = sessionStorage.getItem('subjectId');
    
    if (subjectId) {
      const socket = io("http://localhost:3000");
      
      socket.on("connect", () => {
        console.log("Connected in waiting page");
        socket.emit("select_subject", subjectId);
      });

      socket.on("joined_room", (msg) => console.log(msg));

      socket.on("room_full", (isSameRoom) => {
        if (isSameRoom) {
          console.log("The sockets are in the same room!");
          navigate(`/game/${subjectId}`)
        }});

      return () => {
        socket.disconnect();
      };
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto"></div>
          <h2 className="text-2xl font-bold text-gray-900">Finding an Opponent{dots}</h2>
          <p className="text-gray-600">Matching you with another player in <strong>{subject}</strong>. May the best player win!</p>
          <p className="text-gray-500">
          </p>
          <button
            onClick={handleCancel}
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md
              hover:bg-red-400 hover:text-white transition-colors"
          >
            Cancel Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingScreen;
