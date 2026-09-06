import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../api/appointments.api";

export const useCreateAppointment = () =>
  useMutation({ mutationFn: createAppointment });