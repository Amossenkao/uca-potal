"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import React, { useState, useEffect } from "react";
import useAuth from "@/store/useAuth";
import { PageLoading } from "@/components/loading";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  // Check if we're still loading or initializing
  const isLoadingState = isInitializing || isLoading || !isLoggedIn || !user;

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />

        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {isLoadingState ? (
            // Show loading spinner in main content area while maintaining layout
            <div className="flex items-center justify-center min-h-[60vh]">
              <PageLoading />
            </div>
          ) : (
            // Show actual content when loading is complete
            children
          )}
        </div>
      </div>
    </div>
  );
}