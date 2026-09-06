import axiosClient from "./axiosClient";
import type { ContactFormValues } from "../schemas/contact.schema";

export const submitContactForm = async (payload: ContactFormValues) => {
  const { data } = await axiosClient.post("/contact", payload);
  return data;
};