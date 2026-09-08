import axiosClient from "./axiosClient";

export type TestimonialRole = "Visitor" | "Patient";

export interface Testimonial {
  id: string;
  patientName: string;
  role: TestimonialRole;
  avatarUrl: string;
  message: string;
  order: number;
  isActive: boolean;
}

export interface TestimonialFormInput {
  patientName: string;
  role: TestimonialRole;
  message: string;
  isActive?: boolean;
  avatar?: FileList;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data } = await axiosClient.get("/testimonials");
  return data;
};

const buildTestimonialFormData = (input: TestimonialFormInput): FormData => {
  const formData = new FormData();
  formData.append("patientName", input.patientName);
  formData.append("role", input.role);
  formData.append("message", input.message);
  if (input.isActive !== undefined) formData.append("isActive", String(input.isActive));
  if (input.avatar && input.avatar.length > 0) formData.append("avatar", input.avatar[0]);
  return formData;
};

export const createTestimonial = async (input: TestimonialFormInput): Promise<Testimonial> => {
  const { data } = await axiosClient.post("/testimonials", buildTestimonialFormData(input), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateTestimonial = async (id: string, input: TestimonialFormInput): Promise<Testimonial> => {
  const { data } = await axiosClient.put(`/testimonials/${id}`, buildTestimonialFormData(input), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteTestimonial = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/testimonials/${id}`);
  return data;
};