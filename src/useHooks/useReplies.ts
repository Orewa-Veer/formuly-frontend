import { Reply } from "../models/Question";
import { useData } from "./useData";

export const useReplies = (id?: string) =>
  useData<Reply>(
    id ? `/api/replies/${id}` : "/api/replies",
    undefined, // No custom request config in this case
    [id] // Depend on ID so it refetches if ID changes
  );
