import { createContext, useContext } from "react";
import { SocketContextType } from "../types/SocketContextType";

export const SocketContext = createContext<SocketContextType | null>(null);
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("Use socket must be used within a socket provider");
  return context;
}
