import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { authService } from "@/lib/auth";
import type { LoginPayload } from "@/types/api";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["current-user"] });
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

export { useLogin, useLogout };
