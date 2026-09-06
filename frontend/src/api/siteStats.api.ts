import axiosClient from "./axiosClient";

export interface SiteStats {
  patientsCount: string;
  doctorsCount: string;
  emergencyCareLabel: string;
}

export const getSiteStats = async (): Promise<SiteStats> => {
  const { data } = await axiosClient.get("/site-stats");
  return data;
};