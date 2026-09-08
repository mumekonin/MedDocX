import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitContactForm, getContactMessages, updateReadStatus, deleteContactMessage,
} from "../api/contact.api";

export const useSubmitContact = () =>
  useMutation({ mutationFn: submitContactForm });

export const useContactMessages = () =>
  useQuery({ queryKey: ["contact-messages"], queryFn: getContactMessages });

export const useUpdateReadStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) => updateReadStatus(id, isRead),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
};

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContactMessage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
};