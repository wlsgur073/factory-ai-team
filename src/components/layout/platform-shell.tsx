"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import { Breadcrumbs } from "./breadcrumbs";

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleToggleSidebar() {
    // On mobile: open sheet
    if (window.innerWidth < 1024) {
      setMobileOpen(true);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  }

  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-1">
        <Sidebar collapsed={sidebarCollapsed} />
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
        <main className="flex-1 overflow-auto">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </>
  );
}
