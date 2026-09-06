import axiosClient from "./axiosClient";

export const subscribeNewsletter = async (email: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.post("/newsletter/subscribe", { email });
  return data;
};