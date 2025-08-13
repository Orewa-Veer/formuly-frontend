// src/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const initSocket = (token: string) => {
  if (socket) socket.disconnect(); // kill old one if re-authing

  socket = io(import.meta.env.VITE_API_URL, {
    auth: { userId: token },
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket(token) first.");
  }
  return socket;
};
