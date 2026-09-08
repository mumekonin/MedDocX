import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSiteStats, updateSiteStats, type SiteStats } from "../api/siteStats.api";
import {updateProfile, changePassword,type UpdateProfileInput, type ChangePasswordInput,} from "../api/users.api";
export const useSiteStats = () =>
  useQuery({ queryKey: ["site-stats"], queryFn: getSiteStats });

export const useUpdateSiteStats = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SiteStats) => updateSiteStats(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site-stats"] }),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfile(input),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], data);
    },
  });
};

export const useChangePassword = () =>
  useMutation({ mutationFn: (input: ChangePasswordInput) => changePassword(input) });