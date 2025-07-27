import { AxiosError, CanceledError } from "axios";
import { Question } from "../../../types/Question";
import { useData } from "../../../useHooks/useData";
import apiClient from "../../../services/api-Client";
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
interface Props {
  sortType?: string;
  filter?: string;
  title?: string;
  user?: string;
  page?: number;
  tagId?: string;
}
export const useDiscussion = ({
  sortType,
  filter,
  title,
  user,
  page,
  tagId,
}: Props) =>
  useData<Question>(
    "/api/discussion",
    {
      params: {
        sort: sortType === "date" ? "createdAt" : "upvoteCounter",
        isSolved: filter === "solved" ? "true" : "false",
        title: title,
        user: user,
        page: page,
        tagId: tagId,
      },
    },
    [sortType, filter, title, user, page] // Depend on ID so it refetches if ID changes
  );
