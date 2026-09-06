import { createContext, useContext, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getMe = async (): Promise<AuthUser> => {
  const { data } = await axiosClient.get("/users/me");
  return data;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false, // don't retry on 401 — that just means "not logged in"
  });

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return async () => {
    await axiosClient.post("/users/logout");
    queryClient.setQueryData(["auth", "me"], undefined);
  };
};