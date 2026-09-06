import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  preferredDoctor: z.string().optional(),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  reason: z.string().optional(),
  website: z.string().optional(), 
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;