import apiClient from "../services/api-Client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
export interface Tags {
  _id: string;
  name: string;
  body: string;
}

const useTags = () => {
  const [tags, setTags] = useState<Tags[] | null>();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function getTag() {
      await apiClient
        .get<Tags[]>("/api/tags")
        .then((res) => {
          setTags(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }
          setError(err);
          setLoading(false);
        });
    }
    getTag();
  }, []);
  return { tags, error, isLoading };
};
export default useTags;
