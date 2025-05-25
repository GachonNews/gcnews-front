import { axiosInstance } from "./axios";

export const getAllCategoryNews = async () => {
  const { data } = await axiosInstance.get("/api/article");
  return data;
};

export const getAllSubCategoryNews = async (category) => {
  const { data } = await axiosInstance.get(`/api/article/${category}`);

  return data;
};

export const getTop1News = async () => {
  const { data } = await axiosInstance.get("/api/article/top/today");
  return data;
};

export const getCategoryTop1News = async (category) => {
  const { data } = await axiosInstance.get(`/api/article/top/${category}`);
  return data;
};
