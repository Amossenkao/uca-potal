import React from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  AlertTriangle,
  FileText,
  GraduationCap,
  MessageCircle,
  ClipboardCheck,
  Target,
  BarChart3,
  Bell
} from 'lucide-react';

const TeacherDashboard = () => {
  // Sample data - replace with actual data from your API
  const teacherData = {
    name: "Mrs. Sarah Johnson",
    totalStudents: 127,
    activeClasses: 5,
    pendingGrades: 23,
    upcomingLessons: 8,
    avgClassPerformance: 78,
    attendanceRate: 92
  };

  const myClasses = [
    { id: 1, name: "Mathematics 10A", students: 28, nextClass: "Today 9:00 AM", room: "Room 201", performance: 85 },
    { id: 2, name: "Mathematics 10B", students: 25, nextClass: "Today 11:00 AM", room: "Room 201", performance: 79 },
    { id: 3, name: "Advanced Algebra", students: 22, nextClass: "Tomorrow 10:00 AM", room: "Room 203", performance: 92 },
    { id: 4, name: "Mathematics 9A", students: 30, nextClass: "Tomorrow 2:00 PM", room: "Room 201", performance: 74 },
    { id: 5, name: "Statistics", students: 22, nextClass: "Wed 1:00 PM", room: "Room 205", performance: 88 }
  ];

  const pendingTasks = [
    { id: 1, task: "Grade Math Quiz - Algebra", class: "Mathematics 10A", dueDate: "Today", priority: "high", count: 28 },
    { id: 2, task: "Review lesson plans", class: "Advanced Algebra", dueDate: "Tomorrow", priority: "medium", count: null },
    { id: 3, task: "Parent meeting preparation", class: "Mathematics 9A", dueDate: "Oct 30", priority: "high", count: null },
    { id: 4, task: "Submit progress reports", class: "All Classes", dueDate: "Nov 1", priority: "medium", count: 127 }
  ];

  const recentActivity = [
    { type: "grade", message: "Graded 25 assignments for Mathematics 10B", time: "2 hours ago" },
    { type: "message", message: "New message from parent - Alex Thompson", time: "4 hours ago" },
    { type: "submission", message: "15 students submitted homework early", time: "Yesterday" },
    { type: "attendance", message: "Updated attendance for all classes", time: "Yesterday" }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Conference", date: "Oct 30", time: "2:00-6:00 PM", type: "meeting" },
    { title: "Department Meeting", date: "Nov 1", time: "3:30 PM", type: "meeting" },
    { title: "Midterm Exam Week", date: "Nov 5-9", time: "All day", type: "exam" },
    { title: "Professional Development", date: "Nov 12", time: "9:00 AM", type: "training" }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400';
    if (performance >= 80) return 'text-blue-600 dark:text-blue-400';
    if (performance >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'grade': return <ClipboardCheck className="w-4 h-4" />;
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'submission': return <FileText className="w-4 h-4" />;
      case 'attendance': return <Users className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, {teacherData.name} • Mathematics Department
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: Today, 2:30 PM</p>
            <button className="mt-1 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <TrendingUp className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{teacherData.totalStudents}</p>
              <p className="text-xs text-green-600 dark:text-green-400">Across 5 classes</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Classes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{teacherData.activeClasses}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This semester</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Grades</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{teacherData.pendingGrades}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400">Need attention</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
              <ClipboardCheck className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Class Average</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{teacherData.avgClassPerformance}%</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">+3% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Classes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Classes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Overview of your teaching schedule</p>
          
          <div className="space-y-4">
            {myClasses.map((classItem) => (
              <div key={classItem.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{classItem.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{classItem.students} students • {classItem.room}</p>
                  </div>
                  <span className={`text-sm font-medium ${getPerformanceColor(classItem.performance)}`}>
                    {classItem.performance}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  Next class: {classItem.nextClass}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Tasks</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Your upcoming responsibilities</p>
          
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{task.task}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.class} {task.count && `• ${task.count} items`}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Your latest teaching activities</p>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Important dates and meetings</p>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-full ${
                  event.type === 'meeting' ? 'bg-blue-100 dark:bg-blue-900' :
                  event.type === 'exam' ? 'bg-red-100 dark:bg-red-900' :
                  'bg-green-100 dark:bg-green-900'
                }`}>
                  {event.type === 'meeting' ? (
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  ) : event.type === 'exam' ? (
                    <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;