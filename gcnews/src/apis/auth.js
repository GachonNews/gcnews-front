import apiClient from "./apiClient";

export function loginUser(credentials) {
  return apiClient.post("/login", credentials);
}

export function signupUser(data) {
  return apiClient.post("/signup", data);
}
