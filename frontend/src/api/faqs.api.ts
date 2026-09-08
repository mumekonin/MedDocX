import axiosClient from "./axiosClient";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface FaqFormInput {
  question: string;
  answer: string;
  isActive?: boolean;
}

export const getFaqs = async (): Promise<Faq[]> => {
  const { data } = await axiosClient.get("/faqs");
  return data;
};

export const createFaq = async (input: FaqFormInput): Promise<Faq> => {
  const { data } = await axiosClient.post("/faqs", input);
  return data;
};

export const updateFaq = async (id: string, input: FaqFormInput): Promise<Faq> => {
  const { data } = await axiosClient.put(`/faqs/${id}`, input);
  return data;
};

export const deleteFaq = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/faqs/${id}`);
  return data;
};