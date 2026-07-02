import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Sparkles,
  BookmarkCheck,
  Eye,
  XCircle,
  Menu,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";

const NAV_ITEMS = [
  { label: "خانه", to: "/", icon: Home },
  { label: "پیشنهادی‌ها", to: "/recommendations", icon: Sparkles },
  { label: "شاید ببینم", to: "/library/plan-to-watch", icon: BookmarkCheck },
  { label: "دیده‌شده‌ها", to: "/library/watched", icon: Eye },
  { label: "رهاشده‌ها", to: "/library/dropped", icon: XCircle },
] as const;

function NavLink({
  item,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
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

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="absolute top-0 z-50 w-full border-b border-border"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-semibold text-foreground tracking-tight">
          پی‌نما
        </Link>

        <SearchBar />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" dir="rtl">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} item={item} />
          ))}
        </nav>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0">
            <SheetHeader className="px-4 py-4 border-b border-border">
              <SheetTitle className="text-right text-sm font-semibold">
                منو
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  item={item}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export { Navbar };
