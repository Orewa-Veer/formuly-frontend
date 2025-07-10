import { AxiosRequestConfig, CanceledError, type AxiosError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-Client";

export const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps: unknown[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await apiClient.get<T[]>(endpoint, {
          ...requestConfig,
          signal: controller.signal,
        });
        setData(res.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // ✅ clean up on unmount
  }, [endpoint, requestConfig, ...deps]);

  return { data, loading, error };
};
