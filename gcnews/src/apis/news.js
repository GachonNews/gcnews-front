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
  const { data } = await axiosInstance.get(
    `/api/article/top/today/${category}`
  );
  return data;
};

export const getNewsSummary = async (crawlingId) => {
  const { data } = await axiosInstance.get(`/api/summary/${crawlingId}`);
  return data;
};

export const postNewsView = async (crawlingId) => {
  const { data } = await axiosInstance.post(
    `/api/article/view?crawlingId=${crawlingId}`
  );
  return data;
};

export const getNewsQuiz = async (crawlingId) => {
  const { data } = await axiosInstance.get(`/api/quiz/${crawlingId}`);
  return data;
};
