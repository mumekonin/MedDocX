import axiosClient from "./axiosClient";
import type { AppointmentFormValues } from "../schemas/appointment.schema";

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  preferredDoctor?: string;
  preferredDate: string;
  preferredTime: string;
  reason?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export const createAppointment = async (payload: AppointmentFormValues) => {
  const { data } = await axiosClient.post("/appointments", payload);
  return data;
};

export const getAppointments = async (status?: string): Promise<Appointment[]> => {
  const { data } = await axiosClient.get("/appointments", {
    params: status ? { status } : undefined,
  });
  return data;
};

export const updateAppointmentStatus = async (
  id: string,
  status: "pending" | "confirmed" | "cancelled",
): Promise<Appointment> => {
  const { data } = await axiosClient.put(`/appointments/${id}/status`, { status });
  return data;
};

export const deleteAppointment = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/appointments/${id}`);
  return data;
};