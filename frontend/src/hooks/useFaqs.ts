import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../api/faqs.api";

export const useFaqs = () =>
  useQuery({ queryKey: ["faqs"], queryFn: getFaqs });