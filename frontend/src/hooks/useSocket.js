import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (subjectId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!subjectId) return;

    const socket = io('http://localhost:3000'); // Replace with your server URL
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('select_subject', subjectId);
    });

    socket.on('joined_room', (msg) => {
      console.log(msg);
    });

    socket.on('room_full', (isSameRoom) => {
      if (isSameRoom) {
        console.log('The sockets are in the same room!');
      }
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [subjectId]);

  return socket;
};

export default useSocket;
