import axiosClient from "./axiosClient";

export interface Testimonial {
  id: string;
  patientName: string;
  role: "Visitor" | "Patient";
  avatarUrl: string;
  message: string;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data } = await axiosClient.get("/testimonials");
  return data;
};