import { z } from "zod";

export const testimonialSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["Visitor", "Patient"] as const, { errorMap: () => ({ message: "Please select a role" }) }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  isActive: z.boolean().optional(),
  avatar: z.instanceof(FileList).optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;