"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Map, User } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: Home, exact: true },
  { href: "/itinerary", label: "Itinerario", icon: Map, exact: false },
  { href: "/events", label: "Eventos", icon: CalendarDays, exact: false },
  { href: "/profile", label: "Perfil", icon: User, exact: false },
] as const;

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(pathname, href, exact);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
