import axiosClient from "./axiosClient";

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
}

export const getServices = async (): Promise<Service[]> => {
  const { data } = await axiosClient.get("/services");
  return data;
};