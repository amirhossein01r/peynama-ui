import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home,
  Sparkles,
  BookmarkCheck,
  Eye,
  XCircle,
  Menu,
  Library,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import api from "@/lib/api";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";

const MAIN_NAV = [
  { label: "خانه", to: "/", icon: Home },
  { label: "پیشنهادی‌ها", to: "/recommendations", icon: Sparkles },
] as const;

const LIBRARY_NAV = [
  { label: "شاید ببینم", to: "/library/plan-to-watch", icon: BookmarkCheck },
  { label: "دیده‌شده‌ها", to: "/library/watched", icon: Eye },
  { label: "رهاشده‌ها", to: "/library/dropped", icon: XCircle },
] as const;

const ALL_NAV = [...MAIN_NAV, ...LIBRARY_NAV];

function Avatar({ seed }: { seed: string }) {
  const url = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;
  return (
    <img
      src={url}
      alt="آواتار"
      className="w-8 h-8 rounded-full border border-border bg-muted"
    />
  );
}

function NavLink({
  item,
  onClick,
}: {
  item: { label: string; to: string; icon: React.ElementType };
  onClick?: () => void;
}) {
  const { location } = useRouterState();
  const isActive = location.pathname === item.to;
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-[#ccc]/10",
      )}
      dir="rtl"
    >
      <Icon size={16} />
      {item.label}
    </Link>
  );
}

function LibraryDropdown() {
  const { location } = useRouterState();
  const isActive = LIBRARY_NAV.some((item) => item.to === location.pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-[#ccc]/10",
          )}
        >
          <Library size={16} />
          کتابخانه
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {LIBRARY_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.to} asChild>
              <Link
                to={item.to}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon size={15} />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AvatarMenu({ onLogout }: { onLogout: () => void }) {
  const { data: user } = useCurrentUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
          <Avatar seed={user.username} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={15} />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await api.post("/auth/logout/");
    queryClient.setQueryData(["current-user"], null);
    navigate({ to: "/login" });
  };

  return (
    <>
      <header
        className="absolute top-0 z-50 w-full border-b border-border"
        dir="rtl"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-semibold text-foreground tracking-tight shrink-0"
          >
            پی‌نما
          </Link>

          <SearchBar />

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {MAIN_NAV.map((item) => (
              <NavLink key={item.to} item={item} />
            ))}
            <LibraryDropdown />
            <AvatarMenu onLogout={() => setLogoutDialog(true)} />
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <AvatarMenu onLogout={() => setLogoutDialog(true)} />
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <SheetHeader className="px-4 py-4">
                  <SheetTitle className="text-right text-sm font-semibold" />
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-3">
                  {ALL_NAV.map((item) => (
                    <NavLink
                      key={item.to}
                      item={item}
                      onClick={() => setSheetOpen(false)}
                    />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AlertDialog open={logoutDialog} onOpenChange={setLogoutDialog}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>خروج از حساب</AlertDialogTitle>
            <AlertDialogDescription>
              آیا مطمئنی که میخوای خارج بشی؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>بله</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { Navbar };
