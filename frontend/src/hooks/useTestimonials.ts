// useTestimonials.ts
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../api/testimonials.api";

export const useTestimonials = () =>
  useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });