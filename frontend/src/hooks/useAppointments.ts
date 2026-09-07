import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment,
} from "../api/appointments.api";

export const useCreateAppointment = () =>
  useMutation({ mutationFn: createAppointment });

export const useAppointments = (status?: string) =>
  useQuery({
    queryKey: ["appointments", status ?? "all"],
    queryFn: () => getAppointments(status),
  });

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "pending" | "confirmed" | "cancelled" }) =>
      updateAppointmentStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAppointment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });
};