import apiClient from "../services/api-Client";

export const useRegister = <T>(endpoint: string, body: T) => {
  apiClient.post<T>(endpoint, body).catch((ex) => console.log(ex));
};
