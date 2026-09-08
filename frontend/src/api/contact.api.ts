import axiosClient from "./axiosClient";
import type { ContactFormValues } from "../schemas/contact.schema";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const submitContactForm = async (payload: ContactFormValues) => {
  const { data } = await axiosClient.post("/contact", payload);
  return data;
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data } = await axiosClient.get("/contact");
  return data;
};

export const updateReadStatus = async (id: string, isRead: boolean): Promise<ContactMessage> => {
  const { data } = await axiosClient.put(`/contact/${id}/read`, { isRead });
  return data;
};

export const deleteContactMessage = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/contact/${id}`);
  return data;
};