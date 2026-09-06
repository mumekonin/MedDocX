import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../api/doctors.api";

export const useDoctors = () =>
  useQuery({ queryKey: ["doctors"], queryFn: getDoctors });