import axiosClient from "./axiosClient";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  bio?: string;
}

export const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await axiosClient.get("/doctors");
  return data;
};