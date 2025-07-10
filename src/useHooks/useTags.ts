import { useData } from "./userData";
export interface Tags {
  _id: string;
  name: string;
  body: string;
}

const useTags = () => useData<Tags>("/api/tags");
export default useTags;
