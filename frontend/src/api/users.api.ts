import axiosClient from "./axiosClient";

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const { data } = await axiosClient.post("/user/login", { email, password });
  return data;
};

export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export const updateProfile = async (input: UpdateProfileInput) => {
  const { data } = await axiosClient.put("/user/me", input);
  return data;
};

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (input: ChangePasswordInput): Promise<{ message: string }> => {
  const { data } = await axiosClient.put("/user/me/password", input);
  return data;
};