import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
  isActive: z.boolean().optional(),
});

export type FaqFormValues = z.infer<typeof faqSchema>;