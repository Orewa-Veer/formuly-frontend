import apiClient from "./api-Client";

export default class Service {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  post<T>(body: T) {
    apiClient.post(this.endpoint, body).catch((ex) => console.log(ex));
  }
  delete(id: string) {
    apiClient.delete(this.endpoint + "/" + id).catch((ex) => console.log(ex));
  }
}
