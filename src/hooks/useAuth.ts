import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { authService } from "@/lib/auth";
import type { LoginPayload } from "@/types/api";

const authKeys = {
  me: ["auth", "me"] as const,
};

const useMe = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: authService.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.me });
      router.navigate({ to: "/" });
    },
  });
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      queryClient.clear();
      router.navigate({ to: "/login" });
    },
  });
};

export { useMe, useLogin, useLogout };
