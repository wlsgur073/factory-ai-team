"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { getSolutionBySlug } from "@nexus/config";

const routeLabels: Record<string, string> = {
  solutions: "솔루션",
  settings: "설정",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    let label = routeLabels[segment] ?? segment;

    // Check if this segment is a solution slug
    if (segments[index - 1] === "solutions") {
      const solution = getSolutionBySlug(segment);
      if (solution) label = solution.name;
    }

    return { href, label };
  });

  return (
    <nav className="flex items-center gap-1.5 px-6 py-3 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-foreground"
      >
        <Home className="h-3.5 w-3.5" />
        <span>홈</span>
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={crumb.href}
            className="transition-colors hover:text-foreground"
          >
            {crumb.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
