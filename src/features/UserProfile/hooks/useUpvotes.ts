import { Question } from "../../../types/Question";
import { useData } from "../../../useHooks/useData";

export const useUpvotes = () => useData<Question>("/api/upvote");
