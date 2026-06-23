import { authService } from "@/lib/auth";

const bootstrapSession = async (): Promise<void> => {
  await authService.refresh();
};

export { bootstrapSession };
