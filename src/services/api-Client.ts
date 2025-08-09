import axios from "axios";
export default axios.create({
  baseURL: "https://forumly-backend.onrender.com",
  withCredentials: true,
});
