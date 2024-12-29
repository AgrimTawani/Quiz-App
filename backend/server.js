const { Server } = require("socket.io");
const http = require("http");
const fs = require("fs");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update to match your client origin if needed
    methods: ["GET", "POST"],
  },
});

// Function to get questions from JSON file
const getQuestions = () => {
  const rawData = fs.readFileSync("questions.json"); // Assuming the file is named 'questions.json'
  return JSON.parse(rawData); // Parse the JSON data from the file
};

io.on("connection", (socket) => {
  console.log("User connected...");

  // Handle selecting a subject and joining a room
  socket.on("select_subject", (subjectId) => {
    console.log("Selected subject:", subjectId);
    socket.join(subjectId);
    const room = io.sockets.adapter.rooms.get(subjectId);
    if (room) {
      console.log(`Number of users in room ${subjectId}: ${room.size}`);
      if (room.size >= 2) {
        io.to(subjectId).emit("room_full", true); // Notify room is full
      }
    }
    socket.emit("joined_room", `Joined room ${subjectId}`);
  });

  // Handle client requesting questions dynamically
  socket.on("request_game_questions", (data) => {
    try {
      // Parse the incoming object and extract the room value
      const { room } = data;
      console.log("Request for questions received from room:", room);

      // Get all questions from the JSON file
      const allQuestions = getQuestions();

      // Fetch questions for the specified room
      const subjectQuestions = allQuestions[room] || [];

      // Send questions back to the requesting client
      socket.emit("game_questions", subjectQuestions);
    } catch (error) {
      console.error("Error processing game questions request:", error);
      socket.emit("error", { message: "Unable to fetch questions. Please try again." });
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
