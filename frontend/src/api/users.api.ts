import axiosClient from "./axiosClient";

export const login = async (email: string, password: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.post("/users/login", { email, password });
  return data;
};

export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export const updateProfile = async (input: UpdateProfileInput) => {
  const { data } = await axiosClient.put("/users/me", input);
  return data;
};

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (input: ChangePasswordInput): Promise<{ message: string }> => {
  const { data } = await axiosClient.put("/users/me/password", input);
  return data;
};