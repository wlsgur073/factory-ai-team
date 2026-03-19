"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings } from "lucide-react";
import { cn, ScrollArea, Separator } from "@nexus/ui";
import { DynamicIcon, categories, getSolutionsByCategory } from "@nexus/config";

type SidebarProps = {
  collapsed: boolean;
};

const mainNav = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/solutions", label: "솔루션 카탈로그", icon: Package },
  { href: "/settings", label: "설정", icon: Settings },
];

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden border-r bg-sidebar text-sidebar-foreground transition-all duration-300 lg:flex lg:flex-col",
        collapsed ? "lg:w-16" : "lg:w-60",
      )}
    >
      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-2">
          {mainNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-sidebar-accent text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <>
            <Separator className="my-4" />
            <div className="px-4 pb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                카테고리
              </p>
            </div>
            <nav className="flex flex-col gap-1 px-2">
              {categories.map((category) => {
                const categorySolutions = getSolutionsByCategory(category.id);
                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground">
                      <DynamicIcon
                        name={category.icon}
                        className="h-3.5 w-3.5"
                      />
                      <span>{category.name}</span>
                      <span className="ml-auto text-[10px]">
                        {categorySolutions.length}
                      </span>
                    </div>
                    {categorySolutions.map((solution) => (
                      <Link
                        key={solution.id}
                        href={solution.route}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-1.5 pl-9 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          pathname === solution.route &&
                            "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                      >
                        {solution.name}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </nav>
          </>
        )}
      </ScrollArea>
    </aside>
  );
}
