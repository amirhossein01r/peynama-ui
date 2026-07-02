import api, { setAccessToken, clearAccessToken } from "@/lib/api";
import type { LoginPayload, TokenResponse, User } from "@/types/api";
import type { QueryClient } from "@tanstack/react-query";
import { isRedirect, redirect } from "@tanstack/react-router";
import axios from "axios";

const authService = {
  login: async (payload: LoginPayload): Promise<void> => {
    const { data } = await api.post<TokenResponse>("/auth/login/", payload);
    setAccessToken(data.access);
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout/");
    } finally {
      clearAccessToken();
    }
  },

  refresh: async (): Promise<string | null> => {
    try {
      const { data } = await axios.post<TokenResponse>(
        `${"http://localhost:8000"}/auth/refresh/`,
        {},
        { withCredentials: true },
      );
      setAccessToken(data.access);
      return data.access;
    } catch {
      clearAccessToken();
      return null;
    }
  },

  me: async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me/");
    return data;
  },
};

const authGuard = async (queryClient: QueryClient) => {
  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["current-user"],
      queryFn: () => api.get("/auth/me/").then((r) => r.data),
      retry: false,
    });

    if (!user) throw redirect({ to: "/login" });
  } catch (e) {
    if (isRedirect(e)) throw e;
    throw redirect({ to: "/login" });
  }
};

export { authService, authGuard };
