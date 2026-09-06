import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/services.api";

export const useServices = () =>
  useQuery({ queryKey: ["services"], queryFn: getServices });