import { useQuery } from "@tanstack/react-query";
import { getServices, getServiceById } from "../api/services.api";

export const useServices = () =>
  useQuery({ queryKey: ["services"], queryFn: getServices });

export const useService = (id: string) =>
  useQuery({
    queryKey: ["services", id],
    queryFn: () => getServiceById(id),
    enabled: !!id, 
  });