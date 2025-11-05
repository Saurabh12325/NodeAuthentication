import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./src/Config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
// import userRoutes from "./src/routes/userRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";
import passport from "passport";
// import { configurePassport } from "./utils/passportConfig.js";


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: process.env.FRONTEND_URL || '*' } });


// Socket.io basic usage
io.on('connection', (socket) => {
 console.log('Socket connected', socket.id);
  socket.on('chat-message', (msg) => {
    // broadcast to all - placeholder
    io.emit('chat-message', msg);
  });
});




app.use(cors());
app.use(express.json());
// app.use(passport.initialize());/
// app.use(passport.session());

app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);


// Global error handler2
app.use(errorHandler);


const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('Failed to start server:', err);
});
