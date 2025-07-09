import useCurrentCustomer from "../useHooks/useCurrentCustomer";
import { AuthContext } from "./useAuth";

// ✅ 2. This provides the context to your app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useCurrentCustomer();
  return <AuthContext value={auth}>{children}</AuthContext>;
}

// ✅ 3. This is your custom hook to use it
