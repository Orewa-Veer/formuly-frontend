import { useData } from "./useData";
export interface Tags {
  _id: string;
  name: string;
  body: string;
  questionCounter: number;
}

export const useTags = () => useData<Tags>("/api/tags");
