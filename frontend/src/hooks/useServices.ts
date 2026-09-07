import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServices, getServiceById, createService, updateService, deleteService,
  type ServiceFormInput,
} from "../api/services.api";

export const useServices = () =>
  useQuery({ queryKey: ["services"], queryFn: getServices });

export const useService = (id: string) =>
  useQuery({
    queryKey: ["services", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ServiceFormInput) => createService(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ServiceFormInput }) => updateService(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });
};