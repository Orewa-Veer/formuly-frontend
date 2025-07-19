// import { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { useAuth } from "../services/useAuth";

// export default function useSocket(): { socket: Socket | null; ready: boolean } {
//   const user = useAuth();
//   const socketRef = useRef<Socket | null>(null);
//   const [ready, setReady] = useState(false);

//   // Initialize socket when user is available
//   useEffect(() => {
//     if (user?.user?._id && !socketRef.current) {
//       const socket = io("http://localhost:3000", {
//         auth: { userId: user.user._id },
//       });

//       socketRef.current = socket;

//       socket.on("connect", () => {
//         console.log("Connected with user:", user.user?._id);
//         setReady(true);
//       });
//     }
//   }, [user?.user]);

//   // Clean up only on unmount
//   useEffect(() => {
//     return () => {
//       if (socketRef.current) {
//         console.log("Cleaning up socket:", socketRef.current.id);
//         socketRef.current.disconnect();
//         socketRef.current = null;
//         setReady(false);
//       }
//     };
//   }, []);

//   return { socket: socketRef.current, ready };
// }
