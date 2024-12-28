const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],      
  },
});

io.on("connection", (socket) => {
  console.log("User connected...");

  socket.on("select_subject", (subjectId) => {
    console.log("Selected subject:", subjectId);
      socket.join(subjectId);
      const room = io.sockets.adapter.rooms.get(subjectId);
      if (room) {
        console.log(`Number of users in room ${subjectId}: ${room.size}`);
        if (room && room.size >= 2) {
          // Broadcast to all users in the room that the room is full
          io.to(subjectId).emit("room_full", true);
        }
      }
  
      // Optionally, you can broadcast the room join
      socket.emit("joined_room", `Joined room ${subjectId}`);
    });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
