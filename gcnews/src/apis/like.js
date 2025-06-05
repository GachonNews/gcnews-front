import { axiosInstance } from "./axios";

export const postLike = async (crawlingId) => {
  const { data } = await axiosInstance.post(
    `/api/article/like?crawlingId=${crawlingId}`
  );
  return data;
};

export const deleteLike = async (crawlingId) => {
  const { data } = await axiosInstance.delete(
    `/api/article/like?crawlingId=${crawlingId}`
  );
  return data;
};
