import { useData } from "./useData";
export interface Tags {
  _id: string;
  name: string;
  body: string;
}

const useTags = () => useData<Tags>("/api/tags");
export default useTags;
