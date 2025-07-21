import { createContext, useContext } from "react";
import { AuthContextType } from "../types/AuthContextTypes";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No user found");
  return context;
}
export const AuthContext = createContext<AuthContextType | null>(null);
