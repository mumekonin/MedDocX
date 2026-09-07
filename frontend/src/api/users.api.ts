import axiosClient from "./axiosClient";

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const { data } = await axiosClient.post("/user/login", { email, password });
  if (data.token) {
    localStorage.setItem("auth_token", data.token);
  }
  return data;
};