"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  
  Home,
  UserPlus,
  FileText,
  DoorOpen,
  ClipboardList,
  CreditCard,
  DollarSign,
  Receipt,
  MoreHorizontal,
  ChevronDown,
  Menu,
  GraduationCap,
  Building,
  Users,
  Phone,
  LayoutDashboard,
  LogIn,
  X,
  Info
} from "lucide-react"
import Logo from "../Logo";
import useAuthStore from "@/store/useAuth"; // Fixed import path

export default function NavBar() {
  const path = usePathname();
  const bp = useBreakpoint();
  const router = useRouter();
  const { isLoggedIn, logout, loadFromStorage } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting and load auth state
  useEffect(() => {
    setMounted(true);
    loadFromStorage();
  }, [loadFromStorage]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle route navigation
      router.push(href);
    }
    closeSidebar();
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  const isLoginPage = path === "/login" || path === "/home/login";
  const isHomePage = path === "/" || path === "/home";

  return (
    <div className="sticky top-0 z-50">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <a href="/">
              <Logo/>
            </a>
            <Button variant="ghost" size="sm" onClick={closeSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                {!isHomePage && (
                  <button 
                    onClick={() => handleNavClick("/")}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Home</span>
                  </button>
                )}

                {isHomePage && (
                  <button 
                    onClick={() => handleNavClick("#about")}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                  >
                    <Info className="h-5 w-5" />
                    <span className="font-medium">About Upstairs</span>
                  </button>
                )}
                
                {/* Admissions Section */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3 p-3 text-muted-foreground">
                    <UserPlus className="h-5 w-5" />
                    <span className="font-medium">Admissions</span>
                  </div>
                  <div className="ml-8 space-y-1">
                    <button 
                      onClick={() => handleNavClick("#information-sheets")} 
                      className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <FileText className="h-4 w-4" />
                      Information Sheets
                    </button>
                    <button 
                      onClick={() => handleNavClick("#entrance")} 
                      className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <DoorOpen className="h-4 w-4" />
                      Entrance
                    </button>
                    <button 
                      onClick={() => handleNavClick("#registration")} 
                      className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <ClipboardList className="h-4 w-4" />
                      General Registration
                    </button>
                  </div>
                </div>

                {/* Payments Section */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3 p-3 text-muted-foreground">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Payments</span>
                  </div>
                  <div className="ml-8 space-y-1">
                    <button 
                      onClick={() => handleNavClick("#tuition-fees")} 
                      className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <DollarSign className="h-4 w-4" />
                      Pay Tuition Fees
                    </button>
                    <button 
                      onClick={() => handleNavClick("#registration-fees")} 
                      className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <Receipt className="h-4 w-4" />
                      Pay Registration Fees
                    </button>
                    <button 
                      onClick={() => handleNavClick("#other-fees")} 
                      className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      Pay Other Fees
                    </button>
                  </div>
                </div>

                {!isLoginPage && (
                  <>
                    <button 
                      onClick={() => handleNavClick("#facilities")}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                    >
                      <Building className="h-5 w-5" />
                      <span className="font-medium">Facilities</span>
                    </button>
                    
                    <button 
                      onClick={() => handleNavClick("#team")}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                    >
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Team</span>
                    </button>
                    
                    <button 
                      onClick={() => handleNavClick("#contact")}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="font-medium">Contact</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Footer - Login/Dashboard */}
          {!isLoginPage && (
            <div className="p-4 border-t border-border">
              {!isLoggedIn ? (
                <Button onClick={handleLogin} className="w-full flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button onClick={navigateToDashboard} className="w-full flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="outline" onClick={handleLogout} className="w-full" size="sm">
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${isLoginPage && bp !== "sm" ? "gap-18" : "justify-between"} items-center h-16`}>
            {/* Logo */}
            <a href="/">
              <Logo/>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {!isHomePage && (
                <button 
                  onClick={() => handleNavClick("/")}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
              )}

              {isHomePage && (
                <button 
                  onClick={() => handleNavClick("#about")}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Info className="h-4 w-4" />
                  About Upstairs
                </button>
              )}
              
              {/* Admissions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium hover:text-primary h-auto p-2">
                    <UserPlus className="h-4 w-4" />
                    Admissions
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("#information-sheets")}
                  >
                    <FileText className="h-4 w-4" />
                    Information Sheets
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("#entrance")}
                  >
                    <DoorOpen className="h-4 w-4" />
                    Entrance
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("#registration")}
                  >
                    <ClipboardList className="h-4 w-4" />
                    General Registration
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Payments Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium hover:text-primary h-auto p-2">
                    <CreditCard className="h-4 w-4" />
                    Payments
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("#tuition-fees")}
                  >
                    <DollarSign className="h-4 w-4" />
                    Pay Tuition Fees
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("#registration-fees")}
                  >
                    <Receipt className="h-4 w-4" />
                    Pay Registration Fees
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("#other-fees")}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    Pay Other Fees
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {!isLoginPage && (
                <>
                  <button 
                    onClick={() => handleNavClick("#facilities")}
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    Facilities
                  </button>
                  <button 
                    onClick={() => handleNavClick("#team")}
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    Team
                  </button>
                  <button 
                    onClick={() => handleNavClick("#contact")}
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Contact
                  </button>
                </>
              )}
            </div>

            {/* Desktop Login/Dashboard Button & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Desktop Login/Dashboard */}
              {!isLoginPage && (
                <div className="hidden md:flex items-center gap-4">
                  {!isLoggedIn ? (
                    <Button onClick={handleLogin} className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={handleLogout} size="sm">
                        Logout
                      </Button>
                      <Button onClick={navigateToDashboard} className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}