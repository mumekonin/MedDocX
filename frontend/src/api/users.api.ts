import axiosClient from "./axiosClient";

export const login = async (email: string, password: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.post("/users/login", { email, password });
  return data;
};