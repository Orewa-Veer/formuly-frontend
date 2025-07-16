import apiClient from "./api-Client";

export default class Service {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  post<T>(body?: T) {
    return apiClient.post(this.endpoint, body && body);
  }
  delete(id: string) {
    return apiClient.delete(this.endpoint + "/" + id);
  }
}
