import { useEffect, useState } from "react";
import apiClient from "../services/api-Client";
import { User } from "../models/Question";

export default function useCurrentCustomer() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      apiClient
        .get<User>("/api/me")
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((ex) => {
          setError(ex);
          setLoading(false);
        });
    };
    fetchUser();
  }, []);
  return { user, isLoading, error };
}
