"use client";
import React, { useState, useEffect } from "react";
import { useDashboardNavigator } from "@/store/useDashboardNavigator";
import useAuth from "@/store/useAuth";
import { UserManagementDashboard, AdminDashboard , MasterGradeSheets, YearlyReport} from "./admin";
import { PageLoading } from "@/components/loading";

const Dashboard = () => {
  const viewsMap = {
    "dashboard": AdminDashboard,
    "yearly-reports": YearlyReport,
    "manage-users": UserManagementDashboard,
    "master-grade-sheets": MasterGradeSheets,
  }
  
  const { currentView } = useDashboardNavigator();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentView]);

  // Function to render the current view
  const renderCurrentView = () => {
    const ViewComponent = viewsMap[currentView];
    
    if (ViewComponent) {
      return <ViewComponent />;
    }
    
    return <PageLoading message="THIS FEATURE IS COMING SOON...HANG TIGHT❤️❤️" fullScreen={false} variant="school"/>;
  };

  return (
    <div className="dashboard-layout">
      <main className="content">
        {loading ? (
          <PageLoading fullScreen={false} message="Content loading, Please Wait..."/>
        ) : (
          renderCurrentView()
        )}
      </main>
    </div>
  );
};

export default Dashboard;