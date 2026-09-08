import { z } from "zod";

export const siteStatsSchema = z.object({
  patientsCount: z.string().min(1, "Required"),
  doctorsCount: z.string().min(1, "Required"),
  emergencyCareLabel: z.string().min(1, "Required"),
});
export type SiteStatsFormValues = z.infer<typeof siteStatsSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type PasswordFormValues = z.infer<typeof passwordSchema>;