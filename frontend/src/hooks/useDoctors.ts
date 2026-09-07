import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDoctors, createDoctor, updateDoctor, deleteDoctor, type DoctorFormInput } from "../api/doctors.api";

export const useDoctors = () =>
  useQuery({ queryKey: ["doctors"], queryFn: getDoctors });

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DoctorFormInput) => createDoctor(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: DoctorFormInput }) => updateDoctor(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDoctor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctors"] }),
  });
};