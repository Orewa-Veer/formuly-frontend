import { AxiosError, CanceledError } from "axios";
import { Question } from "../models/Question";
import { useData } from "./useData";
import apiClient from "../services/api-Client";
import { useEffect, useState } from "react";
export const useADiscuss = <T>(id?: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await apiClient.get<T>("/api/discussion/" + id, {
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
  }, [id]);

  return { data, loading, error };
};

export const useDiscussion = (
  sortType?: string,
  filter?: string,
  title?: string
) =>
  useData<Question>(
    "/api/discussion",
    {
      params: {
        sort: sortType === "date" ? "createdAt" : "upvoteCounter",
        isSolved: filter === "solved" ? "true" : "false",
        title: title,
      },
    },
    [sortType, filter, title] // Depend on ID so it refetches if ID changes
  );
