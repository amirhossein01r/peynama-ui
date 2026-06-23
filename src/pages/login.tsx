import { Eye, EyeOff, Lock, UserRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";
import { useState } from "react";

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    login.mutate({
      username: form.get("username") as string,
      password: form.get("password") as string,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl" style={{ fontFamily: "vazirmatn" }}>
              خوش برگشتی
            </CardTitle>
            <CardDescription>
              برای ورود، اطلاعات حسابت رو وارد کن.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="space-y-4">
                <Label>نام کاربری</Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className="pl-10"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <Label>رمز عبور</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={showPassword ? "Your password" : "••••••••"}
                    className="pl-10 pr-10"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </div>

              <Button className="w-full">
                {login.isPending ? "درحال ورود..." : "ورود"}
              </Button>
            </form>
            {login.isError && <p>Error: {login.error.message}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { RouteComponent };
