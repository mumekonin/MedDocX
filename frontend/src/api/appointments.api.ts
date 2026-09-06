import axiosClient from "./axiosClient";
import type { AppointmentFormValues } from "../schemas/appointment.schema";

export const createAppointment = async (payload: AppointmentFormValues) => {
  const { data } = await axiosClient.post("/appointments", payload);
  return data;
};