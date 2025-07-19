import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./services/useAuth";
import { SocketContext } from "./services/useSocket";

interface Props {
  children: React.ReactNode;
}
// const SocketContext = createContext<SocketContextType>({ socket: null, ready: false });

export const SocketProvider = ({ children }: Props) => {
  const user = useAuth();
  const [ready, setReady] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (user?.user?._id && !socketRef.current) {
      const socket = io("http://localhost:3000", {
        auth: {
          userId: user.user._id,
        },
      });
      socketRef.current = socket;
      console.log("socket connected as ", user.user._id);
      setReady(true);
      socket.on("disconnect", (reason) => {
        console.log("Socket Disconnected ", reason);
        setReady(false);
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off();
        socketRef.current.disconnect();
        socketRef.current = null;
        setReady(false);
      }
    };
  }, [user?.user?._id]);
  return (
    <SocketContext value={{ socket: socketRef.current, ready }}>
      {children}
    </SocketContext>
  );
};
