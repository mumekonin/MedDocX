import axiosClient from "./axiosClient";

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  order: number;
  isActive: boolean;
}

export interface ServiceFormInput {
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  isActive?: boolean;
}

export const getServices = async (): Promise<Service[]> => {
  const { data } = await axiosClient.get("/services");
  return data;
};

export const getServiceById = async (id: string): Promise<Service> => {
  const { data } = await axiosClient.get(`/services/${id}`);
  return data;
};

export const createService = async (input: ServiceFormInput): Promise<Service> => {
  const { data } = await axiosClient.post("/services", input);
  return data;
};

export const updateService = async (id: string, input: ServiceFormInput): Promise<Service> => {
  const { data } = await axiosClient.put(`/services/${id}`, input);
  return data;
};

export const deleteService = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/services/${id}`);
  return data;
};