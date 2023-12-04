import { Server } from "socket.io";
const io = new Server(8000, {
  cors: {
    origin: "*", // or specify your allowed origins
    methods: ["GET", "POST"], // or specify the methods you want to allow
  },
});

const emailToSocketMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("socket connection", socket.id);

  /**
   * Event handler when a user joins a room.
   * This function maps the user's email to the socket id,
   * maps the socket id to the user's email, emits a message
   * to all users in the room about the new user, makes
   * the socket join the specified room, and emits a message
   * to the current socket about joining the room.
   *
   * @param {Object} data - The data object containing user email and room information.
   */
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  /**
   * Event handler when a user initiates a call.
   * This function logs the call offer and emits a message
   * to the recipient user's socket about an incoming call.
   *
   * @param {Object} data - The data object containing recipient user id and call offer.
   */
  socket.on("user:call", ({ to, offer }) => {
    console.log("user:call", offer);
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  /**
   * Event handler when a user accepts a call.
   * This function logs the acceptance answer and emits a message
   * to the caller's socket about the call being accepted.
   *
   * @param {Object} data - The data object containing caller's id and acceptance answer.
   */
  socket.on("accepted:call", ({ to, ans }) => {
    console.log("accepted:cal", ans);
    io.to(to).emit("accepted:call", { from: socket.id, ans });
  });

  /**
   * Event handler when peer negotiation is needed.
   * This function logs the negotiation offer and emits a message
   * to the recipient user's socket about the need for negotiation.
   *
   * @param {Object} data - The data object containing recipient user id and negotiation offer.
   */
  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  /**
   * Event handler when peer negotiation is done.
   * This function logs the negotiation answer and emits a final message
   * to the recipient user's socket indicating the completion of negotiation.
   *
   * @param {Object} data - The data object containing recipient user id and negotiation answer.
   */
  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

export { io, socketidToEmailMap, emailToSocketMap };
