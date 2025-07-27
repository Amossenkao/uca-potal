"use client"
import React, { useState, useEffect } from 'react';

// Student components
import StudentDashboard from './student/Dashboard';
import StudentPayFees from './student/PayFees';
import StudentViewFinancialProfile from './student/ViewFinancialProfile';
import StudentViewGrades from './student/ViewGrades';

// Teacher components
import TeacherDashboard from './teacher/Dashboard';
import TeacherAddGrades from './teacher/AddGrades';
import TeacherSubmitGrades from './teacher/SubmitGrades';
import TeacherViewGrades from './teacher/ViewGrades';
import TeacherSubmitLessonPlan from './teacher/SubmitLessonPlan';
import TeacherSubmitScheme from './teacher/SubmitScheme';
import TeacherManageLessonPlans from './teacher/ManageLessonPlans';

// VPI components
import VPIDashboard from './vpi/Dashboard';
import VPIViewStudents from './vpi/ViewStudents';
import VPIViewTeachers from './vpi/ViewTeachers';
import VPIViewAdministrators from './vpi/ViewAdministrators';
import VPIApproveGrades from './vpi/ApproveGrades';
import VPIViewLessonPlans from './vpi/ViewLessonPlans';
import VPIViewSchemeOfWork from './vpi/ViewSchemeOfWork';

// Registrar components
import RegistrarViewApplications from './registrar/ViewApplications';
import RegistrarAdmitStudent from './registrar/AdmitStudent';
import RegistrarManageScholarships from './registrar/ManageScholarships';
import RegistrarWardStudent from './registrar/WardStudent';

// Administration components
import AdministrationFinancialReports from './administration/FinancialReports';

// Proprietor components
import ProprietorPaySalaries from './proprietor/PaySalaries';
import ProprietorSalaryRequests from './proprietor/SalaryRequests';
import ProprietorTeachers from './proprietor/Teachers';
import ProprietorAdminStaff from './proprietor/AdminStaff';
import ProprietorOtherEmployees from './proprietor/OtherEmployees';
import ProprietorStudent from './proprietor/Student';

// Shared components
import Messages from './shared/Messages';
import UserProfile from './shared/UserProfile';
import AcademicCalendar from './shared/AcademicCalendar';
import ClassSchedule from './shared/ClassSchedule';
import ExamSchedule from './shared/ExamSchedule';
import ViewResources from './shared/ViewResources';
import AddResource from './shared/AddResource';
import ManageResources from './shared/ManageResources';
import AddEvent from './shared/AddEvent';
import RequestSalaryAdvance from './shared/RequestSalaryAdvance';
import SignForSalary from './shared/SignForSalary';


const Dashboard = ({ userRole = 'student', userPosition = null, filteredNavItems }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState({
    dashboard: true, // Dashboard is always loaded initially
  });
  const [expandedItems, setExpandedItems] = useState({});

  // Component mapping based on role and route
  const componentMap = {
    // Student routes
    'student/dashboard': { component: StudentDashboard, loadTime: 0 },
    'student/pay-fees': { component: StudentPayFees, loadTime: 1200 },
    'student/view-financial-profile': { component: StudentViewFinancialProfile, loadTime: 1500 },
    'student/view-grades': { component: StudentViewGrades, loadTime: 1800 },
    
    // Teacher routes
    'teacher/dashboard': { component: TeacherDashboard, loadTime: 0 },
    'teacher/add-grades': { component: TeacherAddGrades, loadTime: 1500 },
    'teacher/submit-grades': { component: TeacherSubmitGrades, loadTime: 1000 },
    'teacher/view-grades': { component: TeacherViewGrades, loadTime: 1800 },
    'teacher/submit-lesson-plan': { component: TeacherSubmitLessonPlan, loadTime: 1200 },
    'teacher/submit-scheme': { component: TeacherSubmitScheme, loadTime: 1300 },
    'teacher/manage-lesson-plans': { component: TeacherManageLessonPlans, loadTime: 2000 },
    
    // VPI routes
    'vpi/dashboard': { component: VPIDashboard, loadTime: 0 },
    'vpi/view-students': { component: VPIViewStudents, loadTime: 2200 },
    'vpi/view-teachers': { component: VPIViewTeachers, loadTime: 1800 },
    'vpi/view-administrators': { component: VPIViewAdministrators, loadTime: 1500 },
    'vpi/approve-grades': { component: VPIApproveGrades, loadTime: 2000 },
    'vpi/view-lesson-plans': { component: VPIViewLessonPlans, loadTime: 1900 },
    'vpi/view-scheme-of-work': { component: VPIViewSchemeOfWork, loadTime: 1700 },
    'vpi/classes-overview': { component: VPIViewStudents, loadTime: 1600 },
    'vpi/manage-classes': { component: VPIViewStudents, loadTime: 1800 },
    'vpi/master-sheets': { component: VPIViewStudents, loadTime: 2100 },
    'vpi/periodic-reports': { component: VPIViewStudents, loadTime: 2000 },
    'vpi/yearly-reports': { component: VPIViewStudents, loadTime: 2200 },
    'vpi/other-reports': { component: VPIViewStudents, loadTime: 1900 },
    'vpi/add-event': { component: AddEvent, loadTime: 1000 },
    
    // Registrar routes
    'registrar/dashboard': { component: VPIDashboard, loadTime: 0 },
    'registrar/view-applications': { component: RegistrarViewApplications, loadTime: 2000 },
    'registrar/admit-student': { component: RegistrarAdmitStudent, loadTime: 1500 },
    'registrar/manage-scholarships': { component: RegistrarManageScholarships, loadTime: 1800 },
    'registrar/ward-student': { component: RegistrarWardStudent, loadTime: 1600 },
    
    // Administration routes
    'administration/dashboard': { component: VPIDashboard, loadTime: 0 },
    'administration/financial-reports': { component: AdministrationFinancialReports, loadTime: 2500 },
    
    // Proprietor routes
    'proprietor/dashboard': { component: VPIDashboard, loadTime: 0 },
    'proprietor/pay-salaries': { component: ProprietorPaySalaries, loadTime: 2000 },
    'proprietor/salary-requests': { component: ProprietorSalaryRequests, loadTime: 1800 },
    'proprietor/teachers': { component: ProprietorTeachers, loadTime: 2200 },
    'proprietor/admin-staff': { component: ProprietorAdminStaff, loadTime: 1900 },
    'proprietor/other-employees': { component: ProprietorOtherEmployees, loadTime: 1700 },
    'proprietor/student': { component: ProprietorStudent, loadTime: 2100 },
    
    // Shared routes (accessible by multiple roles)
    'shared/messages': { component: Messages, loadTime: 900 },
    'shared/user-profile': { component: UserProfile, loadTime: 800 },
    'shared/academic-calendar': { component: AcademicCalendar, loadTime: 1100 },
    'shared/class-schedule': { component: ClassSchedule, loadTime: 1000 },
    'shared/exam-schedule': { component: ExamSchedule, loadTime: 1200 },
    'shared/view-resources': { component: ViewResources, loadTime: 1400 },
    'shared/add-resource': { component: AddResource, loadTime: 1200 },
    'shared/manage-resources': { component: ManageResources, loadTime: 1600 },
    'shared/request-salary-advance': { component: RequestSalaryAdvance, loadTime: 1100 },
    'shared/sign-for-salary': { component: SignForSalary, loadTime: 900 },
  };

  // Generate route key based on href and user role
  const generateRouteKey = (href) => {
    // Remove leading slash and clean up href
    const cleanHref = href.replace(/^\/+/, '');
    
    // Direct href to route mapping
    const routeMapping = {
      '': `${userRole}/dashboard`,
      'dashboard': `${userRole}/dashboard`,
      
      // Student specific routes
      'grades/add': userRole === 'student' ? 'student/pay-fees' : 'teacher/add-grades',
      'grades/submit': userRole === 'student' ? 'student/view-financial-profile' : 'teacher/submit-grades',
      'grades/view': `${userRole}/view-grades`,
      'grades/approve': 'vpi/approve-grades',
      
      // Teacher routes
      'lesson-plans/submit': 'teacher/submit-lesson-plan',
      'lesson-plans/scheme': 'teacher/submit-scheme',
      'lesson-plans/view': userRole === 'teacher' ? 'teacher/manage-lesson-plans' : 'vpi/view-lesson-plans',
      'scheme-of-work/view': 'vpi/view-scheme-of-work',
      
      // VPI routes
      'Student': 'vpi/view-students',
      'teachers': 'vpi/view-teachers',
      'administrators': 'vpi/view-administrators',
      'classes/overview': 'vpi/classes-overview',
      'classes/manage': 'vpi/manage-classes',
      'classes/master-sheets': 'vpi/master-sheets',
      'reports/periodic': 'vpi/periodic-reports',
      'reports/yearly': 'vpi/yearly-reports',
      'reports/other': 'vpi/other-reports',
      'calendar/add-event': 'vpi/add-event',
      
      // Registrar routes
      'view-applications': 'registrar/view-applications',
      'admit-student': 'registrar/admit-student',
      'scholarships/manage': 'registrar/manage-scholarships',
      'scholarships/recipients': 'registrar/ward-student',
      
      // Administration routes
      'financial-reports': 'administration/financial-reports',
      
      // Proprietor routes
      'salary/pay': 'proprietor/pay-salaries',
      'salary/requests': 'proprietor/salary-requests',
      'employees/teachers': 'proprietor/teachers',
      'employees/admin': 'proprietor/admin-staff',
      'employees/other': 'proprietor/other-employees',
      'proprietor/student': 'proprietor/student',
      
      // Shared routes
      'messages': 'shared/messages',
      'profile': 'shared/user-profile',
      'calendar/academic': 'shared/academic-calendar',
      'calendar/classes': 'shared/class-schedule',
      'calendar/exams': 'shared/exam-schedule',
      'resources/add': 'shared/view-resources',
      'resources/view': 'shared/view-resources',
      'resources/manage': 'shared/manage-resources',
      'salary/advance': 'shared/request-salary-advance',
      'salary/sign': 'shared/sign-for-salary',
    };
    
    return routeMapping[cleanHref] || `${userRole}/dashboard`;
  };

  // Function to simulate data loading
  const loadComponentData = async (routeKey) => {
    if (loadedData[routeKey]) {
      return; // Data already loaded
    }

    const componentInfo = componentMap[routeKey];
    if (!componentInfo) return;

    setLoading(true);

    // Simulate API call or data fetching
    await new Promise(resolve => setTimeout(resolve, componentInfo.loadTime));

    setLoadedData(prev => ({
      ...prev,
      [routeKey]: true
    }));
    
    setLoading(false);
  };

  // Handle navigation with loading
  const handleNavigation = async (href) => {
    const routeKey = generateRouteKey(href);
    
    // Set active view immediately for UI feedback
    setActiveView(routeKey);
    
    // Load data if not already loaded
    if (!loadedData[routeKey]) {
      await loadComponentData(routeKey);
    }
  };

  // Toggle expanded state for items with subitems
  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const renderContent = () => {
    // Show spinner if loading or data not available
    if (loading || !loadedData[activeView]) {
      return <LoadingSpinner />;
    }

    const componentInfo = componentMap[activeView];
    if (componentInfo) {
      const Component = componentInfo.component;
      return <Component userRole={userRole} userPosition={userPosition} />;
    }
    
    // Default to role-based dashboard
    const defaultDashboard = componentMap[`${userRole}/dashboard`];
    if (defaultDashboard) {
      const Component = defaultDashboard.component;
      return <Component userRole={userRole} userPosition={userPosition} />;
    }
    
    return <div>Component not found for route: {activeView}</div>;
  };

  // Initialize dashboard based on user role
  useEffect(() => {
    const initialRoute = `${userRole}/dashboard`;
    setActiveView(initialRoute);
    setLoadedData(prev => ({
      ...prev,
      [initialRoute]: true
    }));
  }, [userRole]);

  return (
    <div className="dashboard-layout">



        {/* Content Area */}
        <main className="content">
          {renderContent()}
        </main>

    </div>
  );
};

export default Dashboard;