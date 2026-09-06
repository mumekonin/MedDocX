import { useQuery } from "@tanstack/react-query";
import { getSiteStats } from "../api/siteStats.api";

export const useSiteStats = () =>
  useQuery({ queryKey: ["site-stats"], queryFn: getSiteStats });