import { User } from "./Question";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}
