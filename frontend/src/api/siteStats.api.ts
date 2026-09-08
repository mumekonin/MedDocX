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

export const updateSiteStats = async (input: SiteStats): Promise<SiteStats> => {
  const { data } = await axiosClient.put("/site-stats", input);
  return data;
};