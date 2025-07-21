import { useData } from "./useData";
export interface Tags {
  _id: string;
  name: string;
  body: string;
}

export const useTags = () => useData<Tags>("/api/tags");
