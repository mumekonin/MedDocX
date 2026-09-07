import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(2, "Specialty must be at least 2 characters"),
  bio: z.string().optional(),
  isActive: z.boolean().optional(),
  photo: z.instanceof(FileList).optional(),
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;