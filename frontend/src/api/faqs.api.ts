import axiosClient from "./axiosClient";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const getFaqs = async (): Promise<Faq[]> => {
  const { data } = await axiosClient.get("/faqs");
  return data;
};