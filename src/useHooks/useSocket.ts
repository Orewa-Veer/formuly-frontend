import { io, Socket } from "socket.io-client";
import useCurrentCustomer from "./useCurrentCustomer";
import { useEffect, useRef } from "react";

export default function useSocket(): Socket | null {
  const { user } = useCurrentCustomer();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (user?._id && !socketRef.current) {
      socketRef.current = io("http://localhost:3000", {
        auth: {
          userId: user._id,
        },
      });
      socketRef.current.on("connect", () => {
        console.log("Connected with user:", user._id);
      });
    }
    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?._id]);
  return socketRef.current;
}
