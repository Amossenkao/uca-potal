"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/app/dashboard/layout/AppHeader";
import AppSidebar from "@/app/dashboard/layout/AppSidebar";
import React, { useState, useEffect } from "react";
import useAuth from "@/store/useAuth";
import { PageLoading } from "@/components/loading";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isLoggedIn, user, isLoading, loadFromStorage } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      loadFromStorage();
      setIsInitializing(false);
    };

    initializeAuth();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!isInitializing && !isLoading && (!isLoggedIn || !user)) {
      router.push("/login");
    }
  }, [isInitializing, isLoading, isLoggedIn, user, router]);

  if (isInitializing || isLoading || (!isLoggedIn || !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PageLoading variant="school"/>
      </div>
    );
  }

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
