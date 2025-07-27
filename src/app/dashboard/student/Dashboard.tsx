import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Award, 
  FileText,
  Target
} from 'lucide-react';

const StudentDashboard = () => {
  // Sample data - replace with actual data from your API
  const studentData = {
    name: "Alex Johnson",
    grade: "Grade 10",
    currentGPA: 3.8,
    attendance: 94,
    completedAssignments: 28,
    totalAssignments: 32,
    upcomingEvents: 3,
    currentSubjects: 7
  };

  const assignments = [
    { id: 1, title: "Math Quiz - Algebra", subject: "Mathematics", dueDate: "Today", priority: "high", status: "pending" },
    { id: 2, title: "History Essay - WWII", subject: "History", dueDate: "Tomorrow", priority: "medium", status: "in-progress" },
    { id: 3, title: "Science Lab Report", subject: "Physics", dueDate: "Oct 28", priority: "medium", status: "pending" },
    { id: 4, title: "English Literature Review", subject: "English", dueDate: "Oct 30", priority: "low", status: "completed" }
  ];

  const recentGrades = [
    { subject: "Mathematics", assignment: "Calculus Test", grade: "A-", points: "92/100", date: "Oct 20" },
    { subject: "Physics", assignment: "Lab Experiment", grade: "B+", points: "88/100", date: "Oct 18" },
    { subject: "English", assignment: "Essay Analysis", grade: "A", points: "95/100", date: "Oct 15" },
    { subject: "History", assignment: "Research Paper", grade: "B", points: "85/100", date: "Oct 12" }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Conference", date: "Oct 30", time: "2:00 PM" },
    { title: "Science Fair", date: "Nov 2", time: "9:00 AM" },
    { title: "Midterm Exams Begin", date: "Nov 5", time: "8:00 AM" }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, {studentData.name} • {studentData.grade}
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current GPA</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentData.currentGPA}</p>
              <p className="text-xs text-green-600 dark:text-green-400">+0.2 from last term</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentData.attendance}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This semester</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {studentData.completedAssignments}/{studentData.totalAssignments}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">4 pending</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentData.currentSubjects}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This semester</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Academic Progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Current semester is 75% complete</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Semester Progress</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Days Left</p>
                <p className="text-lg font-bold text-gray-700 dark:text-gray-200">28</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Credits Earned</p>
                <p className="text-lg font-bold text-gray-700 dark:text-gray-200">18/24</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Assignments</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Your pending tasks and deadlines</p>
          
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    assignment.status === 'completed' ? 'bg-green-500' : 
                    assignment.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{assignment.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(assignment.priority)}`}>
                    {assignment.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Grades */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Grades</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Your latest assessment results</p>
          
          <div className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{grade.assignment}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{grade.subject} • {grade.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>{grade.grade}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{grade.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Important dates and activities</p>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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

export default StudentDashboard;