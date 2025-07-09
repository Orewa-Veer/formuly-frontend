import { createContext, useContext } from "react";
import { AuthContextType } from "../models/AuthContextTypes";

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthContext = createContext<AuthContextType | null>(null);
