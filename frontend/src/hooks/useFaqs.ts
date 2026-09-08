import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFaqs, createFaq, updateFaq, deleteFaq, type FaqFormInput } from "../api/faqs.api";

export const useFaqs = () =>
  useQuery({ queryKey: ["faqs"], queryFn: getFaqs });

export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: FaqFormInput) => createFaq(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: FaqFormInput }) => updateFaq(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  });
};