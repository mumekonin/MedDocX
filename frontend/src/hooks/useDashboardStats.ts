import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";

interface DashboardStats {
  totalDoctors: number;
  totalServices: number;
  pendingAppointments: number;
  totalAppointments: number;
  unreadMessages: number;
  publishedPosts: number;
}

const getDashboardStats = async (): Promise<DashboardStats> => {
  const [doctors, services, appointments, contact, blog] = await Promise.all([
    axiosClient.get("/doctors"),
    axiosClient.get("/services"),
    axiosClient.get("/appointments"),
    axiosClient.get("/contact"),
    axiosClient.get("/blog/all"),
  ]);

  const appointmentsList = appointments.data as { status: string }[];
  const messagesList = contact.data as { isRead: boolean }[];
  const blogList = blog.data as { isPublished: boolean }[];

  return {
    totalDoctors: doctors.data.length,
    totalServices: services.data.length,
    totalAppointments: appointmentsList.length,
    pendingAppointments: appointmentsList.filter((a) => a.status === "pending").length,
    unreadMessages: messagesList.filter((m) => !m.isRead).length,
    publishedPosts: blogList.filter((p) => p.isPublished).length,
  };
};

export const useDashboardStats = () =>
  useQuery({ queryKey: ["dashboard-stats"], queryFn: getDashboardStats });