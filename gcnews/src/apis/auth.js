import apiClient from "./apiClient";

export function loginUser(credentials) {
  return apiClient.post("/api/user-info/login", credentials);
}

export function signupUser(data) {
  return apiClient.post("/api/user-info/signup", data);
}
