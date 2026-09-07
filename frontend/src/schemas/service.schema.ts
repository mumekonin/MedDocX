import { z } from "zod";

export const availableIcons = [
  { value: "clock", label: "Clock (Emergency)" },
  { value: "heart", label: "Heart (Cardiology)" },
  { value: "brain", label: "Brain (Neurology)" },
  { value: "stethoscope", label: "Stethoscope (General)" },
  { value: "baby", label: "Baby (Pediatric)" },
  { value: "bone", label: "Bone (Orthopedics)" },
] as const;

export const serviceSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  icon: z.string().min(1, "Please select an icon"),
  shortDescription: z.string().min(5, "Short description is too short"),
  fullDescription: z.string().min(5, "Full description is too short"),
  isActive: z.boolean().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;