import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () =>
  useQuery({
    queryKey: ["current-user"],
    queryFn: () => api.get("/auth/me/").then((r) => r.data),
    retry: false,
    staleTime: 0,
  });

export { useCurrentUser };
