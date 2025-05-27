import { axiosInstance } from "./axios";

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get("/api/user-info/profile");
  return data.data;
};

export const createUserProfile = async (profileData) => {
  const { data } = await axiosInstance.post(
    "/api/user-info/profile",
    profileData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
};
