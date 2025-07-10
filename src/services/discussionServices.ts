import { DiscussStru } from "../Components/AskForm";
import apiClient from "./api-Client";

export default class DiscussionService {
  postDiscussion(body: DiscussStru) {
    apiClient.post("/api/discussion", body).catch((ex) => console.log(ex));
  }
}
