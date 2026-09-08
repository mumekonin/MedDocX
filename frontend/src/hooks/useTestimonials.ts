import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  type TestimonialFormInput,
} from "../api/testimonials.api";

export const useTestimonials = () =>
  useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TestimonialFormInput) => createTestimonial(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: TestimonialFormInput }) =>
      updateTestimonial(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
};