"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings } from "lucide-react";
import {
  cn,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  ScrollArea,
  Separator,
} from "@nexus/ui";
import { DynamicIcon, categories, getSolutionsByCategory } from "@nexus/config";

type MobileSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const mainNav = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/solutions", label: "솔루션 카탈로그", icon: Package },
  { href: "/settings", label: "설정", icon: Settings },
];

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-left text-base">메뉴</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-57px)]">
          <nav className="flex flex-col gap-1 p-2">
            {mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Separator className="my-2" />

          <div className="px-4 pb-2 pt-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              카테고리
            </p>
          </div>
          <nav className="flex flex-col gap-1 px-2 pb-4">
            {categories.map((category) => {
              const categorySolutions = getSolutionsByCategory(category.id);
              return (
                <div key={category.id}>
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground">
                    <DynamicIcon name={category.icon} className="h-3.5 w-3.5" />
                    <span>{category.name}</span>
                  </div>
                  {categorySolutions.map((solution) => (
                    <Link
                      key={solution.id}
                      href={solution.route}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 pl-9 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === solution.route &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>
              );
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
