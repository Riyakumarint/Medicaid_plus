const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeuser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  //   console.log("a user connected.");
  socket.on("addUser", (userId) => {
    try {
      addUser(userId, socket.id);
      //   console.log("user");
      io.emit("getUsers", users);
    } catch (err) {
      console.log(err);
    }
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    try {
      const user = getUser(receiverId);
      //   console.log(user);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } catch (err) {
      console.log(err);
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    try {
      //   console.log("Disconnected");
      removeuser(socket.id);
      io.emit("getUsers", users);
    } catch (err) {
      console.log(err);
    }
  });
});
